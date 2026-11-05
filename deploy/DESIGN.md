---
name: LLM Evals Gallery
description: A running feed of finished candidates, each one runnable in place.
colors:
  ink: "#16161a"
  ink-2: "#2b2b31"
  ink-3: "#3f3f46"
  muted: "#6b6b74"
  paper: "#ffffff"
  soft: "#f4f4f6"
  soft-2: "#fafafb"
  tile: "#f7f7f9"
  line: "#ececef"
  line-2: "#dcdce2"
  blue: "#2a5ff0"
  blue-ink: "#1d4ed8"
  blue-soft: "#eaf0ff"
  red: "#dc2f24"
  green: "#157a41"
  green-soft: "#e7f6ed"
  navy: "#121527"
  navy-ink: "#8c93b3"
  bar: "#d9d9e0"
typography:
  display:
    fontFamily: "Figtree, Noto Sans SC Heading, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Figtree, Noto Sans SC Heading, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.35
  title:
    fontFamily: "Figtree, Noto Sans SC Heading, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.45
  body:
    fontFamily: "Figtree, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  body-reading:
    fontFamily: "Figtree, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Figtree, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1.35
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
  stat:
    fontFamily: "Figtree, Noto Sans SC Heading, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.2
rounded:
  mark: "7px"
  key: "8px"
  item: "14px"
  card: "16px"
  container: "18px"
  stage: "20px"
  rail: "22px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "36px"
  sidebar: "300px"
  feed: "640px"
  rail: "380px"
components:
  pill:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
  pill-sm:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "32px"
    padding: "0 14px"
  pill-sm-pressed:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  play:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 18px"
  tag:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 10px"
  tag-ok:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
  badge:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "20px"
    padding: "0 6px"
  search:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    height: "40px"
    width: "280px"
  segmented:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "3px"
  nav-item:
    textColor: "{colors.ink}"
    rounded: "{rounded.item}"
    height: "44px"
    padding: "0 12px"
  nav-item-active:
    backgroundColor: "{colors.soft}"
  link-card:
    backgroundColor: "{colors.soft-2}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
  stage:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.stage}"
    height: "220px"
  rail-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.rail}"
    padding: "18px 20px 14px"
  fact-tile:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.muted}"
    rounded: "{rounded.container}"
    padding: "14px 18px"
  coverage-mark:
    backgroundColor: "{colors.blue}"
    rounded: "{rounded.mark}"
    size: "22px"
---

# Design System: LLM Evals Gallery

## Overview

**Creative North Star: "The Running Feed"**

The gallery is a cozy workspace feed: a white page, a fixed sidebar, a single reading column, and a right rail of facts. Each finished candidate arrives as a post, and its work runs in place inside a dark navy stage. The system is the owner's pinned direction, a soft minimalist SaaS dashboard, made concrete: light gray containers, hairline borders, medium-to-large radii, pill buttons, and type in place of illustration.

Density is comfortable rather than packed. Hierarchy comes from Figtree at heavy weights and from gray tonal steps, not from color. Color is reserved for jobs: blue marks presence and selection, red counts what is new, green confirms a report exists. The navy stage is the only dark surface, so the eye always finds the thing that runs.

The system shows facts only. Nothing in it is shaped like a score, a rank, a podium, or a thumbnail grid.

**Key Characteristics:**
- Pure white ground with gray containers (#f4f4f6 family) and #ececef hairlines.
- Radii from 14px to 22px on surfaces; every button and tag is a full pill.
- Figtree 700 to 800 for headings; JetBrains Mono only for paths, IDs, and dates.
- Tasks are identified by name, never by emoji or illustration; 1.7px-stroke line icons do navigation.
- One dark surface: the navy stage where a work runs.

## Colors

A near-monochrome gray ladder on white, with three small accents that each own a single meaning.

### Primary
- **Mark Blue** (`blue`): the coverage mark in the matrix, the busiest-week bar and its dashed annotation, the pressed run pill, the focus ring, and the caret. `blue-ink` is its hover and link-hover shade; `blue-soft` tints the row whose work is running and the search focus halo.

### Secondary
- **Stage Navy** (`navy`): the run-in-place stage, and nothing else. Its text is `navy-ink`, a desaturated lavender gray; the current-work title in the stage bar lifts to #d5d8e6.

### Tertiary
- **New Red** (`red`): the count badge for candidates from the last seven days, in the sidebar only.
- **Report Green** (`green` on `green-soft`): the "有报告" tag and the completion dot in a post footer.

### Neutral
- **Ink** (`ink`): headings and primary text; also the tooltip ground.
- **Graphite** (`ink-2`): excerpt prose.
- **Slate** (`ink-3`): tag text, secondary links, the model identifier quote.
- **Muted** (`muted`): meta lines, dates, counts, section labels, placeholders.
- **Paper** (`paper`): the page and every card ground.
- **Soft Gray** (`soft`): pills, tags, search, segmented control, active nav item.
- **Whisper** (`soft-2`): link cards, quote boxes, row hover.
- **Tile** (`tile`): fact tiles and the hover ground for nav, task, and list items.
- **Hairline** (`line`): every divider and container border. `line-2` is its hover and focus step.
- **Bar Gray** (`bar`): resting chart bars.

### Named Rules
**The Accents Do Jobs Rule.** Blue, red, and green each carry one meaning (present or selected, new, has a report). Never use them as decoration, section color, or brand wash.

**The One Dark Surface Rule.** Navy belongs to the stage. No other card, header, or panel goes dark.

## Typography

**Display Font:** Figtree (with Noto Sans SC Heading for Chinese headings, then PingFang SC and Microsoft YaHei)
**Body Font:** Figtree (with PingFang SC, Hiragino Sans GB, Microsoft YaHei)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Cascadia Mono)

