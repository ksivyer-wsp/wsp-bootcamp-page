# Ship Studio Project

This is a Next.js 14+ project with Tailwind CSS. You're helping a **non-developer** build a website. Keep explanations simple and jargon-free.

---

## Environment: Ship Studio App

You are running inside the **Ship Studio app**, which handles the development environment automatically.

**Important things to know:**
- The dev server is **already running** - you don't need to start it
- The user sees a live preview of their site in the app
- You don't need to run `npm run dev` or any server commands
- Changes to files are reflected automatically in the preview

**If the user says they can't see their site or the preview isn't working:**
> "Try clicking the **Projects** button in the top right corner to go back to the project list, then reopen your project. This restarts the preview."

---

## FIRST: Check for Onboarding

**Before doing anything else**, check if `SITE.md` exists.

- If `SITE.md` **does NOT exist**: Run the `/onboarding` skill immediately to learn about their business and create a personalized plan.
- If `SITE.md` **exists**: Read it to understand the project before making changes.

---

## Your Skills

You have specialized skills in `.claude/skills/`. **Use them constantly:**

| Skill | When to Use | Invocable |
|-------|-------------|-----------|
| **onboarding** | New project setup, no SITE.md exists | `/onboarding` |
| **page-remake** | User provides URL to remake/rebuild/recreate | `/page-remake` |
| **brand-identity** | Choosing colors, fonts, visual direction | Auto |
| **copywriting** | Writing any text for the site | Auto |
| **marketing-site-design** | Planning page layouts, sections | Auto |
| **sanity-cms** | User wants editable content/CMS | `/sanity-cms` |
| **documentation-writer** | After EVERY code change - update SITE.md | Auto |
| **react-nextjs-expert** | Writing any React/Next.js code | Auto |
| **frontend-design** | Creating any visual component | Auto |
| **animations** | Adding micro-interactions and motion | Auto |
| **react-best-practices** | Performance optimization | Auto |

### Workflow for Every Build Task

1. Check `SITE.md` for brand personality and preferences
2. Use `marketing-site-design` to plan section architecture
3. Use `brand-identity` to select colors/fonts (follow design principles)
4. Use `copywriting` to write specific, human-sounding text
5. Use `frontend-design` + `react-nextjs-expert` for implementation
6. Use `documentation-writer` to update SITE.md after changes

---

## Human-First Design Principles

Great design feels intentional and distinctive. These guidelines help create sites that stand out and feel memorable.

### The Goal

Sites should feel:
- **Intentional** - Every choice has a reason
- **Distinctive** - Not a copy of common patterns
- **Memorable** - Something visitors remember
- **Human** - Warm and approachable

### Typography Guidance

Common fonts like Inter, Roboto, and system fonts work well but are everywhere. For distinction, explore alternatives:

**Modern & Clean:**
- Space Grotesk + DM Sans
- Outfit + Source Sans 3
- Sora + Nunito

**Elegant & Refined:**
- Playfair Display + Lato
- Cormorant Garamond + Montserrat
- Fraunces + Work Sans

**Warm & Approachable:**
- Poppins + Nunito Sans
- Quicksand + Open Sans
- Comfortaa + Mulish

These aren't rules—they're starting points. The right font depends on the brand.

### Color Guidance

**Think twice about these common defaults:**
- `#3B82F6` (Tailwind blue-500) as primary accent - it's everywhere
- Purple-to-blue gradients on white backgrounds - very common
- Pure black `#000000` on pure white `#FFFFFF` - can feel harsh

**Consider instead:**
- Off-black (`#1C1917`) on off-white (`#FAFAF9`) for softer contrast
- Custom accent colors that reflect the brand's personality
- The 60-30-10 rule: 60% dominant, 30% secondary, 10% accent

### Layout Guidance

**Common patterns to use thoughtfully:**
- 3-column feature grids with generic icons - try alternatives like 2-column, asymmetric, or bento layouts
- Centered everything - vary alignment for visual interest
- Equal spacing throughout - vary spacing for rhythm

**Background patterns that feel dated:**
- Abstract blob SVGs
- Wave section dividers
- Gradient mesh backgrounds

Alternatives: geometric shapes, grain textures, solid colors with intentional variation, or high-quality photography.

### Writing Guidance

**Overused words to consider alternatives for:**
revolutionize, leverage, synergy, cutting-edge, seamless, empower, game-changer, next-generation, best-in-class, world-class, unlock, elevate, transform, streamline, robust, scalable, innovative, disrupt, holistic, ecosystem, paradigm, optimize, dynamic, curated, bespoke

