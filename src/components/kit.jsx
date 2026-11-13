import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Phone, ChevronDown } from 'lucide-react'
import { PROGRAMMES } from '../site'
import { CAMPUS_INFO, SITE, SCHOOL_PHOTO } from '../data'
import { Img, SmartLink, isExternal } from './ui'
import { Reveal, CountUp } from './motion'
import { useCallbackDialog } from './Callback'

// Page-building blocks in the site's own visual language (mono eyebrows, display headings with the yellow
// highlighter, thin-bordered cards, KLH photographs, navy bands): stat band, photo cards, campus split,
// school columns, steps, FAQs and the call-to-action band.
// Used by the home page first, then the inner pages.

const tel = (p) => `tel:${p.replace(/[^\d+]/g, '')}`

/* Section heading in the site's own style (as SectionHead): mono eyebrow with a drawing rule, display title
   (wrap a word in <span className="hl"> for the yellow highlighter), optional lead and actions. Left or centred. */
export function Heading({ eyebrow, title, sub, action, align = 'left', dark, className = '' }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-10 md:mb-12 ${center ? 'mx-auto max-w-3xl text-center' : 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'} ${className}`}>
      <div className={center ? '' : 'max-w-3xl'}>
        {eyebrow && <p className={`meta flex items-center gap-3 ${center ? 'justify-center' : ''} ${dark ? 'text-white/60' : 'text-muted'}`}><span className="rule h-px bg-brand" />{eyebrow}</p>}
        <h2 className={`display-2 mt-4 text-balance ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {sub && <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${center ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-ink-2'}`}>{sub}</p>}
      </div>
      {action && <div className={`flex flex-wrap gap-3 ${center ? 'mt-6 justify-center' : ''}`}>{action}</div>}
    </Reveal>
  )
}

/* "See more" button for a heading's action slot, as elsewhere on the site. */
export const MoreLink = ({ to, children, dark }) => (
  <Link to={to} className={dark ? 'btn-ghost btn-sm' : 'btn-outline btn-sm'}>{children}<ArrowRight size={14} /></Link>
)