**Character:** A friendly geometric sans at heavy weights gives the headings warmth; the monospace is a quiet utility voice reserved for machine facts.

### Hierarchy
- **Display** (800, 44px, 1.15, -0.02em): the view title, one per view. 32px below 820px.
- **Headline** (700, 22px, 1.35): post titles, balanced wrap. Rail section heads use the same size at 800. 20px on mobile.
- **Title** (700, 16px): rail card heads and model card heads; group heads step up to 18px at 800.
- **Body** (400, 15px, 1.6): base UI text. Excerpts read at 16px with 1.75 line height in `ink-2`.
- **Label** (600, 12.5px): tags, task meta, and small list captions; meta lines sit at 13 to 14px in `muted`.
- **Mono** (400, 12px): paths, candidate IDs, dates, chart axis, and the model identifier quote (13px).
- **Stat** (800, 30px, 1.2, tabular figures): the numbers in fact tiles.

### Named Rules
**The Machine Facts Rule.** JetBrains Mono appears only on strings a machine produced: paths, IDs, dates, identifiers. Never on headings, labels, or prose.

**The Tabular Count Rule.** Every count, date, and stat uses `font-variant-numeric: tabular-nums`.

## Layout

At 1200px and up, a three-column grid: a sticky sidebar `clamp(248px, 21vw, 300px)`, a fluid main column, and a sticky right rail `clamp(320px, 26.4vw, 380px)`. Columns are separated by single hairlines, not gaps or gutters. Main padding is `28px clamp(24px, 3.9vw, 56px) 64px`, and all content sits in one column capped at 640px.

Between 821px and 1199px the rail drops below the main column as an auto-fit grid of 260px minimums, capped to the feed width, with its chart card spanning the full row. At 820px and below everything stacks: the sidebar becomes a header whose views and tasks scroll horizontally as outlined pills, search moves to the top at full width, and the stage shrinks to 180px (220px wide).

Spacing rhythm runs on 6, 10, 16, 24, and 36px: 6px between tags, 10 to 12px inside lists, 16px for internal card padding, 24px between posts, and 36px between days. The post grid is a 52px avatar gutter plus content.

## Elevation & Depth

Flat by default. Depth comes from gray tonal steps (white, `soft-2`, `tile`, `soft`) and hairline borders. Shadows are soft, low, and ink-tinted, never colored and never hard-edged.