**Instead:** Be specific. Use numbers. Focus on outcomes. Write like a human talking to another human.

---

## CRITICAL: Maintain Documentation

**You MUST keep documentation updated.** This is essential for non-technical users.

### Files to Maintain

1. **`SITE.md`** - The main documentation file. Update EVERY time you make changes:
   ```markdown
   # [Site Name]

   > [One-sentence tagline]

   ## Brand Identity
   - Personality: [from onboarding]
   - Colors: [what we're using]
   - Fonts: [what we're using]

   ## Pages
   - **Homepage** (`/`) - [description of what's on it]
   - **About** (`/about`) - [description]

   ## Components
   - **Navbar** - [what it contains, how to customize]
   - **Footer** - [what it contains]

   ## Recent Changes
   - [Date]: Added hero section with [description]
   - [Date]: Created contact page

   ## How to Customize
   - To change colors: [simple instructions]
   - To add a new page: [simple instructions]
   ```

2. **Create `SITE.md` immediately** if it doesn't exist (via onboarding).

3. **Update `SITE.md` after EVERY change** - no exceptions.

4. **Use simple language** - Say "the main page" not "the root route". Say "the navigation bar at the top" not "the header component".

---

## Project Structure

```
app/
├── layout.tsx       # The wrapper around all pages (has <html>, <body>)
├── page.tsx         # Homepage - EDIT THIS for the main page
├── globals.css      # Global styles + Tailwind
└── [folders]/page.tsx  # Other pages (about/, contact/, etc.)
components/          # Reusable pieces (Navbar, Footer, etc.) - create if needed
public/              # Images and static files
lib/                 # Helper functions (Sanity client, etc.)
sanity/              # CMS configuration (if added via /sanity-cms)
```

---

## Rules for Building

### DO:
- Run `/onboarding` for new projects without SITE.md
- Check SITE.md before every task for brand context
- Use skills for visual decisions and code patterns
- Edit `app/page.tsx` for the homepage
- Use Tailwind CSS classes for ALL styling
- Create a `components/` folder for reusable pieces
- Put images in `public/` folder
- Update `SITE.md` after every change
- Explain what you did in simple terms
- Make intentional, distinctive design choices

### DON'T:
- NEVER create `.html` files - this is React/Next.js
- NEVER create separate `.css` files - use Tailwind
- NEVER use `<script>` tags - this is React
- NEVER leave the user confused about what changed
- NEVER use technical jargon without explaining it
- NEVER skip updating SITE.md

---

## File-Based Routing

Each folder in `app/` becomes a page:
- `app/page.tsx` → Homepage (yoursite.com)
- `app/about/page.tsx` → About page (yoursite.com/about)
- `app/contact/page.tsx` → Contact page (yoursite.com/contact)
- `app/pricing/page.tsx` → Pricing page (yoursite.com/pricing)

---

## Example: Creating a New Page

If the user asks for an "About" page:

1. Check `SITE.md` for brand personality
2. Use `marketing-site-design` skill to plan sections
3. Use `brand-identity` skill for visual consistency
4. Create `app/about/page.tsx` using `react-nextjs-expert` patterns
5. Write copy using `copywriting` skill guidelines
6. **Update `SITE.md`** using `documentation-writer` skill
7. Tell the user: "I created an About page. You can see it by going to /about in the preview."

---

## After Every Task

1. Make the requested changes (using your skills, following design principles)
2. Update `SITE.md` with what changed
3. Tell the user what you did in plain English
4. Let them know how to see the changes

---

## Adding CMS (When Requested)

When the user wants to edit content themselves, run the `/sanity-cms` skill. This will:
1. Set up Sanity CMS in the project
2. Create schemas for editable content
3. Connect the frontend to fetch CMS data
4. Give them a friendly editing dashboard

The `.mcp.json` file is already configured for Sanity. User authenticates via OAuth when first using Sanity tools.

---

## Remember

The user is NOT a developer. They're using Ship Studio to build a website without coding knowledge. Your job is to:

1. **Onboard them properly** (if no SITE.md)
2. **Build what they ask for** (using your skills)
3. **Make it feel distinctive and intentional** (not generic)
4. **Keep everything documented** so they understand their site
5. **Explain things simply**
6. **Make them feel confident** about their project

**Always use your skills. Always follow design principles. Always update SITE.md.**

<!-- BRAND-GUIDELINES-START -->
## Brand Guidelines

### Colors

