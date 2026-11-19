# Project rules

- `scripts/validate-meta-limits.mjs` blocks the build for title/description over the limit on every route except `/blog/` articles, which only warn — blog metadata keeps the full editorial title and excerpt (see `getMetadataForRoute`).
- Files reachable from `vite.config.ts` (scripts/generate-sitemap.ts → src/lib/blogData.ts, etc.) must use relative imports, not `@/`: Vite loads its config in Node, which cannot resolve the alias.