### Shadow Vocabulary
- **Rail** (`box-shadow: 0 1px 2px rgb(22 22 26 / 0.04), 0 10px 28px rgb(22 22 26 / 0.06)`): the weekly chart card in the rail, at rest. The only resting shadow in the system.
- **Lift** (`box-shadow: 0 1px 2px rgb(22 22 26 / 0.06), 0 6px 16px rgb(22 22 26 / 0.08)`): link cards on hover.
- **Nudge** (`box-shadow: 0 1px 2px rgb(22 22 26 / 0.06)`): small pills on hover.
- **Thumb** (`box-shadow: 0 1px 3px rgb(22 22 26 / 0.12)`): the pressed segment of the segmented control.
- **Stage Glow** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.35)`): the play pill on hover, inside the navy stage only.

### Named Rules
**The Resting Shadow Rule.** One surface wears a shadow at rest: the rail chart card. Everything else is flat until hovered.

## Shapes

Every surface is softly rounded and the radius grows with the container: 7px for coverage marks, 8px for keycaps and tooltips, 14px for nav and list items, 16px for link cards and quote boxes, 18px for model cards, entry lists, fact tiles, and the empty state, 20px for the stage and matrix frame, and 22px for the rail card. Interactive controls and tags are always full pills (999px); avatars and status dots are circles. Borders are 1px hairlines; the only dashed lines are the empty-state outline and the chart's busiest-week annotation.

## Components

### Buttons
Soft, low-contrast pills that warm on hover.
- **Shape:** full pill (999px).
- **Primary pill:** `soft` ground, ink text, 600 weight, 36px tall, 0 16px padding; hover deepens to #ebebef.
- **Small pill:** white ground with a `line` border, 32px tall, 13px text; hover shifts the border to `line-2`, the ground to `soft-2`, and adds the Nudge shadow. A run pill in its pressed state fills with Mark Blue and white text.
- **Play:** white pill on the navy stage, 40px, 700 weight, with a filled play icon. Hover lifts it 1px and adds the Stage Glow. It is the primary action on every post.
- **Stop:** white 30px pill in the stage bar, 700 weight; hover tints to #e9ecf8.
- **Focus:** a 2px `blue` outline at 2px offset on every focusable element.
- **Transitions:** background, border, shadow, color, and transform over 0.2s on `cubic-bezier(0.22, 1, 0.36, 1)`.

### Chips
- **Tag:** 24px `soft` pill with `ink-3` text at 12.5px/600; linked tags darken to #e8e8ed on hover.
- **Report tag:** `green-soft` ground, `green` text, with a 6px leading dot.
- **New badge:** 20px red pill with white tabular count, right-aligned in a sidebar task row.

### Cards / Containers
- **Corner Style:** 16 to 22px by size (see Shapes).
- **Background:** white for model cards and the rail card; `soft-2` for link cards and quotes; `tile` for fact tiles.
- **Shadow Strategy:** flat, except the rail card (Rail) and hovered link cards (Lift).
- **Border:** 1px `line` on every container.
- **Internal Padding:** 12 to 20px, typically 14px 16px.

### Inputs / Fields
- **Search:** a 40px `soft` pill up to 280px wide, with an 18px search icon and a `/` keycap in mono.
- **Hover:** ground deepens to #efeff2.
- **Focus:** ground turns white, border becomes `line-2`, a 4px `blue-soft` halo appears, and the keycap hides.

### Segmented Control
A `soft` pill track with 3px padding holding text buttons at 12px/600 in `muted`. The pressed segment becomes a white pill with ink text and the Thumb shadow. It switches reasoning effort in place.

### Navigation
- **Sidebar items:** 44px rows with a 20px line icon, 500 weight, 14px radius. Hover takes the `tile` ground; the current view takes `soft` and 700 weight.
- **Task rows:** the task name at 14.5px/600, a muted count and date line, and the red new badge. No leading icon.
- **Section label:** 13px/500 `muted` text over a hairline.
- **Mobile:** both lists become horizontal scrollers of outlined pills; task meta lines hide.

### Run-in-Place Stage (signature)
A navy card, 220px tall in a post (280px in the task view), holding only the Play pill and the work's path in mono (the task view holds a hint instead). Running grows it to the work's aspect plus a 48px bar (`calc(62.5cqw + 48px)`, capped at 78vh in the task view) over 0.5s. The iframe fades in over 0.4s behind a "正在载入…" placeholder. The bar shows the current title, an open-in-new-window link, and Stop. Only one work runs at a time, and the task view shares one stage across its candidates, tinting the running entry `blue-soft`.

### Coverage Matrix
A 20px-radius bordered frame holding a fixed-layout table: column heads that name each task in vertical 12.5px/600 `ink-3` text, read bottom to top and wrapping to a second line past 118px, vendor group rows in display type, and model rows whose cells are 22px Mark Blue squares (7px radius) for each candidate and a 5px gray dot for a gap. Marks scale to 1.1 and deepen to `blue-ink` on hover.

### Weekly Chart
Ten bars in `bar` gray with 5px top radii, the busiest week in Mark Blue with a dashed blue leader to a blue pill annotation. Hovering a bar shows a dark tooltip and hides the annotation. The axis is in 11.5px mono.

## Do's and Don'ts

### Do:
- **Do** keep the page white and build depth from the gray ladder (`soft`, `soft-2`, `tile`) and 1px `line` hairlines.
- **Do** make every button, tag, segmented control, and search field a full pill.
- **Do** name a task in text wherever it appears and navigate with 1.7px-stroke line icons; add no emoji or illustration.
- **Do** run a work inside the navy stage, one at a time, with the Play pill as the post's primary action.
- **Do** set paths, IDs, and dates in JetBrains Mono and every count in tabular figures.
- **Do** show a missing candidate as a visible gap (a gray dot), never as an empty space.

### Don't:
- **Don't** add scores, ranks, medals, or any visual that implies one candidate beats another.
- **Don't** present candidates as a thumbnail grid or a scoreboard table.
- **Don't** use blue, red, or green outside their single meanings, or introduce a fourth accent.
- **Don't** add a resting shadow to anything but the rail chart card, or use hard offset shadows.
- **Don't** put a dark surface anywhere but the stage.
- **Don't** set headings or labels in monospace.
