package router

import (
	"embed"
	"fmt"
	"net/http"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/controller"
	"github.com/QuantumNous/new-api/middleware"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func getBaseURL(c *gin.Context) string {
	scheme := "https"
	if c.Request.TLS == nil && !strings.EqualFold(c.GetHeader("X-Forwarded-Proto"), "https") {
		scheme = "http"
	}
	host := c.Request.Host
	if host == "" {
		host = "localhost"
	}
	return fmt.Sprintf("%s://%s", scheme, host)
}

func SetWebRouter(router *gin.Engine, buildFS embed.FS, indexPage []byte) {
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.Use(middleware.GlobalWebRateLimit())
	router.Use(middleware.Cache())

	// Dynamic sitemap.xml — uses actual request host so URLs are always correct
	router.GET("/sitemap.xml", func(c *gin.Context) {
		base := getBaseURL(c)
		urls := []string{
			"/",
			"/cheap-ai-api",
			"/openai-alternative",
			"/deepseek-api",
			"/minimax-api",
			"/ai-api-pricing",
		}
		xml := `<?xml version="1.0" encoding="UTF-8"?>` + "\n"
		xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` + "\n"
		for _, u := range urls {
			xml += "  <url>\n"
			xml += fmt.Sprintf("    <loc>%s%s</loc>\n", base, u)
			xml += "    <changefreq>weekly</changefreq>\n"
			if u == "/" {
				xml += "    <priority>1.0</priority>\n"
			} else {
				xml += "    <priority>0.8</priority>\n"
			}
			xml += "  </url>\n"
		}
		xml += `</urlset>`
		c.Header("Content-Type", "application/xml; charset=utf-8")
		c.String(http.StatusOK, xml)
	})

	// Dynamic robots.txt — includes Sitemap directive with actual host
	router.GET("/robots.txt", func(c *gin.Context) {
		base := getBaseURL(c)
		txt := "User-agent: *\nDisallow: /api/\nDisallow: /v1/\n\n"
		txt += fmt.Sprintf("Sitemap: %s/sitemap.xml\n", base)
		c.Header("Content-Type", "text/plain; charset=utf-8")
		c.String(http.StatusOK, txt)
	})

	router.Use(static.Serve("/", common.EmbedFolder(buildFS, "web/dist")))
	router.NoRoute(func(c *gin.Context) {
		c.Set(middleware.RouteTagKey, "web")
		if strings.HasPrefix(c.Request.RequestURI, "/v1") || strings.HasPrefix(c.Request.RequestURI, "/api") || strings.HasPrefix(c.Request.RequestURI, "/assets") {
			controller.RelayNotFound(c)
			return
		}
		c.Header("Cache-Control", "no-cache")
		c.Data(http.StatusOK, "text/html; charset=utf-8", indexPage)
	})
}
