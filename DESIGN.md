---
name: GRAIN
description: A restrained research presentation and regional agrifood analysis workspace.
colors:
  action-light: "#0066cc"
  action-dark: "#0071e3"
  action-hover-light: "#005bb5"
  action-hover-dark: "#0066cc"
  accent-light: "#0066cc"
  accent-dark: "#8ab9f1"
  mist-light: "#e8edf5"
  mist-dark: "#273242"
  canvas-light: "#f5f5f7"
  canvas-dark: "#161617"
  surface-light: "#ffffff"
  surface-dark: "#242426"
  sidebar-light: "#eeeef1"
  sidebar-dark: "#1c1c1e"
  muted-light: "#f0f0f2"
  muted-dark: "#2e2e31"
  ink-light: "#1d1d1f"
  ink-dark: "#f5f5f7"
  ink-secondary-light: "#515154"
  ink-secondary-dark: "#c5c5cb"
  ink-tertiary-light: "#636367"
  ink-tertiary-dark: "#a1a1a6"
  line-light: "rgba(29, 29, 31, .09)"
  line-dark: "rgba(255,255,255,.1)"
  line-strong-light: "rgba(29, 29, 31, .16)"
  line-strong-dark: "rgba(255,255,255,.2)"
  neutral-100-light: "rgb(245 245 247)"
  neutral-100-dark: "rgb(42 42 45)"
  neutral-200-light: "rgb(229 229 234)"
  neutral-200-dark: "rgb(53 53 57)"
  neutral-600-light: "rgb(81 81 84)"
  neutral-600-dark: "rgb(184 184 190)"
  neutral-800-light: "rgb(45 45 48)"
  neutral-800-dark: "rgb(232 232 237)"
  neutral-950-light: "rgb(20 20 22)"
  neutral-950-dark: "rgb(250 250 252)"
  plot-secondary-light: "#7c8da5"
  plot-secondary-dark: "#acbcd6"
  plot-historical-light: "#52637a"
  plot-historical-dark: "#b0bacb"
  burgundy-light: "#69434c"
  burgundy-dark: "#c79fab"
  cluster-industry: "#3b82f6"
  cluster-livestock: "#8b5cf6"
  cluster-frontier: "#ef4444"
  cluster-petro: "#64748b"
  cluster-population: "#f59e0b"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3rem,5.15vw,4.55rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-.04em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2rem,3.65vw,3.2rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-.035em"
  feature-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-.025em"
  feature-body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "14px"
    lineHeight: 1.625
  kpi-label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0"
  kpi-value:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(1.8rem,2.4vw,2.3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.035em"
rounded:
  card: "12px"
  comparison: "16px"
  toolbar: "9px"
  sidebar-item: "11px"
  chip: "6px"
  circle: "50%"
  pill: "999px"
spacing:
  compact-gap: "8px"
  mobile-gap: "12px"
  card-gap: "16px"
  card-mobile: "20px"
  card: "24px"
  kpi-mobile: "18px"
  desktop-gutter: "36px"
components:
  button-primary:
    backgroundColor: "{colors.action-light}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
    height: "46px"
  button-primary-dark:
    backgroundColor: "{colors.action-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover-light}"
  button-primary-dark-hover:
    backgroundColor: "{colors.action-hover-dark}"
  button-toolbar:
    textColor: "{colors.ink-secondary-light}"
    rounded: "{rounded.toolbar}"
    padding: "8px 11px"
    height: "36px"
  feature-card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.neutral-950-light}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  feature-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.neutral-950-dark}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  kpi-card:
    backgroundColor: "{colors.surface-light}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  kpi-card-dark:
    backgroundColor: "{colors.surface-dark}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  card-symbol:
    backgroundColor: "{colors.muted-light}"
    textColor: "{colors.ink-secondary-light}"
    rounded: "{rounded.circle}"
    width: "40px"
    height: "40px"
  input-country-search:
    backgroundColor: "rgb(245 245 247 / .8)"
    textColor: "{colors.neutral-950-light}"
    rounded: "{rounded.card}"
    padding: "6px 12px 6px 36px"
    height: "40px"
  chip-country:
    backgroundColor: "rgb(245 245 247 / .8)"
    rounded: "{rounded.chip}"
    padding: "2px 8px"
---

# Design System: GRAIN

## Overview

**Creative North Star: "Apple Store clarity, macOS workspace efficiency"**

GRAIN pairs a spacious research landing page with a compact analytical workspace for presentation judges. Its confirmed character is clean, elegant, and professional: system typography, graphite and silver surfaces, restrained blue actions, quiet metadata, and readable scientific evidence.

