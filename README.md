# Asher Darling — bio site

Static site, no build step: `index.html`, `events.html`, `contact.html`, `listen.html`, `photos.html`, `404.html` + `styles.css` and `favicon.svg`.

## Run locally

```
npx serve .
```
or `python -m http.server 8000`, then open http://localhost:8000.

## Deploy

Hosted on Vercel from this repo's `main` branch (framework preset: **Other**, no build command, no output directory).

## Conventions

- After any change to `styles.css`, bump `?v=N` on the stylesheet link in every page (including `404.html`).
- Don't publish a phone number or home address. Email and city are fine.

## Open items

Each is marked with a `TODO` comment in the page.

- **Headshot:** hero on `index.html`.
- **Listen:** Spotify embed in `listen.html`. The page is hidden from the nav until then (restore the commented-out `<li>` in every page's nav).
- **Photos:** images and photographer credits in `photos.html`, files in `images/`. Also hidden from the nav until then.
- **Events:** real dates in `events.html`. It shows an Instagram line until there are dates.
- **Contact:** public email in `contact.html`. The message form is hidden (`hidden` on its section) until it has a FormSubmit address; the first submission sends an activation email that must be confirmed.
- **Domain:** add `sitemap.xml` and `robots.txt` once the production domain is known.
- **Favicon:** only `favicon.svg` so far; add `.ico`, PNGs and `apple-touch-icon` later.
