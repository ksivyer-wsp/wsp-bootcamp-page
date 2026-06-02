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
type OptionId = '1' | '2' | '3' | '4' | '5.1' | '5.2' | '5.3' | '5.3.2' | '5.4' | '5.4.2' | '5.4.3' | '5.4.4' | '5.4.5' | '5.5';

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
      'The #1 Financial Valuation Modeling Boot Camp. An intensive 3-day in-person program covering financial modeling, DCF, and M&A. The same training used on Wall Street.',
    thumbImg: '/iStock-1406960186.jpg',
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
      'A 5-day in-person classroom program covering the full spectrum of valuation: financial modeling, DCF, M&A, comps, and LBO. Delivered in London by Financial Edge.',
    thumbImg: '/iStock-2194509213.jpg',
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
      'Learn to use AI to accelerate financial modeling and analysis. A modern approach to valuation built for how finance is evolving: less manual Excel, more AI-assisted output.',
    thumbImg: '/iStock-1979289147.jpg',
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
  const href = camp.provider === 'Wall Street Prep'
    ? 'https://www.wallstreetprep.com/seminar/financial-and-valuation-modeling/'
    : camp.provider === 'Financial Edge' && !camp.isAI
    ? 'https://www.fe.training/product/public-courses/comprehensive-modeling-and-valuation-masterclasses-july-london-copy/'
    : '#';

  return (
    <a
      href={href}
      target={href !== '#' ? '_blank' : undefined}
      rel={href !== '#' ? 'noopener noreferrer' : undefined}
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

// ─── Choices data (3 boot camp options) ──────────────────────────────────────

type Choice = {
  id: string;
  location: string;
  locationColor: string;
  title: string;
  provider: string;
  poweredBy: boolean;
  differentiator: string;
  detailedDifferentiator: string;
  nextDate: string;
  duration: string;
  format: string;
  focus: string[];
  price: string;
  moreDates: number;
  thumbImg: string;
  href: string;
};

const CHOICES: Choice[] = [
  {
    id: 'ny',
    location: 'New York',
    locationColor: '#0b8ecc',
    title: '3-Day Financial Modeling Boot Camp',
    provider: 'Wall Street Prep',
    poweredBy: false,
    differentiator: 'Comps & LBO self-study included',
    detailedDifferentiator: 'Build financial models, run DCF and M&A analysis. Comps & LBO self-study.',
    nextDate: 'Jun 10–12',
    duration: '3 Days',
    format: 'In-Person',
    focus: ['Financial Modeling', 'Valuation', 'M&A'],
    price: 'From $3,500',
    moreDates: 5,
    thumbImg: '/iStock-1406960186.jpg',
    href: 'https://www.wallstreetprep.com/seminar/financial-and-valuation-modeling/',
  },
  {
    id: 'london',
    location: 'London',
    locationColor: '#ff5353',
    title: '5-Day Financial Modeling Boot Camp',
    provider: 'Financial Edge',
    poweredBy: true,
    differentiator: 'Comps & LBO on Days 4–5',
    detailedDifferentiator: 'Full valuation suite: modeling, DCF, M&A, Comps & LBO, with AI integration.',
    nextDate: 'Sep 8–12',
    duration: '5 Days',
    format: 'In-Person',
    focus: ['Financial Modeling', 'Valuation', 'M&A', 'LBO'],
    price: 'From £3,200',
    moreDates: 4,
    thumbImg: '/iStock-2194509213.jpg',
    href: 'https://www.fe.training/product/public-courses/comprehensive-modeling-and-valuation-masterclasses-july-london-copy/',
  },
  {
    id: 'virtual',
    location: 'Virtual',
    locationColor: '#6d28d9',
    title: '2-Day AI-Intensive Financial Modeling Boot Camp',
    provider: 'Financial Edge',
    poweredBy: true,
    differentiator: 'AI-first modeling. No manual Excel.',
    detailedDifferentiator: 'AI-first modeling, no manual Excel. A fully AI-driven approach to valuation.',
    nextDate: 'Jul 20–21',
    duration: '2 Days',
    format: 'Virtual',
    focus: ['AI Modeling', 'Valuation'],
    price: 'From £1,500',
    moreDates: 2,
    thumbImg: '/iStock-1979289147.jpg',
    href: '#',
  },
];

// ─── Shared hero for 5.x options ─────────────────────────────────────────────

function NewHero() {
  return (
    <div className="px-6 py-14 relative" style={{ backgroundImage: 'url(https://media.wallstreetprep.com/uploads/2022/07/14174731/banner-instructor3.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
      <div className="absolute inset-0" style={{ background: 'rgba(20,24,30,0.78)' }} />
      <div className="max-w-[1140px] mx-auto relative">
        <h1 className="font-bold text-white leading-tight mb-4" style={{ fontSize: '52px', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
          Choose Your Financial Modeling Boot Camp
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6, maxWidth: '560px' }}>
          Build practical financial modeling, valuation, and M&A skills through live training in New York, London, or an AI-powered virtual session.
        </p>
      </div>
    </div>
  );
}

// ─── 5.0.1 / Option4: Detailed comparison (CAMPS data) ───────────────────────
// (Option4 component already defined above)

// ─── 5.0.2: Cards + Compare (CHOICES data) ───────────────────────────────────

function Option55() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block bg-white overflow-hidden hover:shadow-md transition-shadow"
              style={{ border: '1px solid #ededed', borderRadius: '3px', color: '#303030' }}>
              <div style={{ height: '180px', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: `4px solid ${choice.locationColor}` }} />
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: choice.locationColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{choice.location}</p>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#303030', lineHeight: 1.3 }}>{choice.title}</h3>
                  <p style={{ fontSize: '12px', color: '#9ea1a3', marginTop: '2px' }}>{choice.provider}{choice.poweredBy ? ' · Powered by Financial Edge' : ''}</p>
                </div>
                <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '8px 0' }}>
                  {([['Duration', choice.duration], ['Format', choice.format], ['Approach', choice.differentiator]] as [string,string][]).map(([l, v]) => (
                    <div key={l} className="flex justify-between gap-2 py-1" style={{ fontSize: '13px' }}>
                      <span style={{ color: '#9ea1a3', flexShrink: 0 }}>{l}</span>
                      <span style={{ fontWeight: 500, color: '#303030', textAlign: 'right' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">{choice.focus.map(t => <span key={t} style={{ fontSize: '11px', color: '#555', background: '#f6f8f9', border: '1px solid #ededed', padding: '2px 7px', borderRadius: '2px' }}>{t}</span>)}</div>
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next session</p>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#303030', marginTop: '2px' }}>{choice.nextDate}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#303030' }}>{choice.price}</span>
                  <button style={{ padding: '8px 16px', background: '#0b8ecc', color: '#fff', border: '1px solid #0b8ecc', fontSize: '13px', fontWeight: 600, borderRadius: '2px', cursor: 'pointer' }}>View Details</button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5.1.1: Minimal visual cards ─────────────────────────────────────────────

function Option51() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block bg-white overflow-hidden hover:shadow-md transition-shadow"
              style={{ border: '1px solid #ededed', borderRadius: '3px', color: '#303030' }}>
              <div style={{ height: '220px', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="p-6 flex flex-col gap-3">
                <p style={{ fontSize: '11px', fontWeight: 700, color: choice.locationColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{choice.location}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#303030', lineHeight: 1.25 }}>{choice.title}</h3>
                <p style={{ fontSize: '14px', color: '#9ea1a3', lineHeight: 1.5 }}>{choice.differentiator}</p>
                <p style={{ fontSize: '13px', color: '#9ea1a3' }}><span style={{ fontWeight: 600, color: '#303030' }}>Next:</span> {choice.nextDate}</p>
                <button style={{ marginTop: '4px', width: '100%', padding: '10px', background: '#0b8ecc', color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '2px', border: 'none', cursor: 'pointer' }}>View Details</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5.3.1: Comparison cards with image badge ────────────────────────────────

function Option53() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block bg-white overflow-hidden hover:shadow-md transition-shadow"
              style={{ border: '1px solid #ededed', borderRadius: '3px', color: '#303030' }}>
              <div style={{ position: 'relative', height: '160px', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
                <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', background: choice.locationColor, opacity: 0.9, padding: '6px 14px', borderRadius: '2px', display: 'inline-block' }}>{choice.location}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#303030', lineHeight: 1.3 }}>{choice.title}</h3>
                <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '10px 0' }}>
                  {([['Duration', choice.duration], ['Format', choice.format], ['Provider', choice.provider]] as [string,string][]).map(([l, v]) => (
                    <div key={l} className="flex justify-between" style={{ fontSize: '13px', padding: '3px 0' }}>
                      <span style={{ color: '#9ea1a3' }}>{l}</span><span style={{ fontWeight: 500, color: '#303030' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '13px', color: '#9ea1a3', lineHeight: 1.5 }}>{choice.differentiator}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next session</p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#303030' }}>{choice.nextDate}</p>
                  </div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#303030' }}>{choice.price}</p>
                </div>
                <button style={{ width: '100%', padding: '9px', background: '#0b8ecc', color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '2px', border: 'none', cursor: 'pointer' }}>View Details</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5.3.2: Compact tags + swapped order ─────────────────────────────────────

function Option532() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block bg-white overflow-hidden hover:shadow-md transition-shadow"
              style={{ border: '1px solid #ededed', borderRadius: '3px', color: '#303030' }}>
              <div style={{ position: 'relative', height: '160px', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
                <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', background: choice.locationColor, opacity: 0.9, padding: '6px 14px', borderRadius: '2px', display: 'inline-block' }}>{choice.location}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#303030', lineHeight: 1.3 }}>{choice.title}</h3>
                <p style={{ fontSize: '13px', color: '#9ea1a3', lineHeight: 1.5 }}>{choice.differentiator}</p>
                <div className="flex flex-wrap gap-1.5">
                  {[choice.duration, choice.format].map(tag => <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: '#555', background: '#f6f8f9', border: '1px solid #ededed', padding: '3px 9px', borderRadius: '2px' }}>{tag}</span>)}
                </div>
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginTop: '4px' }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next session</p>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#303030', marginTop: '2px' }}>{choice.nextDate}</p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price from</p>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#303030', marginTop: '2px' }}>{choice.price.replace('From ', '')}</p>
                    </div>
                  </div>
                </div>
                <button style={{ padding: '8px 16px', background: '#0b8ecc', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, borderRadius: '2px', cursor: 'pointer', alignSelf: 'flex-start' }}>View Details</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5.3.3 (was 5.2.1): Cards with detail chips ──────────────────────────────

function Option52() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block bg-white overflow-hidden hover:shadow-md transition-shadow"
              style={{ border: '1px solid #ededed', borderRadius: '3px', color: '#303030' }}>
              <div style={{ height: '220px', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="p-6 flex flex-col gap-3">
                <p style={{ fontSize: '11px', fontWeight: 700, color: choice.locationColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{choice.location}</p>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#303030', lineHeight: 1.25 }}>{choice.title}</h3>
                <p style={{ fontSize: '14px', color: '#9ea1a3', lineHeight: 1.5 }}>{choice.differentiator}</p>
                <div className="flex flex-wrap gap-1.5">
                  {[choice.duration, choice.format, ...choice.focus].map(chip => <span key={chip} style={{ fontSize: '11px', color: '#555', background: '#f6f8f9', border: '1px solid #ededed', padding: '3px 8px', borderRadius: '2px' }}>{chip}</span>)}
                </div>
                <p style={{ fontSize: '13px', color: '#9ea1a3' }}><span style={{ fontWeight: 600, color: '#303030' }}>Next:</span> {choice.nextDate}</p>
                <button style={{ marginTop: '4px', width: '100%', padding: '10px', background: '#0b8ecc', color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '2px', border: 'none', cursor: 'pointer' }}>View Details</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Editorial helpers ────────────────────────────────────────────────────────

function EditorialCard({ choice, bottomBorder, gradientRgb = '0,0,0', greenTag, longDiff }: { choice: Choice; bottomBorder?: boolean; gradientRgb?: string; greenTag?: boolean; longDiff?: boolean }) {
  const gradient = `linear-gradient(to top, rgba(${gradientRgb},1) 0%, rgba(${gradientRgb},1) 32%, rgba(${gradientRgb},0.6) 50%, rgba(${gradientRgb},0) 68%)`;
  return (
    <a href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
      className="block relative overflow-hidden group"
      style={{ height: '560px', borderRadius: '3px', ...(bottomBorder ? { borderBottom: `4px solid ${choice.locationColor}` } : {}) }}>
      <div className="absolute transition-transform duration-500 group-hover:scale-105"
        style={{ top: 0, left: 0, right: 0, height: '70%', backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} />
      <div style={{ position: 'absolute', inset: 0, background: gradient }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }} className="flex flex-col gap-2.5">
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: (bottomBorder || greenTag) ? '#1a1d22' : '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', background: (bottomBorder || greenTag) ? '#72ffab' : choice.locationColor, opacity: 0.9, padding: '5px 12px', borderRadius: '2px', display: 'inline-block' }}>
            {choice.location}
          </span>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{choice.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {[choice.duration, choice.format].map(tag => <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 9px', borderRadius: '2px' }}>{tag}</span>)}
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{longDiff ? choice.detailedDifferentiator : choice.differentiator}</p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', marginTop: '2px' }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next session</p>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginTop: '2px' }}>{choice.nextDate}</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>+{choice.moreDates} more dates</p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price from</p>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginTop: '2px' }}>{choice.price.replace('From ', '')}</p>
            </div>
          </div>
        </div>
        <button style={{ marginTop: '4px', padding: '9px 18px', background: '#0b8ecc', color: '#fff', fontSize: '13px', fontWeight: 700, borderRadius: '2px', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>View Details</button>
      </div>
    </a>
  );
}

// ─── 5.4.1: Editorial — full image, minimal text ─────────────────────────────

function Option54() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {CHOICES.map(choice => (
            <a key={choice.id} href={choice.href} target={choice.href !== '#' ? '_blank' : undefined} rel={choice.href !== '#' ? 'noopener noreferrer' : undefined}
              className="block relative overflow-hidden group" style={{ height: '460px', borderRadius: '3px' }}>
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${choice.thumbImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#72ffab', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>{choice.location}</p>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '10px' }}>{choice.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '20px' }}>{choice.differentiator}</p>
                <div className="flex items-center justify-between gap-3">
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Next: <span style={{ color: '#fff', fontWeight: 600 }}>{choice.nextDate}</span></p>
                  <button style={{ padding: '8px 18px', background: '#fff', color: '#1a1d22', fontSize: '13px', fontWeight: 700, borderRadius: '2px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>View Details</button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5.4.2: Editorial + detail overlay ───────────────────────────────────────

function Option542() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {CHOICES.map(choice => <EditorialCard key={choice.id} choice={choice} />)}
        </div>
      </div>
    </div>
  );
}

// ─── 5.4.3: Editorial + WSP green tags + colored bottom border ───────────────

function Option543() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {CHOICES.map(choice => <EditorialCard key={choice.id} choice={choice} bottomBorder />)}
        </div>
      </div>
    </div>
  );
}

// ─── 5.4.4: Editorial + WSP blue gradient ────────────────────────────────────

function Option544() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {CHOICES.map(choice => <EditorialCard key={choice.id} choice={choice} gradientRgb="10,45,74" greenTag />)}
        </div>
      </div>
    </div>
  );
}

// ─── IF-V5: Editorial + blue gradient + green tags + expanded description ─────

function Option545() {
  return (
    <div style={{ background: '#f6f8f9', minHeight: '100vh' }}>
      <NewHero />
      <div className="max-w-[1140px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {CHOICES.map(choice => <EditorialCard key={choice.id} choice={choice} gradientRgb="10,45,74" greenTag longDiff />)}
        </div>
      </div>
    </div>
  );
}

// ─── Prototype switcher ───────────────────────────────────────────────────────

type CategoryGroup = { categoryId: string; categoryLabel: string; versions: { id: OptionId; label: string }[] };

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    categoryId: 'detailed',
    categoryLabel: 'Detailed',
    versions: [
      { id: '4',     label: 'D-V1' },
      { id: '5.5',   label: 'D-V2' },
      { id: '5.3',   label: 'D-V3' },
      { id: '5.3.2', label: 'D-V4' },
    ],
  },
  {
    categoryId: 'simple',
    categoryLabel: 'Simple',
    versions: [
      { id: '5.1', label: 'S-V1' },
      { id: '5.2', label: 'S-V2' },
    ],
  },
  {
    categoryId: 'image-first',
    categoryLabel: 'Image First',
    versions: [
      { id: '5.4',   label: 'IF-V1' },
      { id: '5.4.2', label: 'IF-V2' },
      { id: '5.4.3', label: 'IF-V3' },
      { id: '5.4.4', label: 'IF-V4' },
      { id: '5.4.5', label: 'IF-V5' },
    ],
  },
];

const ARCHIVED_OPTIONS: { id: OptionId; label: string }[] = [
  { id: '1', label: 'Option 1: Clean List' },
  { id: '2', label: 'Option 2: Upcoming Dates' },
  { id: '3', label: 'Option 3: Location-Led' },
];

export default function Page() {
  const [active, setActive]       = useState<OptionId>('5.4.4');
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(id: string) { setOpenGroup(g => g === id ? null : id); }
  function selectVersion(id: OptionId) { setActive(id); setOpenGroup(null); }

  return (
    <div onClick={() => setOpenGroup(null)}>
      {/* Sticky prototype banner */}
      <div className="sticky top-0 z-50 px-4 py-2" style={{ background: '#1a1d22', borderBottom: '2px solid #0b8ecc' }}>
        <div className="max-w-[1140px] mx-auto flex items-center gap-1.5 flex-wrap" onClick={e => e.stopPropagation()}>
          <span className="hidden sm:inline shrink-0 mr-1" style={{ fontSize: '11px', fontWeight: 700, color: '#9ea1a3', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Prototype
          </span>

          {/* Category dropdowns */}
          {CATEGORY_GROUPS.map(group => {
            const groupActive = group.versions.some(v => v.id === active);
            const isOpen = openGroup === group.categoryId;
            const activeVer = group.versions.find(v => v.id === active);
            return (
              <div key={group.categoryId} className="relative">
                <button onClick={() => toggleGroup(group.categoryId)}
                  className="flex items-center gap-1 px-3 py-1 transition-all"
                  style={{ fontSize: '12px', fontWeight: groupActive ? 600 : 500, background: groupActive ? '#0b8ecc' : 'transparent', color: groupActive ? '#fff' : '#9ea1a3', border: groupActive ? '1px solid #0b8ecc' : '1px solid #36393c', borderRadius: '2px', cursor: 'pointer' }}>
                  <span>{group.categoryLabel}</span>
                  {groupActive && activeVer && <span style={{ opacity: 0.8 }}>· {activeVer.label}</span>}
                  <span style={{ fontSize: '9px', marginLeft: '2px' }}>{isOpen ? '▲' : '▾'}</span>
                </button>
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 py-1 z-50"
                    style={{ background: '#1a1d22', border: '1px solid #36393c', borderRadius: '2px', minWidth: '130px' }}>
                    {group.versions.map(v => (
                      <button key={v.id} onClick={() => selectVersion(v.id)}
                        className="block w-full text-left px-4 py-1.5 transition-colors"
                        style={{ fontSize: '12px', color: active === v.id ? '#fff' : '#9ea1a3', background: active === v.id ? '#0b8ecc' : 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: '#36393c', margin: '0 2px' }} />

          {/* Archived */}
          <div className="relative">
            <button onClick={() => toggleGroup('archived')}
              className="px-3 py-1 transition-all"
              style={{ fontSize: '12px', fontWeight: 500, background: ['1','2','3'].includes(active) ? '#36393c' : 'transparent', color: ['1','2','3'].includes(active) ? '#fff' : '#9ea1a3', border: '1px solid #36393c', borderRadius: '2px', cursor: 'pointer' }}>
              Archived {openGroup === 'archived' ? '▲' : '▾'}
            </button>
            {openGroup === 'archived' && (
              <div className="absolute top-full left-0 mt-1 py-1 z-50"
                style={{ background: '#1a1d22', border: '1px solid #36393c', borderRadius: '2px', minWidth: '180px' }}>
                {ARCHIVED_OPTIONS.map(opt => (
                  <button key={opt.id} onClick={() => selectVersion(opt.id)}
                    className="block w-full text-left px-4 py-1.5 transition-colors"
                    style={{ fontSize: '12px', color: active === opt.id ? '#fff' : '#9ea1a3', background: active === opt.id ? '#0b8ecc' : 'transparent', cursor: 'pointer' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <WSPHeader />

      {active === '4'     && <Option4 />}
      {active === '5.5'   && <Option55 />}
      {active === '5.1'   && <Option51 />}
      {active === '5.3'   && <Option53 />}
      {active === '5.3.2' && <Option532 />}
      {active === '5.2'   && <Option52 />}
      {active === '5.4'   && <Option54 />}
      {active === '5.4.2' && <Option542 />}
      {active === '5.4.3' && <Option543 />}
      {active === '5.4.4' && <Option544 />}
      {active === '5.4.5' && <Option545 />}
      {active === '1'     && <Option1 />}
      {active === '2'     && <Option2 />}
      {active === '3'     && <Option3 />}
    </div>
  );
}
