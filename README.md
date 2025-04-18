This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📡 SEO Inspector API

**Live Demo**: [seo-inspect.vercel.app](https://seo-inspect.vercel.app)

**Android App**: [android-app](https://seo-inspect.vercel.app/seo-inspect.apk)

The `/api/seo` endpoint allows you to inspect SEO metadata, favicons, manifest, author tags, and folder structure of any publicly accessible website.

---

## 📥 API Endpoint

POST seo-inspect.vercel.app/api/seo \

---

## 🧾 Request

```
curl -X POST https://seo-inspect.vercel.app/api/seo \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

```
## 🧪 Example API Response

```json
{
  "favicon": "https://example.com/favicon.ico",
  "metaTags": [
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    }
  ],
  "manifest": null,
  "author": null,
  "folderTree": [
    {
      "name": "favicon.ico",
      "type": "file"
    }
  ]
}