Cards are flat, lightly outlined, and purposefully spaced. Medium-weight headings and circular neutral icons keep the interface calm while scientific maps and charts retain meaningful category colors. Light, dark, and system appearances share the same component geometry. Supplied scientific SVGs remain authored evidence; no generated raster imagery forms part of this system.

**Key Characteristics:**
- Spacious landing composition and efficient workspace density.
- Graphite, silver, mist blue, and muted burgundy supporting palette.
- Thin borders, restrained corners, medium-weight feature headings.
- Theme-aware chrome with preserved scientific color semantics.
- Visible defaults, short responses, and reduced-motion adaptations.

## Colors

The palette separates calm interface chrome from meaningful scientific encodings. Frontmatter is normative; light/dark suffixes describe the resolved appearance, not separate identities.

### Primary
- **Action Blue:** filled primary actions use `action-light` or `action-dark`, with white text. Link, selection-outline, and focus colors use `accent-light` or `accent-dark`; dark appearance uses a lighter accent ink than its filled action.
- **Mist Blue:** selected steps and command results use the theme's `mist` surface.

### Secondary
- **Muted Burgundy:** comparative chart series use the theme's `burgundy` token; supporting historical and secondary series use their dedicated plot tokens. Primary chart series follow accent ink.

### Neutral
- **Silver Canvas / Graphite Canvas:** page backgrounds use `canvas`; cards and dialogs use `surface`; sidebar chrome uses `sidebar`; circular KPI icons use `muted`.
- **Graphite Ink / Soft Silver Ink:** `ink` carries values and major headings; secondary ink carries descriptions and controls; tertiary ink carries quiet metadata. Neutral utility ramps are separately theme-mapped and need not equal these ink roles.
- **Hairline / Strong Hairline:** `line` separates cards and rows; `line-strong` serves stronger outlines. Keep alpha-based borders tied to the current theme.

**The Scientific Color Rule.** Keep cluster, LISA, and heatmap colors attached to their existing scientific categories and thresholds. The supporting chrome palette does not replace these encodings. The five cluster colors in frontmatter preserve the map's industry, livestock, frontier, petro-economy, and population meanings.

## Typography

**Display and Body Font:** the platform system sans stack in frontmatter.
**Label/Mono Font:** `"SFMono-Regular", Consolas, monospace` for compact scientific metadata and keyboard hints; KPI values use the system sans with tabular numerals.

### Hierarchy
- **Display:** the hero role in frontmatter; its second phrase uses quieter ink. At tablet width it becomes `clamp(2.5rem,5.5vw,4rem)`; below (768px), `clamp(2.75rem,9vw,4rem)`; below (360px), (2.4rem).
- **Headline:** the section role in frontmatter; workspace page titles use (600), `clamp(1.6rem,2.7vw,2.3rem)`, line height (1.15), and tracking (-.035em), becoming (25px) below (768px).
- **Title:** feature headings use `feature-title`. Generic card titles use (16px), becoming (18px) from (640px); final workspace overrides keep card headings at (500).
- **Body:** feature descriptions use `feature-body`; hero copy uses (17px), line height (1.65), and a (42ch) maximum, becoming (15px) on smaller screens. Workspace introductory copy uses (13px) and line height (1.7).
- **Label / Value:** KPI roles use the frontmatter sizes; units and descriptions use (12px), descriptions have line height (1.6), and badges use (10px). Below (768px), KPI labels use (12px) and values (28px).

**The Quiet Card Rule.** Use medium-weight feature headings and neutral icon containers; establish hierarchy through size, spacing, and ink roles.

## Layout

Landing sections use a centered (1320px) maximum with desktop gutters (36px); the navigation uses (1360px). Desktop hero and section headings use two columns. Section block padding is (96px), then (72px) below (1024px), and (56px) below (768px). Mobile sections and hero use (24px) gutters; the smallest hero uses (20px).

The workspace has a sticky header (64px), sidebar (252px), optional collapsed rail (72px), and a flexible content region capped at (1500px). The sidebar becomes (220px) below (1024px). Below (768px), the header becomes (58px), the sidebar gives way to a navigation sheet, and content gutters become (16px), then (12px) below (360px). From (1440px), desktop content gutters become (44px).

Feature cards use a one/two/three-column grid at the Tailwind (768px)/(1024px) boundaries with (16px) gaps. Their explicit padding remains (24px); generic cards use (20px) padding below (640px). The landing KPI ledger has five columns on desktop, three below (1024px), two below (768px), and one below (360px). KPI gaps are (16px), becoming (12px) on mobile; KPI padding becomes (18px).

