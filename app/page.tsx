'use client';

import { useState } from 'react';

// ─── Design tokens (from live WSP site) ──────────────────────────────────────
// Font:        InterVariable → Inter (Google Fonts)
// Nav bg:      #1a1d22
// Body text:   #303030
// Blue accent: #0b8ecc  (buttons, links, "Boot Camp" sticker)
// Surface:     #f6f8f9
// Border:      #ededed
// Muted:       #9ea1a3

// ─── Types ───────────────────────────────────────────────────────────────────

type LocationCode = 'new-york' | 'london';
type LocationFilter = 'all' | LocationCode;
type OptionId = '1' | '2' | '3' | '4';

type Camp = {
  id: string;
  name: string;
  locationLabel: string;
  locationCode: LocationCode;
  provider: string;
  poweredBy: string | null;
  duration: string;
  topics: string[];
  nextDate: string;
  additionalDates: string[];
  price: string;
  cta: string;
  isAI: boolean;
  bestFor: string;
  description: string;
  thumbImg: string;
};

type Session = {
  campId: string;
  date: string;
  year: string;
  sortKey: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const CAMPS: Camp[] = [
  {
    id: 'ny',
    name: 'Financial Valuation Modeling Boot Camp',
    locationLabel: 'New York',
    locationCode: 'new-york',
    provider: 'Wall Street Prep',
    poweredBy: null,
    duration: '3 Days',
    topics: ['Financial Modeling', 'Valuation', 'M&A'],
    nextDate: 'Jun 10 – 12',
    additionalDates: ['Aug 5 – 7', 'Oct 14 – 16', 'Dec 2 – 4'],
    price: '$3,500',
    cta: 'View Details',
    isAI: false,
    bestFor: 'Analysts building core Wall Street financial skills',
    description:
      'The #1 Financial Valuation Modeling Boot Camp. An intensive 3-day in-person program covering financial modeling, DCF, and M&A — the same training used on Wall Street.',
    thumbImg: 'https://media.wallstreetprep.com/uploads/2020/10/04081258/adam-virtual-400.jpg',
  },
  {
    id: 'london5',
    name: 'Financial Valuation Modeling Boot Camp',
    locationLabel: 'London',
    locationCode: 'london',
    provider: 'Financial Edge',
    poweredBy: 'Financial Edge',
    duration: '5 Days',
    topics: ['Financial Modeling', 'Valuation', 'M&A', 'Comps', 'LBO'],
    nextDate: 'Sep 8 – 12',
    additionalDates: ['Nov 3 – 7'],
    price: '£3,200',
    cta: 'View Details',
    isAI: false,
    bestFor: 'Finance professionals seeking a comprehensive deep dive',
    description:
      'A 5-day in-person classroom program covering the full spectrum of valuation — financial modeling, DCF, M&A, comps, and LBO — delivered in London by Financial Edge.',
    thumbImg: 'https://media.wallstreetprep.com/uploads/2020/10/04081542/wsp-course-thumb-mergers.jpg',
  },
  {
    id: 'londonAI',
    name: 'AI-Powered Financial Valuation Modeling Boot Camp',
    locationLabel: 'London',
    locationCode: 'london',
    provider: 'Financial Edge',
    poweredBy: 'Financial Edge',
    duration: '3 Days',
    topics: ['AI in Finance', 'Financial Modeling', 'Valuation'],
    nextDate: 'Jul 15 – 17',
    additionalDates: ['Oct 8 – 10'],
    price: '£2,800',
    cta: 'View Details',
    isAI: true,
    bestFor: 'Analysts who want to use AI to accelerate financial modeling',
    description:
      'Learn to use AI to accelerate financial modeling and analysis. A modern approach to valuation built for how finance is evolving — less manual Excel, more AI-assisted output.',
    thumbImg: 'https://media.wallstreetprep.com/uploads/2020/10/04081253/e-research.jpg',
  },
];

const ALL_SESSIONS: Session[] = [
  { campId: 'ny',       date: 'Jun 10 – 12', year: '2026', sortKey: '2026-06-10' },
  { campId: 'londonAI', date: 'Jul 15 – 17', year: '2026', sortKey: '2026-07-15' },
  { campId: 'ny',       date: 'Aug 5 – 7',   year: '2026', sortKey: '2026-08-05' },
  { campId: 'london5',  date: 'Sep 8 – 12',  year: '2026', sortKey: '2026-09-08' },
  { campId: 'londonAI', date: 'Oct 8 – 10',  year: '2026', sortKey: '2026-10-08' },
  { campId: 'ny',       date: 'Oct 14 – 16', year: '2026', sortKey: '2026-10-14' },
  { campId: 'london5',  date: 'Nov 3 – 7',   year: '2026', sortKey: '2026-11-03' },
  { campId: 'ny',       date: 'Dec 2 – 4',   year: '2026', sortKey: '2026-12-02' },
].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

// ─── WSP Row — matches wspl-event-result HTML structure exactly ───────────────
//
// Desktop layout: [thumb 2/12] [title+desc 6/12] [sticker 1/12] [date 2/12] [price 1/12] [→]
// Mobile layout:  [title+desc 9/12] [→]   (date+price folded into subtitle)

function BootCampRow({
  camp,
  date,
}: {
  camp: Camp;
  date?: string;           // override nextDate (used in the dates-first view)
}) {
  const displayDate = date ?? camp.nextDate;
  const showAdditional = !date && camp.additionalDates.length > 0;

  return (
    <a
      href="#"
      className="block relative group"
      style={{ border: '1px solid #ededed', color: '#303030', background: '#fff' }}
    >
      <div className="flex items-stretch">
        {/* ── Thumbnail (desktop only, col--2) ─────────────────────────── */}
        <div
          className="hidden md:block shrink-0"
          style={{
            width: '140px',
            backgroundImage: `url(${camp.thumbImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRight: '1px solid #ededed',
            minHeight: '100px',
          }}
        />

        {/* ── Title + description (col--6 / bp1-col--9) ────────────────── */}
        <div
          className="flex-1 px-4 py-4"
          style={{ minWidth: 0 }}
        >
          <h5
            className="font-semibold leading-snug"
            style={{ fontSize: '15px', color: '#303030' }}
          >
            {camp.name}
          </h5>

          {/* Desktop: description */}
          <div
            className="mt-1 hidden md:block"
            style={{ fontSize: '13px', color: '#9ea1a3', lineHeight: '1.5' }}
          >
            <p>{camp.description}</p>
            {camp.poweredBy && (
              <p className="mt-0.5" style={{ fontSize: '12px' }}>
                Powered by Financial Edge
              </p>
            )}
          </div>

          {/* Mobile: date + price inline (--show-900 equivalent) */}
          <div
            className="mt-1 md:hidden"
            style={{ fontSize: '13px', color: '#9ea1a3' }}
          >
            {displayDate}, {camp.locationLabel}
            &nbsp;&nbsp;
            <strong style={{ color: '#0b8ecc' }}>{camp.price}</strong>
          </div>
        </div>

        {/* ── Duration column (desktop only) ───────────────────────────── */}
        <div
          className="hidden md:flex shrink-0 items-center py-4 pr-3"
          style={{ width: '90px' }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#0b8ecc',
              background: '#e8f4fb',
              padding: '2px 8px',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            {camp.duration}
          </span>
        </div>

        {/* ── Date column (col--2, desktop only) ───────────────────────── */}
        <div
          className="hidden md:block shrink-0 py-4 pr-3"
          style={{ width: '140px' }}
        >
          <h5
            className="font-semibold"
            style={{ fontSize: '15px', color: '#303030' }}
          >
            {displayDate}
          </h5>
          <div style={{ fontSize: '12px', color: '#9ea1a3', marginTop: '4px' }}>
            {showAdditional && <p>+ Additional Dates</p>}
            <p>{camp.locationLabel}</p>
          </div>
        </div>

        {/* ── Price column (col--1, desktop only) ──────────────────────── */}
        <div
          className="hidden md:flex shrink-0 items-center py-4 pr-3"
          style={{ width: '80px' }}
        >
          <h5
            className="font-semibold"
            style={{ fontSize: '15px', color: '#303030' }}
          >
            {camp.price}
          </h5>
        </div>

        {/* ── CTA button ───────────────────────────────────────────────── */}
        <div className="flex items-center px-4 shrink-0">
          <button
            style={{
              background: '#0b8ecc',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              padding: '7px 14px',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            {camp.cta}
          </button>
        </div>
      </div>
    </a>
  );
}

// ─── Column header row (matches WSP's "EVENT | FORMAT | DATE & TIME | PRICE") ──

function TableHeader({ cols }: { cols: string[] }) {
  return (
    <div
      className="hidden md:flex items-center"
      style={{ background: '#f6f8f9', border: '1px solid #ededed', marginBottom: '4px' }}
    >
      {/* Event — spans thumbnail + content, starts at far left */}
      <div className="flex-1 px-4 py-2.5">
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {cols[0]}
        </span>
      </div>
      {/* Duration */}
      <div className="shrink-0 py-2.5 pr-3" style={{ width: '90px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {cols[1]}
        </span>
      </div>
      {/* Date & Location */}
      <div className="shrink-0 py-2.5 pr-3" style={{ width: '140px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {cols[2]}
        </span>
      </div>
      {/* Price */}
      <div className="shrink-0 py-2.5 pr-3" style={{ width: '80px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {cols[3]}
        </span>
      </div>
      {/* CTA button spacer */}
      <div className="shrink-0" style={{ width: '120px' }} />
    </div>
  );
}

// ─── WSP Header ───────────────────────────────────────────────────────────────

function WSPHeader() {
  return (
    <header style={{ background: '#0b8ecc' }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-7">
          {/* Logo */}
          <img
            src="https://media.wallstreetprep.com/wspimage/wsp-logo-reverse.svg"
            alt="Wall Street Prep"
            style={{ height: '28px', width: 'auto' }}
          />
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {['Self-Study', 'Boot Camps', 'Finance Coaching', 'Corporate', 'University', 'Free Content'].map((item) => (
              <span
                key={item}
                className="cursor-pointer transition-colors"
                style={{
                  fontSize: '13px',
                  color: item === 'Boot Camps' ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontWeight: item === 'Boot Camps' ? 600 : 400,
                }}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="px-6 py-14 relative"
      style={{
        backgroundImage: 'url(https://media.wallstreetprep.com/uploads/2022/07/14174731/banner-instructor3.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(20, 24, 30, 0.78)' }} />
      <div className="max-w-6xl mx-auto relative">
        <h1
          className="font-bold text-white leading-tight mb-4"
          style={{ fontSize: '52px', letterSpacing: '-0.5px', lineHeight: 1.1 }}
        >
          {title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6, maxWidth: '520px' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ─── Shared: list wrapper ─────────────────────────────────────────────────────

function RowList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  );
}

// ─── Option 1: Clean Card-Based → Row-Based Listing ───────────────────────────

function Option1() {
  const [location, setLocation] = useState<LocationFilter>('all');
  const filtered = CAMPS.filter((c) => location === 'all' || c.locationCode === location);

  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <Hero
        title="Attend a Wall Street Prep In-Person Boot Camp"
        subtitle="Build practical financial modeling, valuation, and M&A skills through immersive live classroom training in New York and London."
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Location tabs */}
        <div className="flex items-center gap-0 mb-6" style={{ display: 'inline-flex', border: '1px solid #ededed', borderRadius: '2px', overflow: 'hidden', background: '#fff' }}>
          {([
            { val: 'all',      label: 'All' },
            { val: 'new-york', label: 'New York' },
            { val: 'london',   label: 'London' },
          ] as { val: LocationFilter; label: string }[]).map(({ val, label }, i, arr) => (
            <button
              key={val}
              onClick={() => setLocation(val)}
              className="px-5 py-2 transition-colors"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                background: location === val ? '#1a1d22' : '#fff',
                color: location === val ? '#fff' : '#303030',
                borderRight: i < arr.length - 1 ? '1px solid #ededed' : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Rows */}
        <RowList>
          <TableHeader cols={['Event', 'Duration', 'Date & Location', 'Price']} />
          {filtered.map((camp, i) => (
            <BootCampRow key={camp.id} camp={camp} />
          ))}
        </RowList>

        <p className="mt-6" style={{ fontSize: '12px', color: '#9ea1a3', textAlign: 'center' }}>
          London sessions are delivered by Financial Edge, a Wall Street Prep partner institution.
        </p>
      </div>
    </div>
  );
}

// ─── Option 2: Upcoming Dates First ──────────────────────────────────────────

function Option2() {
  const [showAll, setShowAll] = useState(false);
  const INITIAL = 4;
  const sessions = showAll ? ALL_SESSIONS : ALL_SESSIONS.slice(0, INITIAL);

  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <Hero
        title="Attend a Wall Street Prep In-Person Boot Camp"
        subtitle="Build practical financial modeling, valuation, and M&A skills through immersive live classroom training in New York and London."
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Program summary strip */}
        <div
          className="flex flex-col sm:flex-row mb-8 overflow-hidden"
          style={{ border: '1px solid #ededed', borderRadius: '2px', background: '#fff' }}
        >
          {CAMPS.map((camp, i) => (
            <div
              key={camp.id}
              className="flex-1 p-4"
              style={{ borderRight: i < CAMPS.length - 1 ? '1px solid #ededed' : 'none' }}
            >
              <p className="font-semibold" style={{ fontSize: '13px', color: '#303030', lineHeight: 1.3 }}>
                {camp.name}
              </p>
              {camp.isAI && (
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', marginTop: '2px' }}>
                  AI-Powered
                </p>
              )}
              <p style={{ fontSize: '12px', color: '#9ea1a3', marginTop: '4px' }}>
                {camp.duration} · {camp.provider}
                {camp.poweredBy ? ' (Financial Edge)' : ''}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming sessions */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold" style={{ fontSize: '17px', color: '#303030' }}>
            Upcoming Sessions
          </h2>
          <span style={{ fontSize: '13px', color: '#9ea1a3' }}>{ALL_SESSIONS.length} sessions · 2026</span>
        </div>

        <RowList>
          <TableHeader cols={['Event', 'Duration', 'Date & Location', 'Price']} />
          {sessions.map((session) => {
            const camp = CAMPS.find((c) => c.id === session.campId)!;
            return (
              <BootCampRow
                key={`${session.campId}-${session.sortKey}`}
                camp={camp}
                date={session.date}
              />
            );
          })}
        </RowList>

        {!showAll && ALL_SESSIONS.length > INITIAL && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 font-medium hover:underline"
            style={{ fontSize: '13px', color: '#0b8ecc' }}
          >
            + Show {ALL_SESSIONS.length - INITIAL} more sessions
          </button>
        )}

        <p className="mt-8 text-center" style={{ fontSize: '12px', color: '#9ea1a3' }}>
          London sessions delivered by Financial Edge, a Wall Street Prep partner institution.
        </p>
      </div>
    </div>
  );
}

// ─── Option 3: Location-Led ───────────────────────────────────────────────────

function Option3() {
  const nyCamp = CAMPS.find((c) => c.id === 'ny')!;
  const londonCamps = CAMPS.filter((c) => c.locationCode === 'london');

  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <Hero
        title="Attend a Wall Street Prep In-Person Boot Camp"
        subtitle="Build practical financial modeling, valuation, and M&A skills through immersive live classroom training in New York and London."
      />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* New York */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="text-white font-semibold px-3 py-1 text-[13px]"
              style={{ background: '#0b8ecc', borderRadius: '2px' }}
            >
              New York
            </div>
            <p style={{ fontSize: '13px', color: '#9ea1a3' }}>
              Wall Street Prep · {nyCamp.additionalDates.length + 1} dates in 2026
            </p>
            <div className="flex-1 h-px" style={{ background: '#ededed' }} />
          </div>
          <RowList>
            <TableHeader cols={['Event', 'Duration', 'Date & Location', 'Price']} />
            <BootCampRow camp={nyCamp} />
          </RowList>
        </section>

        {/* London */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="text-white font-semibold px-3 py-1 text-[13px]"
              style={{ background: '#c0392b', borderRadius: '2px' }}
            >
              London
            </div>
            <p style={{ fontSize: '13px', color: '#9ea1a3' }}>
              Powered by Financial Edge · Multiple dates in 2026
            </p>
            <div className="flex-1 h-px" style={{ background: '#ededed' }} />
          </div>
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2"
            style={{ background: '#fff', border: '1px solid #ededed', borderRadius: '2px', fontSize: '13px', color: '#555' }}
          >
            <span style={{ color: '#9ea1a3' }}>ⓘ</span>
            London sessions are delivered by Financial Edge, a Wall Street Prep partner.{' '}
            <span className="font-medium cursor-pointer hover:underline" style={{ color: '#0b8ecc' }}>
              Learn more
            </span>
          </div>
          <RowList>
            <TableHeader cols={['Event', 'Duration', 'Date & Location', 'Price']} />
            {londonCamps.map((camp) => (
              <BootCampRow key={camp.id} camp={camp} />
            ))}
          </RowList>
        </section>
      </div>
    </div>
  );
}

// ─── Option 4: Guided Decision / Comparison ───────────────────────────────────

function Option4() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <Hero
        title="Attend a Wall Street Prep In-Person Boot Camp"
        subtitle="Build practical financial modeling, valuation, and M&A skills through immersive live classroom training in New York and London."
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Comparison */}
        <h2 className="font-semibold mb-5" style={{ fontSize: '17px', color: '#303030' }}>
          Choose the right boot camp
        </h2>

        <div
          className="grid md:grid-cols-3 mb-10 overflow-hidden"
          style={{ border: '1px solid #ededed', borderRadius: '2px' }}
        >
          {CAMPS.map((camp, i) => (
            <div
              key={camp.id}
              className="bg-white p-5 flex flex-col gap-3"
              style={{
                borderRight: i < CAMPS.length - 1 ? '1px solid #ededed' : 'none',
                borderTop: i === 0 ? `3px solid #0b8ecc` : i === 1 ? '3px solid #c0392b' : '3px solid #6d28d9',
              }}
            >
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {camp.locationLabel}
                  {camp.isAI && ' · AI-Powered'}
                </p>
                <h3 className="font-semibold" style={{ fontSize: '15px', color: '#303030', lineHeight: 1.3 }}>
                  {camp.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#9ea1a3', marginTop: '4px' }}>
                  {camp.provider}{camp.poweredBy ? ' · Powered by Financial Edge' : ''}
                </p>
              </div>

              {/* Specs */}
              <div style={{ borderTop: '1px solid #ededed', borderBottom: '1px solid #ededed', padding: '10px 0' }}>
                {([
                  ['Duration', camp.duration],
                  ['Format', 'In-person classroom'],
                  ['Location', camp.locationLabel],
                  ['Approach', camp.isAI ? 'AI-assisted modeling' : 'Traditional modeling'],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2 py-1" style={{ fontSize: '13px' }}>
                    <span style={{ color: '#9ea1a3' }}>{label}</span>
                    <span className="font-medium text-right" style={{ color: '#303030' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1">
                {camp.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5"
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      background: camp.isAI && t === 'AI in Finance' ? '#f3f0ff' : '#f6f8f9',
                      color: camp.isAI && t === 'AI in Finance' ? '#6d28d9' : '#555',
                      borderRadius: '2px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Next date + CTA */}
              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #ededed' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Next session
                </p>
                <p className="font-semibold" style={{ fontSize: '14px', color: '#303030', marginTop: '2px' }}>
                  {camp.nextDate}, 2026
                </p>
                {camp.additionalDates.length > 0 && (
                  <p className="font-medium" style={{ fontSize: '12px', color: '#0b8ecc', marginTop: '2px' }}>
                    + {camp.additionalDates.length} more date{camp.additionalDates.length > 1 ? 's' : ''}
                  </p>
                )}
                <div className="flex items-center justify-between gap-2 mt-3">
                  <button
                    className="font-medium transition-colors"
                    style={{
                      fontSize: '13px',
                      background: i === 0 ? '#0b8ecc' : 'transparent',
                      color: i === 0 ? '#fff' : '#0b8ecc',
                      border: `1px solid #0b8ecc`,
                      padding: '6px 16px',
                      borderRadius: '2px',
                    }}
                  >
                    {camp.cta} →
                  </button>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#303030' }}>{camp.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All sessions */}
        <h2 className="font-semibold mb-4" style={{ fontSize: '17px', color: '#303030' }}>
          All Upcoming Sessions
        </h2>
        <RowList>
          <TableHeader cols={['Event', 'Duration', 'Date & Location', 'Price']} />
          {ALL_SESSIONS.map((session) => {
            const camp = CAMPS.find((c) => c.id === session.campId)!;
            return (
              <BootCampRow
                key={`${session.campId}-${session.sortKey}`}
                camp={camp}
                date={session.date}
              />
            );
          })}
        </RowList>

        <p className="mt-8 text-center" style={{ fontSize: '12px', color: '#9ea1a3' }}>
          London sessions are delivered by Financial Edge, a Wall Street Prep partner institution.{' '}
          <span className="cursor-pointer hover:underline" style={{ color: '#0b8ecc' }}>
            Learn about Financial Edge →
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── Prototype switcher ───────────────────────────────────────────────────────

const PROTO_OPTIONS: { id: OptionId; label: string; sub: string }[] = [
  { id: '1', label: 'Option 1', sub: 'Clean List' },
  { id: '2', label: 'Option 2', sub: 'Upcoming Dates' },
  { id: '3', label: 'Option 3', sub: 'Location-Led' },
  { id: '4', label: 'Option 4', sub: 'Guided Decision' },
];

export default function Page() {
  const [active, setActive] = useState<OptionId>('1');

  return (
    <div>
      {/* Prototype banner */}
      <div className="px-4 py-2" style={{ background: '#1a1d22', borderBottom: '2px solid #0b8ecc' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-3 flex-wrap">
          <span className="hidden sm:inline" style={{ fontSize: '11px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Prototype
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {PROTO_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActive(opt.id)}
                className="flex items-center gap-1 px-3 py-1 transition-all"
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  background: active === opt.id ? '#0b8ecc' : 'transparent',
                  color: active === opt.id ? '#fff' : '#9ea1a3',
                  border: active === opt.id ? '1px solid #0b8ecc' : '1px solid #36393c',
                  borderRadius: '2px',
                }}
              >
                <span className="font-semibold">{opt.label}:</span>
                <span>{opt.sub}</span>
              </button>
            ))}
          </div>
          <span className="hidden lg:inline ml-1" style={{ fontSize: '11px', color: '#555' }}>
            {active === '1' ? 'Location filter + row list' :
             active === '2' ? 'All sessions in date order' :
             active === '3' ? 'City-first sections' :
             'Compare then commit'}
          </span>
        </div>
      </div>

      <WSPHeader />

      {active === '1' && <Option1 />}
      {active === '2' && <Option2 />}
      {active === '3' && <Option3 />}
      {active === '4' && <Option4 />}
    </div>
  );
}
