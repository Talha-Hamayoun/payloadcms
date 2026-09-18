# MotoForge Style Guide

Modern · Premium · Automotive · Performance · Clean

## Brand personality

MotoForge feels like a specialist motorcycle workshop: precise, confident, and performance-minded. Visual language evokes asphalt, steel, and controlled aggression — never playful SaaS gradients or generic startup pastels.

## Design tokens

Defined in `src/app/(frontend)/globals.css` via Tailwind `@theme`.

| Role | Token | Hex / value | Usage |
| --- | --- | --- | --- |
| Primary / ink | `ink` | `#0B0D10` | Text, dark chrome, hero |
| Ink soft | `ink-soft` | `#151820` | Elevated dark panels |
| Surface | `surface` | `#FFFFFF` | Cards, header, forms |
| Background | `paper` | `#F3F4F6` | Page background |
| Muted | `muted` / `paper-muted` | `#E8EAEE` | Secondary surfaces |
| Border | `border` | `#D4D8DE` | Hairline borders |
| Text secondary | `steel` | `#6B7280` | Meta, captions |
| Steel light | `steel-light` | `#9CA3AF` | Dividers on dark / placeholders |
| Accent | `accent` | `#E10600` | CTAs, focus, sale, active nav |
| Accent hover | `accent-hover` | `#C40500` | Hover CTAs |
| Success | `success` | `#15803D` | In stock / fitment check |
| Warning | `warning` | `#B45309` | Pre-order / caution |
| Error | `error` | `#DC2626` | Form errors |

Do not introduce random brand colors. One accent only.

## Typography

- **Display:** Oswald — hero, section titles, nav emphasis, buttons. Use `.font-display` (uppercase, tracked).
- **Body:** Barlow — product names, paragraphs, forms, UI chrome. Sentence case.

Scale:

- Hero H1: ~2.5–3.35rem display
- Section H2: ~1.5–2rem display
- Product title: ~0.95–1.125rem body semibold
- Body: 1rem / 1.6
- Meta: 0.6875–0.75rem uppercase tracked

Do **not** force uppercase on every heading — reserve display treatment for intentional moments.

## Spacing

8px base: 4, 8, 12, 16, 24, 32, 48, 64, 80.

Section padding: `py-14 md:py-20`.

## Radius & shadow

- Controls / cards: `radius-md` (0.25rem) — restrained
- Never pill primary buttons
- Cards: hairline `border` + optional `shadow-card` on hover
- Avoid `shadow-xl`, `rounded-3xl`, glassmorphism

## Layout

- Max width: `75rem` via `.container-site`
- Product grid: 1 / 2 / 3 / 4 columns
- Listing: sticky filter sidebar `lg+`; mobile Filters & sort sheet

## Components

### Header

Two-tier:

1. Utility: logo · search · WhatsApp CTA
2. Nav: Shop Parts mega-menu + primary links with active underline

Mobile: left drawer with expandable Shop Parts.

### Buttons

`primary` | `secondary` | `outline` | `ghost` | `destructive`  
Sizes: `sm` | `md` | `lg` | `icon`

### Forms

Label above; `border-border` surface inputs; accent focus ring; `error` text in `--color-error`.

### Product cards

4:3 image · max one status badge · category meta · name · fitment line · price. No wishlist/cart/ratings unless productized later.

### Bike finder

Elevated surface panel overlapping hero; brand → model → category → Find parts.

## Motion

150–220ms ease-out. Image zoom on card hover. Respect `prefers-reduced-motion`.

## Accessibility

Semantic landmarks, visible focus (`outline-accent`), labeled controls, keyboard menus/drawers, meaningful `alt`.

## Anti-patterns

Avoid: purple SaaS themes, excess gradients, rounded-3xl everywhere, shadow stacks, badge clutter, Inter/Roboto, inventing cart/wishlist UI, custom admin dashboards (use Payload Admin).
