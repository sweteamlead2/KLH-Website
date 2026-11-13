import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PROGRAMMES, PILLARS } from '../site'
import { SITE, OUTCOME_STATS, RECRUITERS, SCHOOL_PHOTO, PILLAR_PHOTO, TESTIMONIALS, ADMISSION_STEPS } from '../data'
import { Img, Slider, SmartLink, isExternal } from './ui'
import { Reveal, CountUp } from './motion'
import { LogoRow, MotionToggle } from './home'
import { Heading } from './kit'

/* Home-page sections laid out like a modern admissions landing page (one idea per band, centred headings,
   big figures, photo-led cards, horizontal carousels, numbered steps), filled only with KLH's own content. */

const schoolId = (s) => s.replace('School of ', '').toLowerCase().replace(/ /g, '-')
const schoolShort = (s) => s.replace('School of ', '')

/* Placements: one card with a KLH photo and the headline figure, the other figures beside it,
   then the recruiters as a gliding logo row. Figures from KLH's Admissions Open 2026 banner (OUTCOME_STATS). */
export function PlacementHighlights() {
  const [top, ...rest] = OUTCOME_STATS
  const [playing, setPlaying] = useState(true)
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="wrap">
        <Heading align="center" eyebrow="Placement highlights" title={<>Placements at <span className="hl">KLH</span></>}
          sub="Every eligible and registered student is provided placement support." />
        <Reveal className="grid overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_40px_80px_-60px_rgba(10,26,51,.55)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="relative min-h-[240px] bg-surface"><div className="absolute inset-0"><Img p="2020/05/i5.jpg" alt="KLH students in formal wear with faculty" /></div></div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="meta text-blue">{top.l} · {top.d}</p>
            <p className="mt-3 font-display text-[48px] font-semibold leading-none tracking-[-0.02em] text-navy sm:text-[60px]">{top.prefix}<CountUp v={top.v} /><span className="text-[0.55em]"> Lakhs</span></p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-3">
              {rest.map(s => (
                <div key={s.l} className="bg-white p-4">
                  <dd className="font-display text-[24px] font-semibold leading-none text-navy">{s.prefix}<CountUp v={s.v} />{s.suffix}</dd>
                  <dt className="mt-2 text-[13px] leading-snug text-muted">{s.l}{s.d ? <span className="block text-[12px]">{s.d}</span> : null}</dt>
                </div>
              ))}
              <Link to="/outcomes" className="group flex items-center justify-between gap-2 bg-navy p-4 text-[14px] font-semibold text-white transition-colors hover:bg-brand">All outcomes<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></Link>
            </dl>
          </div>
        </Reveal>
      </div>
      <p className="meta mb-6 mt-14 text-center text-muted">Recruiters at KLH</p>
      <LogoRow items={RECRUITERS} reps={2} playing={playing} tile="h-14 w-[140px] py-3" />
      <MotionToggle playing={playing} onToggle={() => setPlaying(v => !v)} label="recruiter logos" />
    </section>
  )
}

/* Explore programmes: one card per school (photo, programmes with their durations, a button to the school),
   then "Choose your best fit", the three schools compared on facts KLH publishes. */