Module strips and walkthrough steps can scroll horizontally; tables scroll within their own regions. The triage narrative uses explicit phase controls below (768px), below (700px) viewport height, or with reduced motion. Preserve these adaptations when extending narrative surfaces.

Recorded browser evidence covers six routes at (320px), (390px), (768px), (1024px), and (1440px), in both appearances: 60 layout checks in `.impeccable/review/layout-audit.json`. Screenshot evidence is under `.impeccable/review`; it does not establish physical-device behavior.

## Elevation & Depth

Cards, feature panels, evidence figures, research notes, and figure viewers are flat at rest. Their thin outlines and surface contrast carry structure. Sticky chrome uses translucent backgrounds and blur (22px); reduced transparency makes it opaque. Popups, tooltips, toast messages, active sidebar items, and module icons retain localized shadows, captured in the sidecar. Primary-action hover has a small shadow response.

**The Flat Card Rule.** Do not reintroduce decorative glow or lifted card shadows. Use the current surface, border, and selected outline to communicate card state.

## Shapes

Shared cards, feature cards, KPI tiles, scientific figures, and figure viewers use the `card` corner. The large comparison panel retains the `comparison` corner. Toolbar controls and sidebar rows use their smaller dedicated corners. Primary actions and walkthrough steps are pills; feature and KPI icon containers are circles (40px). Module icons are a distinct larger shape (66px with 21px corners; 56px with 18px corners on mobile).

## Components

### Buttons

Primary actions are compact pills using the theme's action fill. The normal size has the padding and minimum height recorded in frontmatter; the small variant uses (7px 15px), minimum height (32px), and type (11px). Toolbar buttons are quieter, neutral controls with a muted hover background. Icon buttons are circles (40px).

Primary actions transition background over (.2s) and transform over (.15s) with `cubic-bezier(.16,1,.3,1)`; pressing scales to (.97). Toolbar, feature-choice, and sidebar press responses scale to (.985). Keep global focus visible: an accent outline (3px) with offset (4px); range inputs use offset (6px). Disabled native buttons use opacity (.5) and a disabled cursor.

### Chips

Country tags use quiet neutral fills, thin borders, small corners, and compact type (10px). Scientific frontier tags retain their semantic red treatment. Walkthrough pills use mist blue and accent ink when current; preserve `aria-current="step"`.

### Cards / Containers

Feature cards use a neutral circular icon (40px), medium title, readable description, and quiet badge/count metadata. Hover changes the border and surface opacity. Selected cluster cards retain `aria-pressed`, an accent border, and an inset (1px) accent outline; they remain keyboard operable with Enter and Space.

KPI tiles share the flat outline and circular icon language. Values use tabular numerals, wrap with units, and leave descriptions and badges subordinate. The optional tone API does not recolor KPI chrome. Current ledger content is data scope, observations, ASEAN LUC share, Moran's I, and N₂O spillover ratio; documentation samples do not define new research values.

### Inputs / Fields

Country search fields use a neutral translucent fill, thin border, and card corners, with a minimum height (40px) in workspace cards. The command palette uses a borderless search row (52px), mist-blue selected results, a focus-managed dialog, and existing Arrow/Enter/Escape behavior. Do not remove existing accessible labels or keyboard interactions when restyling controls.

### Navigation

Landing navigation is sticky with compact links and a responsive menu below (1024px). Workspace rows use neutral descriptions, accent ink for the current page, and a surface fill; collapsed mode retains icon access. On mobile, text and keyboard hints leave toolbar buttons while labels remain accessible. Theme selection supports Light, Dark, and System, follows system changes in System mode, and persists the choice under `grain.appearance`.

Dialog and page arrivals last (.24s)/(.26s) with the shared easing and small movement. Defaults are visible before motion. Reduced motion disables these arrivals and card transitions, removes narrative transforms, and disables smooth scrolling; keep these branches when adding states.

## Do's and Don'ts

### Do:
- **Do** reuse theme-aware surfaces, ink, and accent roles in both appearances.
- **Do** keep feature headings medium, circular icons neutral, and card borders thin.
- **Do** use tabular numerals for KPI values and scientific tables.
- **Do** preserve scientific SVGs, semantic map colors, controls, and keyboard access.
- **Do** preserve local table scrolling and compact narrative phase controls.

### Don't:
- **Don't** add decorative glow or resting shadows to shared cards.
- **Don't** recolor scientific categories to match interface chrome.
- **Don't** replace responsive controls with a fixed desktop composition.
- **Don't** treat screenshot dimensions as a guarantee of physical-device behavior.
