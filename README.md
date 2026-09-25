# ByeFeed website

The public site for ByeFeed at **https://byefeed.app**: the home page, FAQ,
Privacy Policy and Delete Account page. It replaces the old `legal/` site.

It is plain static HTML, CSS and a little JavaScript. There is no build step and
nothing to install. Copy the folder anywhere and it works: opened straight from
disk, on GitHub Pages, or on any static host.

## Pages and navigation

The navbar links straight to the four pages: **Home**, **FAQ**, **Privacy
Policy** and **Delete Account**, plus **Get the app** (Google Play). The home
page's sections (Features, Pricing, Privacy by design) are linked from the
footer.

| Page | File | Short address |
|---|---|---|
| Home | `index.html` | `/` |
| FAQ | `faq/index.html` | `/faq/` |
| Privacy Policy | `privacy/index.html` | `/privacy/` |
| Delete Account | `delete-account/index.html` | `/delete-account/` |
| Not found | `404.html` | any unknown address (GitHub Pages serves it automatically) |
| Old addresses | `privacy.html`, `account-deletion.html` | redirect to the pages above; older app builds and store listings link here, so keep them |

the canonical tags, the sitemap and the app use.
Navbar links use the short directory addresses (`privacy/`, not
`privacy/index.html`) and are relative, so a click keeps the clean URL whether
the site is served at the root of a domain or from a sub-folder. Other internal
links may still name the page file so the site also works when opened directly
from disk. The short addresses are what the canonical tags, the sitemap and the
app use.

The app links to `https://byefeed.app/privacy/` and `https://byefeed.app/delete-account/`
(`lib/core/constants/legal_links.dart`). Google Play's reviewers open both, so
the domain must be live before a build with those links ships.

## Assets

- `assets/css/site.css`: the whole design system. Its colour tokens are the
  app's own, from `assets/brand/byefeed-tokens.json`.
- `assets/js/site.js`: the light/dark switch, the mobile menu, the footer year,
  and opening the FAQ answer a link points to.
- `assets/js/pricing.js`: prices in the visitor's currency. The country comes
  from a saved choice, then the timezone, then the browser language, then the
  US, with a picker. Only the home page loads it.
- `assets/fonts/`: Sora Bold and Nunito, subset to WOFF2 from `assets/fonts/`
  in the repo (OFL licence included).
- `assets/img/`: favicon, app icons, and the 1200×630 link-preview image.

The site loads nothing from other domains and sets no cookies. The browser's
local storage holds the visitor's chosen theme (`bf-theme`) and pricing country
(`bf-country`), and nothing else. The Privacy Policy says so, so update it if
that ever changes.

## Editing

The header, footer and ByeFeed mark are repeated in each page. When you change
one, change it in all five HTML pages (`index.html`, `faq/index.html`,
`privacy/index.html`, `delete-account/index.html`, `404.html`). Keep new
internal links in the same style: relative, and naming the `index.html` file.

Every factual statement on these pages was checked against the app and backend
code on 25 September 2026. If the app changes how it handles accounts, data,
permissions or payments, update the Privacy Policy, the FAQ and the Delete
Account page with it, and move the "Last updated" dates.

## Refreshing prices

The price table inside `assets/js/pricing.js` is generated. Never edit it by
hand. Run the generator from the ByeFeed app repository, where this folder lives
as `website/`, then copy the updated `pricing.js` to the site repository:

```bash
curl -s https://open.er-api.com/v6/latest/USD > fx.json
node tools/build_local_prices.mjs fx.json
```

See `PLAY_PRICING_TIERS.md` for what the script does and which figures are exact.

## Preview locally

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000 -d website
# then open http://localhost:8000/
```

## Publish on GitHub Pages

The folder is ready to copy as-is. `CNAME` (set to `byefeed.app`),
`.nojekyll` and `404.html` are already included.

1. Create a GitHub repository for the site (for example `byefeed-site`).
2. Copy **everything inside this folder**, including the hidden `.nojekyll`,
   into the repository's root, then commit and push to `main`.
3. In the repository: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Under **Custom domain**, `byefeed.app` appears from the `CNAME` file. Check
   it, then at your domain registrar point the domain at GitHub Pages:
   - `A` records for `byefeed.app` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - optionally a `CNAME` record for `www` → `<your-github-user>.github.io`
5. Once GitHub has issued the certificate, tick **Enforce HTTPS**. `.app`
   domains only load over HTTPS, so the site appears once this step is done.

Without a custom domain the site also works at
`https://<user>.github.io/<repository>/`, because every link is relative. In
that case delete `CNAME`, and note that the 404 page's links assume the site
sits at the root of a domain.

Other hosts work too: Netlify or Cloudflare Pages with the publish directory set
to this folder and no build command, or any server you copy the files to.

After the first deploy, submit `https://byefeed.app/sitemap.xml` in Google
Search Console if you use it.

## Facts supplied by Bros Dolz LLC (25 September 2026)

These aren't in the code, so they came from the owner. Keep them current:

- Postal address: 418 Broadway Ste N, Albany, NY 12207-2922, United States
  (Privacy Policy sections 1 and 25).
- Website host: GitHub Pages (sections 7 and 12).
- The support mailbox, support@brosdolz.com, is run by Bros Dolz LLC itself
  (section 12).
- Cloud backup retention: up to 90 days without activity for an account with no
  email (created by redeeming a code), and until the user deletes it for an
  email or Google account (section 17). This matches the weekly
  `prune-anonymous-users` job, which also spares accounts that hold Pro.
- Supabase region: East US (Ohio), `us-east-2` (section 22).

Two comments are still in `privacy/index.html`:

1. `<!-- CONFIRM (optional) -->`: the exact number of days Supabase keeps
   database backups. Until then the page says only that they expire after a
   limited period (section 17).
2. `<!-- REPLACE: refund policy -->`: left deliberately. There are no refund
   terms of ByeFeed's own yet, so the page defers to Google Play's refund policy
   (section 18).
