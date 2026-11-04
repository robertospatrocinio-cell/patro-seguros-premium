# Project rules

- `scripts/validate-meta-limits.mjs` blocks the build for title/description over the limit on every route except `/blog/` articles, which only warn — blog metadata keeps the full editorial title and excerpt (see `getMetadataForRoute`).
