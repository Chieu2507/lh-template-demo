# Showcase active scale

Scope: existing Showcase media presentation on Fluxstep-template. Reuse Swiper active classes and the existing media wrapper; keep Swiper slide geometry unchanged.
Behavior: ready carousel inactive media scale 0.85, active media scale 1; centered transform origin and transition follow slide state. Hover does not change scale. No new schema or saved-data changes.
Fallback/lifecycle: before initialization media retains full size. Suppress media transition during loop reset and reduced motion. Existing section/block initialization remains the runtime owner.
QA: Theme Check, diff whitespace, desktop active/inactive computed transforms, next/previous across loop reset, hover stability, mobile overflow. Editor selection/lifecycle unchanged; live editor QA if available.

Verified: active media matrix(1), previous/next matrix(0.85), across all three next actions and loop reset; mobile 375 no overflow. Uploaded to Fluxstep draft. Following user instruction supersedes earlier hover suppression: inner image zoom obeys global setting while outer item scale stays based on active state.

Follow-up: investigate repeated scale after navigation. Clone-to-original loop restoration currently removes the transition suppression class in the same JavaScript task without committing the replacement slide's computed style. Commit final styles while suppression is active; also suppress nested image hover transition for this internal restoration, so the equivalent original slide does not replay media/hover scaling. Preserve global image hover for normal pointer entry.

Follow-up delivery: committed replacement slide layout before removing is-loop-reset; nested image transitions are suppressed during that internal reset. Uploaded showcase CSS/JS to Fluxstep draft. Next across end and Previous across start verified returning to original active slide at scale 1, immediate neighbors 0.85. JS syntax, whitespace and Theme Check/MCP validation pass. Frame-level animation sampling was unavailable through the browser's read-only DOM surface; final states and rendered preview were verified.
