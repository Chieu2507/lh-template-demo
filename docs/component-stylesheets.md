# Component stylesheet loading

The extracted component assets retain their original CSS. `component-stylesheet`
loads each asset synchronously for the first two template sections, unknown/static
placement, and Theme Editor. Later sections use the existing deferred loader,
which includes a no-JavaScript fallback.

On the home page, late components emit a marker instead. The layout checks for
that marker and includes `deferred-template-components.css` once in the head, with non-blocking `media="print"` loading. This avoids repeated CSS links in card loops and many small requests.
Editor and section-rendering responses with unknown position still load their
own component assets synchronously. Hero CSS is also used by slideshow slides and remains compiled synchronously.
Header, slideshow, marquee, and foundation
CSS remain in their existing loading paths.

Edit the readable `assets/component-{sections,blocks,snippets}-*.css` source
files listed in the build script, then rebuild the minified home bundle:

```sh
npx --yes --package=esbuild@0.28.1 -c 'node scripts/build-deferred-components.cjs'
node --test tests/component-stylesheet.test.cjs
```

The first-two-section boundary is conservative placement guidance, not a
viewport measurement. Keep new above-fold layouts under review when reordering
sections or reducing their heights. Shopify's checkout CSS and HTTP cache
headers are not changed.
