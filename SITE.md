# WSP Boot Camps Prototype

> UX prototype comparing 4 redesign directions for the Wall Street Prep public boot camps page.

## Project Purpose

This is a design prototype for Scott and Rob to review. It explores how to simplify the current Wall Street Prep public courses page (wallstreetprep.com/public-courses/) into a focused, clean experience for one core product:

**Financial Valuation Modeling Boot Camps** (New York and London, in-person only)

## What's on the Page

A single interactive page with 4 prototype options. Switch between them using the amber banner at the top of the page.

## The 4 Prototype Options

### Option 1: Clean Cards
- Location tabs (All / New York / London) that filter which cards show
- One card per boot camp offering
- Most like a traditional product listing, but much cleaner
- Good for: users who want to browse all options before committing

### Option 2: Upcoming Dates First
- Shows all upcoming sessions in a chronological list/table
- Small summary cards for each program at the top
- "Show more sessions" reveals additional dates
- Good for: users who already know the product and just want to pick a date

### Option 3: Location-Led
- Page is split into two city sections: New York and London
- Jump links from the hero let you go directly to your city
- The Financial Edge partnership is explained inline for London
- Good for: users who know their location and want to find their local option

### Option 4: Guided Decision / Comparison
- Starts with a 3-column comparison of all boot camp options (specs, duration, best-for)
- Shows NY camp as "Most Popular" with highlighted border
- Followed by a complete list of all upcoming sessions
- Good for: users who are undecided and need help choosing

## Boot Camp Offerings Represented

1. **New York FVM Boot Camp** — Wall Street Prep, 3 days, Jun/Aug/Oct/Dec
2. **London FVM Boot Camp** — Financial Edge (WSP partner), 5 days, Sep/Nov
3. **London AI-Powered FVM Boot Camp** — Financial Edge, 3 days, Jul/Oct

## Brand Notes

- Green accent: Tailwind green-700 (#15803d)
- London sessions carry a "Powered by Financial Edge" note throughout
- AI-Powered camp uses violet accents to distinguish it
- Typography: Space Grotesk (display) + DM Sans (body)

## Recent Changes

- 2026-05-28: Created full 4-option interactive prototype replacing the Ship Studio starter page

## Files

- `app/page.tsx` — All 4 prototype options in a single client component
- `app/layout.tsx` — Space Grotesk + DM Sans fonts already wired up
- `app/globals.css` — CSS variables (green accent was red by default — prototype uses Tailwind green classes directly)
