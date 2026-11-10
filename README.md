# Asher Darling — bio site

Static site, no build step: `index.html`, `events.html`, `contact.html`, `listen.html`, `pictures.html`, `404.html` + `styles.css` and `favicon.svg`.

## Run locally

```
npx serve .
```
or `python -m http.server 8000`, then open http://localhost:8000.

## Deploy

Hosted on Vercel from this repo's `main` branch (framework preset: **Other**, no build command, no output directory).

## Conventions

- Effects come from the `webassets` library: 001 reveal on scroll (`site.js`), 049 blur-in name, 106 film grain, 141 cross-document view transitions, plus a hover dip on the piano keys. All of them switch off under the OS reduced-motion setting.
- Home has picture placeholders (portrait, performance, band, three-picture strip), each with a `TODO` comment showing the `<img>` to swap in.
- After any change to `styles.css` or `site.js`, bump `?v=N` on the stylesheet link in every page (including `404.html`).
- Don't publish a phone number or home address. Email and city are fine.

## Open items

Each is marked with a `TODO` comment in the page.

- **Headshot:** hero on `index.html`.
- **Listen:** Spotify embed in `listen.html`. The page is hidden from the nav until then (restore the commented-out `<li>` in every page's nav, including `404.html`).
- **Pictures:** images and photographer credits in `pictures.html`, files in `images/`. Shows an Instagram line until then.
- **Events:** real dates in `events.html`. It shows an Instagram line until there are dates.
- **Contact:** public email in `contact.html`. The message form is hidden (`hidden` on its section) until it has a FormSubmit address; the first submission sends an activation email that must be confirmed.
- **Domain:** add `sitemap.xml` and `robots.txt` once the production domain is known.
- **Favicon:** only `favicon.svg` so far; add `.ico`, PNGs and `apple-touch-icon` later.
