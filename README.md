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

- Effects come from the `webassets` library: 001 reveal on scroll and 007 text fill on scroll (`site.js`, currently unused on Home), 008-style clip reveal on the portrait, 056 label cursor (amber dot; "Book" and "Open" labels; fine pointers only), 106 film grain, 141 cross-document view transitions. The EP section uses single-track Spotify players through the Spotify iFrame API so only one plays at a time. All of them switch off under the OS reduced-motion setting.
- Home has a piano keyboard under the opening, a Debut EP section with the Spotify album player, and picture placeholders (four-picture mosaic, band photo), each with a `TODO` comment showing the `<img>` to swap in.
- After any change to `styles.css` or `site.js`, bump `?v=N` on the stylesheet link in every page (including `404.html`).
- Don't publish a phone number or home address. Email and city are fine.

## Open items

Each is marked with a `TODO` comment in the page.

- **Photo credits:** removed from the site for now; a separate credits section is planned. Photographers so far: @meatnerd (home portrait, `images/asher-darling-live.jpg`), @jpep_xcreative (EP pictures, `images/ep-1.jpg` to `ep-4.jpg`).
- **Listen:** Spotify embed in `listen.html`. The page is hidden from the nav until then (restore the commented-out `<li>` in every page's nav, including `404.html`).
- **Pictures:** `pictures.html` shows every photo used on the site (portrait and four EP photos). Add more as `<li><img></li>` in the gallery.
- **Events:** dates in `events.html`, one `<li class="gig">` per show. site.js hides past shows and shows the Instagram line when none are left. November 2026 dates added from the gig poster.
- **Contact:** public email in `contact.html`. The message form is hidden (`hidden` on its section) until it has a FormSubmit address; the first submission sends an activation email that must be confirmed.
- **Domain:** add `sitemap.xml` and `robots.txt` once the production domain is known.
- **Favicon:** only `favicon.svg` so far; add `.ico`, PNGs and `apple-touch-icon` later.