/* Dark band of large figures. items: [{ v, prefix, suffix, l, d }] */
export function StatBand({ eyebrow, title, sub, items, action, id }) {
  return (
    <section id={id} className="surface-navy relative overflow-hidden py-16 text-white md:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="wrap relative">
        <Heading dark eyebrow={eyebrow} title={title} sub={sub} action={action} />
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 md:grid-cols-3">
          {items.map((s, k) => (
            <Reveal key={s.l} delay={(k % 3) * 80} className="group bg-[rgb(10_26_51/.88)] p-5 transition-colors duration-500 hover:bg-[rgb(18_40_74/.95)] sm:p-7 lg:p-9">
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] sm:text-[46px] lg:text-[60px]">
                <span className="text-sun">{s.prefix}</span><CountUp v={s.v} /><span className="text-white/80">{s.suffix}</span>
              </dd>
              <dd aria-hidden className="mt-3 flex items-center gap-2 text-[14px] font-semibold text-white/90 sm:text-[15px]"><span className="h-0.5 w-5 rounded-full bg-brand transition-[width] duration-500 group-hover:w-9" />{s.l}</dd>
              {s.d && <dd className="mt-1.5 text-[12.5px] text-white/55 sm:text-[13px]">{s.d}</dd>}
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* Photo cards: a KLH photograph, a small numbered eyebrow, a title and a line of text; a swipeable row on phones.
   items: [{ t, d, to, img, alt }] */
export function PhotoCards({ items, cols = 'sm:grid-cols-2 lg:grid-cols-4' }) {
  return (
    <ul className={`grid gap-5 ${cols} max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-2 no-scrollbar`}>
      {items.map((it, k) => (
        <Reveal as="li" key={it.t} delay={(k % 4) * 70} className="max-sm:w-[82%] max-sm:shrink-0 max-sm:snap-start">
          <Link to={it.to} className="group card flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-navy/30 hover:shadow-[0_20px_40px_-28px_rgba(10,26,51,.5)]">
            <span className="block aspect-[4/3] overflow-hidden bg-surface"><Img p={it.img} alt={it.alt || ''} zoom /></span>
            <span className="flex flex-1 flex-col p-5">
              <span className="meta flex items-center gap-2 text-blue">{String(k + 1).padStart(2, '0')}<span className="h-px w-6 bg-brand" /></span>
              <span className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink group-hover:text-navy">{it.t}</span>
              <span className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{it.d}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}

/* The two campuses as a pair, drawn exactly alike so neither reads as the main one (alphabetical order).
   - Top: two photo panels of the same size and the same treatment (toned navy, full colour on hover) either side
     of a navy centre spine, KL University Hyderabad, which both belong to.
   - Below: a route map. Each campus is a rail running down from its photo; each programme is a name plate in the
     centre, joined to a stop on the rail of every campus that teaches it. A stop links that campus's department
     page; a plate links the programme. Same colours, sizes and links on both sides.
   - Phones keep the same three columns, narrower (short programme names fit). */
const MAP_COLS = 'grid grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)]'
const Rail = () => <span aria-hidden className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-navy/15" />

function CampusPanel({ c }) {
  return (
    <Link to={c.to} className="group relative isolate block w-full min-h-[190px] overflow-hidden bg-navy max-sm:h-full sm:aspect-[4/3]">
      <Img p={c.img} alt={c.alt} className="grayscale transition-[filter,transform] duration-700 ease-out-soft group-hover:scale-[1.04] group-hover:grayscale-0" />
      <span aria-hidden className="absolute inset-0 bg-navy mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_14_28/.85)_0%,rgb(6_14_28/.25)_45%,transparent_70%)]" />
      <span className="absolute inset-x-0 bottom-0 p-2.5 text-white sm:p-6 lg:p-8">
        <span className="meta block text-white/60 max-sm:text-[9px]">Campus</span>
        <span className="mt-1 block font-display text-[15px] font-semibold leading-tight sm:mt-2 sm:text-[30px] lg:text-[36px]">{c.name}</span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-sun sm:mt-3 sm:text-[14px]">Explore<ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></span>
      </span>
    </Link>
  )
}

function Stop({ p, c, side }) {
  const at = p.campuses.find(x => x.c === c.name)
  return (
    <div className="relative">
      <Rail />
      {at && (<>
        <span aria-hidden className={`absolute top-1/2 h-px bg-navy/40 ${side === 'l' ? 'left-1/2 right-0' : 'left-0 right-1/2'}`} />
        <SmartLink to={at.href} aria-label={`${p.short} at the ${c.name} campus`} title={`${p.short} · ${c.name}`}
          className="absolute left-1/2 top-1/2 z-10 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
          <span className="block h-3.5 w-3.5 rounded-full border-[2.5px] border-navy bg-white transition-[background-color,transform] duration-300 hover:scale-125 hover:bg-brand hover:border-brand" />
        </SmartLink>
      </>)}
    </div>
  )
}

export function CampusMap() {
  const [a, b] = CAMPUS_INFO
  return (
    <Reveal className="overflow-hidden rounded-[22px] border border-line bg-white">
      <div className={MAP_COLS}>
        <CampusPanel c={a} />
        <div className="flex flex-col items-center justify-center bg-navy px-2 py-6 text-center text-white">
          <p className="meta text-white/55 max-sm:text-[9px]">KL University</p>
          <p className="mt-2 font-display text-[17px] font-semibold leading-tight sm:text-[24px]">Hyderabad</p>
          <span aria-hidden className="my-4 h-10 w-px bg-sun/70 sm:my-5 sm:h-14" />
          <p className="max-w-[170px] text-[11.5px] leading-snug text-white/65 sm:text-[13px]">Two campuses in the city, one university</p>
        </div>
        <CampusPanel c={b} />
      </div>

      <div className="pb-2">
        <div className={MAP_COLS}><div className="relative"><Rail /></div><p className="meta py-5 text-center text-muted max-sm:text-[9.5px]">Where each programme is taught</p><div className="relative"><Rail /></div></div>
        {PROGRAMMES.map(s => (
          <div key={s.school}>
            <div className={MAP_COLS}><div className="relative"><Rail /></div><p className="meta pb-2 pt-4 text-center text-blue max-sm:text-[9.5px]">{s.school.replace('School of ', '')}</p><div className="relative"><Rail /></div></div>
            {s.items.map(p => (
              <div key={p.slug} className={MAP_COLS}>
                <Stop p={p} c={a} side="l" />
                <div className="py-1.5">
                  <Link to={`/programmes/${p.slug}`} title={p.name}
                    className="flex h-11 items-center justify-center rounded-full border border-line bg-white px-1.5 text-center text-[12.5px] font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white sm:text-[14.5px]">{p.short}</Link>
                </div>
                <Stop p={p} c={b} side="r" />
              </div>
            ))}
          </div>
        ))}
        {/* the rails end in each campus's links */}
        <div className={MAP_COLS}>
          {[a, b].map((c, k) => (
            <div key={c.key} className={`flex flex-col items-center gap-2 pt-6 pb-6 ${k ? 'order-3' : 'order-1'}`}>
              <span aria-hidden className="h-3 w-3 rounded-full bg-navy" />
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Link to={c.to} className="btn-navy btn-sm max-sm:px-3 max-sm:text-[12px]">{c.name}<ArrowRight size={14} className="max-sm:hidden" /></Link>
                <Link to="/maps-directions" className="btn-outline btn-sm max-sm:hidden">Directions</Link>
              </div>
            </div>
          ))}
          <p className="order-2 flex items-start justify-center gap-2 pt-6 text-center text-[12px] leading-snug text-muted sm:text-[13px]">
            <span aria-hidden className="mt-0.5 h-3 w-3 shrink-0 rounded-full border-[2.5px] border-navy bg-white" />Taught on this campus
          </p>
        </div>
      </div>
    </Reveal>
  )
}

/* The three schools side by side (the owners' layout), each under a KLH photograph; every programme links its page
   and the department on each campus that offers it. */
export function SchoolColumns() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {PROGRAMMES.map((s, k) => (
        <Reveal key={s.school} delay={k * 90}>
          <div className="aspect-[16/10] overflow-hidden rounded-[12px] bg-surface"><Img p={SCHOOL_PHOTO[s.school][0]} alt={SCHOOL_PHOTO[s.school][1]} /></div>
          <p className="meta mt-5 border-b-2 border-navy pb-3 text-navy">{s.school}</p>
          <ul>
            {s.items.map(p => (
              <li key={p.slug} className="border-b border-line py-4">
                <Link to={`/programmes/${p.slug}`} className="group inline-flex items-center gap-1 font-display text-[17px] font-semibold text-ink hover:text-blue">{p.short}<ArrowRight size={15} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-blue" /></Link>
                <p className="text-[13.5px] text-ink-2">{p.name}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 text-[13px]">
                  {p.campuses.map(c => <SmartLink key={c.c} to={c.href} className="inline-flex items-center gap-0.5 font-medium text-blue hover:underline">{c.c}<ArrowUpRight size={12} /></SmartLink>)}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}

/* Numbered steps in a bordered grid (as on the Admissions page). steps: [{ t, d, to }] */
export function Steps({ steps }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, k) => (
        <li key={s.t} className="flex flex-col bg-white p-6">
          <span className="meta flex items-center gap-2 text-blue">{String(k + 1).padStart(2, '0')}<span className="h-px w-6 bg-brand" /></span>
          <h3 className="mt-3 font-display text-[17px] font-semibold text-ink">{s.t}</h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
          {s.to && <SmartLink to={s.to} className="link-arrow mt-auto pt-4 text-[13.5px]">{isExternal(s.to) ? 'Open portal' : 'Details'}{isExternal(s.to) ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}</SmartLink>}
        </li>
      ))}
    </ol>
  )
}

/* Questions and answers. With none published yet it says so, and points to the help desk. */
export function Faq({ items = [], what = 'Answers to common questions' }) {
  if (!items.length) return (
    <div className="card flex flex-col gap-4 border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15.5px] text-ink-2"><span className="font-semibold text-ink">{what}</span> will be published here soon. Until then, the admission help desk can help.</p>
      <a href={tel(SITE.phone)} className="btn-outline btn-sm shrink-0"><Phone size={14} />{SITE.phone}</a>
    </div>
  )
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-white">
      {items.map(([q, a]) => (
        <li key={q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-[16.5px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {q}<ChevronDown size={18} className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-2">{a}</p>
          </details>
        </li>
      ))}
    </ul>
  )
}

/* Call-to-action band: talk to an admissions counsellor. */
export function CtaBand() {
  const callback = useCallbackDialog()
  const points = ['Understand the admission process', 'Compare programmes at Aziznagar and Bachupally', 'Ask about fees and scholarships']
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="wrap">
        <Reveal className="surface-navy relative grid items-center gap-10 overflow-hidden rounded-[28px] p-7 text-white sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:p-14">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative">
            <p className="meta text-sun">Admissions 2026–27</p>
            <h2 className="mt-4 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[40px]">Talk to an admissions counsellor</h2>
            <ul className="mt-6 space-y-3">
              {points.map(t => <li key={t} className="flex items-center gap-3 text-[15.5px] text-white/85"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-sun"><Check size={14} /></span>{t}</li>)}
            </ul>
          </div>
          <div className="relative grid gap-3">
            <button type="button" onClick={() => callback()} className="btn h-[52px] bg-white text-[15px] text-navy hover:bg-sun">Request a call back</button>
            <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary h-[52px] text-[15px]">Apply Now<ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href={tel(SITE.phone)} className="mt-1 inline-flex items-center justify-center gap-2 text-[15px] font-medium text-white/80 hover:text-white"><Phone size={15} />{SITE.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