export function SchoolCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PROGRAMMES.map((s, k) => {
        const levels = [...new Set(s.items.map(p => p.level))].join(' & ')
        return (
          <Reveal key={s.school} delay={k * 90} className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgba(10,26,51,.55)]">
            <div className="aspect-[16/10] overflow-hidden bg-surface"><Img p={SCHOOL_PHOTO[s.school][0]} alt={SCHOOL_PHOTO[s.school][1]} zoom /></div>
            <div className="flex flex-1 flex-col p-6">
              <p className="meta text-blue">{levels} · {s.items.length} programmes</p>
              <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-navy">{s.school}</h3>
              <ul className="mt-5 border-t border-line">
                {s.items.map(p => (
                  <li key={p.slug} className="border-b border-line">
                    <Link to={`/programmes/${p.slug}`} className="group/p flex items-center justify-between gap-3 py-3 text-[14.5px]">
                      <span className="min-w-0"><span className="font-semibold text-ink group-hover/p:text-navy">{p.short}</span><span className="text-muted"> · {p.dur}</span></span>
                      <ArrowRight size={15} className="shrink-0 text-muted transition-[transform,color] group-hover/p:translate-x-0.5 group-hover/p:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6"><Link to={`/programmes#${schoolId(s.school)}`} className="btn-navy btn-sm">Explore {schoolShort(s.school)}<ArrowRight size={14} /></Link></div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

// Entrance tests as KLH lists them (ADMISSION_STEPS / entry requirements); schools KLH has not published leave the cell to the link.
const ENTRANCE = {
  'School of Engineering': 'KLEEE, JEE or state entrance exams',
  'School of Management': 'KLBSAT, ICET, MAT, CAT or XAT for the MBA',
}
export function FitTable() {
  const rows = [
    ['Programmes', s => s.items.map(p => p.short).join(', ')],
    ['Levels', s => [...new Set(s.items.map(p => (p.level === 'UG' ? 'Undergraduate' : 'Postgraduate')))].join(' and ')],
    ['Duration', s => [...new Set(s.items.map(p => p.dur))].join(' or ')],
    ['Entrance tests', s => ENTRANCE[s.school] || <Link to="/admissions#eligibility" className="font-medium text-blue hover:underline">See entry requirements</Link>],
  ]
  return (
    <Reveal className="mt-16">
      <h3 className="text-center font-display text-[24px] font-semibold text-ink md:text-[28px]">Choose your best fit</h3>
      <div className="no-scrollbar mt-6 overflow-x-auto rounded-[18px] border border-line">
        <table className="w-full min-w-[720px] border-collapse text-left text-[14.5px]">
          <thead>
            <tr className="bg-navy text-white">
              <th scope="col" className="w-[180px] px-5 py-4 font-semibold">Compare</th>
              {PROGRAMMES.map(s => <th key={s.school} scope="col" className="px-5 py-4 font-semibold">{s.school}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, cell], k) => (
              <tr key={label} className={k % 2 ? 'bg-surface' : 'bg-white'}>
                <th scope="row" className="px-5 py-4 font-semibold text-ink">{label}</th>
                {PROGRAMMES.map(s => <td key={s.school} className="px-5 py-4 leading-relaxed text-ink-2">{cell(s)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

/* What makes KLH: the owners' eight pillars as tall photo cards in a carousel, number and words on the photo. */
export function PillarCarousel() {
  return (
    <Slider label="reason">
      {PILLARS.map((p, k) => (
        <Link key={p.id} to={`/why-klh#${p.id}`}
          className="group relative block aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[18px] bg-navy sm:w-[44%] lg:w-[calc((100%-60px)/4)]">
          <Img p={PILLAR_PHOTO[p.id][0]} alt="" zoom />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_14_28/.92)_0%,rgb(6_14_28/.5)_45%,rgb(6_14_28/.1)_75%)]" />
          <span className="meta absolute left-5 top-5 text-white/75">{String(k + 1).padStart(2, '0')}</span>
          <span className="absolute inset-x-5 bottom-5 text-white">
            <span className="block font-display text-[20px] font-semibold leading-snug">{p.t}</span>
            <span className="mt-2 block text-[14px] leading-relaxed text-white/75">{p.d}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-sun">Learn more<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
          </span>
        </Link>
      ))}
    </Slider>
  )
}

/* Student stories: KLH's testimonials as cards in a carousel, photo first, quote verbatim. */
export function StoryCarousel() {
  return (
    <Slider label="story">
      {TESTIMONIALS.map(([p, n, q]) => (
        <figure key={n} className="card flex w-[78%] shrink-0 snap-start flex-col overflow-hidden sm:w-[44%] lg:w-[calc((100%-60px)/4)]">
          <div className="aspect-[4/3] overflow-hidden bg-surface"><Img p={p} alt={n} position="center 22%" /></div>
          <figcaption className="flex flex-1 flex-col p-5">
            <span className="meta text-blue">KLH student</span>
            <span className="mt-1.5 font-display text-[17px] font-semibold text-ink">{n}</span>
            <blockquote className="mt-3 text-[14.5px] leading-relaxed text-ink-2">“{q}”</blockquote>
          </figcaption>
        </figure>
      ))}
    </Slider>
  )
}

/* How to join: the entrance tests and Apply on the left (they stay put while the steps scroll),
   the numbered steps on the right. */
export function JoinSteps() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Heading eyebrow="Admissions" title={<>How to join <span className="hl">KLH</span></>} sub="Four steps from choosing a programme to joining your campus." className="!mb-8" />
        <Reveal className="surface-navy rounded-[20px] p-6 text-white md:p-8">
          <p className="meta text-sun">Entrance tests</p>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/85">
            <li><span className="font-semibold text-white">B.Tech:</span> {ENTRANCE['School of Engineering']}</li>
            <li><span className="font-semibold text-white">MBA:</span> KLBSAT, ICET, MAT, CAT or XAT</li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary">Apply Now<ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
            <Link to="/admissions#eligibility" className="btn-ghost btn-sm self-center">Entry requirements</Link>
          </div>
        </Reveal>
      </div>
      <ol className="space-y-4">
        {ADMISSION_STEPS.map((s, k) => (
          <Reveal as="li" key={s.t} delay={k * 80} className="card flex flex-col gap-4 p-6 sm:flex-row sm:gap-6 md:p-7">
            <span className="inline-flex h-8 w-fit shrink-0 items-center rounded-full bg-brand/10 px-3.5 text-[12px] font-bold uppercase tracking-[.12em] text-brand">Step {k + 1}</span>
            <div className="min-w-0">
              <h3 className="font-display text-[19px] font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{s.d}</p>
              {s.to && <SmartLink to={s.to} className="link-arrow mt-3 text-[13.5px]">{isExternal(s.to) ? 'Open portal' : 'Details'}{isExternal(s.to) ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}</SmartLink>}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
