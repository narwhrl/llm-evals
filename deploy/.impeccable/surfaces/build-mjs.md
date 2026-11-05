---
version: 1
slug: "build-mjs"
primary_target: "build.mjs"
related_targets: []
---

Scope: the gallery index that `build.mjs` writes to `public/index.html`. Mode: Operate. Audience: the curator, on a desktop browser, checking what arrived and comparing works. Facts only: no scores, no rankings, no invented claims.

## Direction contract

THESIS: the gallery is a running feed. Each finished candidate arrives as a post whose work runs in place, so seeing what a model made takes one click. It refuses the category defaults of a thumbnail grid and a scoreboard table.

OWN-WORLD: pure white ground, #f4f4f6 gray containers, #ececef hairlines, 14 to 22px radii, a soft two-layer shadow only on rail cards. Figtree bold headings; JetBrains Mono only for paths, IDs, and dates. Tasks are named, never illustrated; line icons serve as navigation. Navy #121527 stage cards. Accents do jobs: blue #2a5ff0 for marks and the chart highlight, red badges for new candidates in the last seven days, and green for "有报告". Buttons are pills.

STORY: the curator sees what arrived lately and from whom, and runs any work inline. They can then jump to the same task to compare vendors, find one model's works under any reasoning effort, and see where coverage has gaps.

FIRST VIEWPORT: three columns at 1440px.
- Left: a 300px sidebar with the identity wordmark, three views, and the tasks as wrapping chips, each showing its candidate count and a red dot when it has new candidates.
- Center: the feed at max 640px. It opens with "最近完成" at 44px/800 and a meta line. The newest post follows, with its navy stage and the "在这里运行" pill as the primary action.
- Right: a 380px rail with the weekly bar chart annotated at the busiest day, 2×2 fact tiles, and the least-covered tasks.

FORM: workspace feed after the user's three-column reference image, locked on the decision page from outside the dealt list. Signature interaction: run in place. A stage grows into the live work; one work runs at a time; the task view shares one stage across its candidates. seed:4c67188bc5ff530c

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