- **Page Background**: `#ffffff`
- **Primary Text**: `#000000`
- **Dark Charcoal**: `#303030`
- **Light Border**: `#e5e5e5`
- **Soft Cloud Surface**: `#f6f8f9`
- **Steel Mist Divider**: `#dce1e5`
- **Pale Silver Border**: `#d5d5d5`
- **Card Surface**: `#edf0f2`
- **Sky Blue Accent**: `#44c1e6`
- **Finance Gold**: `#ffcc00`
- **Midnight Navy**: `#0a2540`
- **WSP Core Blue**: `#0b8ecc`
- **Mint Green Accent**: `#2ce799`

### Fonts

- **Body**: InterVariable, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif
- **Heading**: Crimson Text, Georgia, serif
- **Mono**: Lucida Console, Monaco, Courier, monospace
- **Body**: Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif
- **Icons**: Font Awesome 6 Pro

### Voice & Tone

- Tone: Authoritative, professional, and results-driven — speaks with the confidence of a Wall Street insider, not an academic
- Vocabulary style: Technical and finance-specific (LBO, DCF, M&A, EBITDA) without over-explaining; assumes motivated learners who want real-world fluency
- Personality traits: Credentialed, career-focused, practical, and prestige-aware — references top-tier firms (Top 5 PE firms, Columbia, Wharton) as social proof without being boastful
- Do: Use specific outcomes and metrics ('build a 3-Statement Model', 'save hundreds of hours', '5x faster'); name-drop prestigious institutions and firms as proof points; write for ambitious finance professionals who want to advance quickly
- Do: Keep CTAs action-oriented and urgent ('Learn', 'Breaking Into', 'Attend', 'Get instant access') — readers are outcome-seekers
- Don't: Use vague transformation language ('revolutionize', 'empower', 'unlock your potential') — this audience values substance over inspiration
- Don't: Over-explain finance concepts in marketing copy; assume baseline literacy and respect the reader's intelligence
- Don't: Sound academic or passive — this is a practitioner-first brand, not a university catalog

### Assets

- **Logo**: `/wsp-logo-reverse.svg`

### Border Radii

- **Subtle Input**: `3px`
- **Button**: `4px`
- **Tag / Badge**: `6px`
- **Card**: `10px`
- **Pill**: `36px`
- **Circle**: `50%`

### Spacing

- **Micro**: `4px`
- **Tight**: `8px`
- **Base**: `16px`
- **Relaxed**: `24px`
- **Spacious**: `40px`
- **Section**: `80px`

### Usage Guide

#### Colors

This is a light-theme brand built on a white-to-near-white foundation. Use Page Background (#ffffff) for all primary surfaces and Soft Cloud Surface (#f6f8f9) or Card Surface (#edf0f2) for section panels and content cards; these subtle distinctions create depth without visual noise. Primary Text (#000000) and Dark Charcoal (#303030) handle all body and UI text, while Midnight Navy (#0a2540) anchors the brand header and high-authority elements. WSP Core Blue (#0b8ecc) drives interactive CTAs, links, and key callouts; Finance Gold (#ffcc00) should be used sparingly as a highlight or promotional accent; and Mint Green Accent (#2ce799) and Sky Blue Accent (#44c1e6) signal success states and secondary interactive elements.

#### Fonts

The type system prioritizes clean, cross-platform legibility — use the InterVariable / system-font stack as the default for all UI text, navigation, course listings, and body copy to ensure fast rendering and professional neutrality. Crimson Text or Georgia can be introduced for editorial pull quotes, hero headlines, or certificate-adjacent contexts where gravitas and tradition are needed, reinforcing the brand's Ivy League partnership credibility. Reserve the monospace stack (Lucida Console, Monaco, Courier) strictly for code snippets, model formula references, or data-table contexts, and use Font Awesome 6 Pro consistently for all iconography across the interface.

#### Border Radii

The radius system is intentionally restrained, reflecting a corporate and credentialed identity rather than a consumer-app softness. Apply 3px–4px to inputs and primary buttons to keep the interface sharp and trustworthy; use 6px for tags, skill badges, and small labels, and 10px for course cards and modal containers where a touch of warmth is appropriate. Reserve the Pill (36px) for filter chips and promotional badges, and Circle (50%) for avatar thumbnails and circular icon containers.

#### Spacing

The spacing scale is grounded in an 8px base unit, ensuring visual rhythm across dense information layouts typical of a course catalog. Use Micro (4px) for icon-to-label gaps and inline element nudges, Tight (8px) for intra-component padding like button interiors and list item gaps, and Base (16px) as the standard padding for cards, inputs, and content containers. Relaxed (24px) separates sibling components within a section, Spacious (40px) creates breathing room between major UI blocks, and Section (80px) defines the vertical rhythm between full-width page sections.
<!-- BRAND-GUIDELINES-END -->
