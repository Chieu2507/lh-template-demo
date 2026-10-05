# Strideo animation audit and implementation

Reference: Elvara trial191896977707, product_tabs_F9kqtF. Audited through editor/rendered DOM, without copying trial source. CLI cannot retrieve this trial theme.

Observed: global Enable image zoom / Enable block animations toggles. Heading Type None/Fade/Scale/Slide from left/right/bottom/Rotate words; conditional Delay, sample Rotate words50ms; default inspected heading None, delay250ms. Rendered Rotate words preserves inline emphasis and wraps individual words; active slide controls entrance. Card presentation is global Theme settings, not per-card animation settings. Reference collection tabs currently contain placeholder products, with no per-card reveal attributes; exact real-product entrance timing cannot be confirmed from that state. Carousel speed300ms from rendered options.

Implementation: extend existing motion global toggle, six kernel blocks with Type/Delay, independent viewport/lifecycle controller. None default preserves user configuration. Strideo title/eyebrow/body/button/image instances use conservative entrance presets; editorial scroll text/marquee keep dedicated controllers. Component product/collection cards share75ms stagger. Never transform Swiper wrappers/slides; Image-card entrance targets its media inner wrapper. Hidden tabs/slide content waits for activation; selected editor blocks become visible; reduced motion and global-off show all immediately. Observers clean up removed nodes.

Existing button/media hover, drawer, announcement, carousel, scrolling editorial and countdown behavior remains component owned. This is a native Spinel implementation matching observed interaction categories, not a claim of identical unobservable trial timings.

## QA receipt

- Uploaded to Strideo draft191953273131 only. Reference theme edits used to inspect conditional Delay were undone; its Save remained disabled. No publish/commit.
- Runtime: 26 component targets initialized; active slide heading split into words, later inactive slides pending; switching Multiple images Item activates its4word heading and body/button, no pending visible contents. Switching collection tabs reveals the5visible cards; remaining3offscreen cards wait for horizontal entry. Mobile375px has no horizontal overflow, final section header has5words and becomes visible on scroll. No captured JavaScript errors.
- Editor: Heading Type exposes all7types, Rotate words selected with50msDelay; Group offers six non-text entrance types. Settings placed before Padding.
- Automated controller fixture: PASS entrance only once, global-off, initial/runtime reduced-motion, active-animation cancellation and removed-node cleanup. Physical reduced-motion browser emulation and add/remove/reorder in editor NOT TESTED.
- Theme Check0errors/36warnings (35pre-existing; new ExcessiveSettingsCount advisory for Group42settings after addingType/Delay). All settings map to rendered attributes and controller. JS syntax and whitespace checks pass.
- Hover zoom for Image card now consumes the shared motion-image-zoom token so global image zoom toggle applies. Word emphasis/link structure retained; completed WAAPI animations are cancelled to release backdrop/filter layers.
