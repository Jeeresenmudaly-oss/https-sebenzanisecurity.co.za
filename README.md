# Sebenzani Security website

Static website for the Sebenzani Security redesign.

## Run locally

Open `index.html` in a browser, or start a local static server from this directory:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy with Netlify

This site has no build step. In Netlify, import the GitHub repository and use:

- **Build command:** leave blank
- **Publish directory:** `.`

The included `netlify.toml` sets the publish directory. Connect a custom domain only after the owner confirms the exact domain and approves the DNS change. Keep the existing host and DNS unchanged until the new deployment has been reviewed.

## Content and documents

The `assets/documents/` PDFs are linked from the website for download. Confirm that each document is approved for public viewing before publishing the repository or deployment.
