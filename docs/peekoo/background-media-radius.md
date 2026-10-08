# Background media radius

Plan: semantic media-background-surface marks section background wrappers, the shared media-background snippet, and Collection banner only in Background layout. Foundation resets --media-radius to0 on that artwork layer; existing global img border-radius/hover clip consumes it. Containing card/surface clipping remains owned by that component. No viewport size inference, CSS class substring matching, schema changes, JS, or template data changes. Image block explicit radius/inheritance remains independent.

QA: inspect background wrappers, Shopify Theme Check, collection Background live desktop/mobile, existing card/image radius retained. Peeko branch/theme only.

Verified: scoped upload to unpublished Peeko theme 192108396843 succeeded. Theme Check: 0 errors; git diff --check passed. Live collection banner: image border-radius 0px and clip-path inset(0px) at 1920, 768, and 375px; no horizontal overflow. Homepage Image cards keep outer radius 24px and overflow hidden while artwork token is 0px. Hero artwork also opts into the shared rule; stack media keeps its explicit containing radius. Screenshot: /private/tmp/peekoo-collection-banner-square.jpg. Other background-capable sections inspected in source; not all background settings exercised live.
