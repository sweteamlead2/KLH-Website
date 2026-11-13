import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ExternalLink, MapPin } from 'lucide-react'
import { PROGRAMMES, ALL_PROGRAMMES, PROGRAMME_MORE } from '../site'
import { PAGES, SITE, SCHOOL_PHOTO } from '../data'
import { PageHeader, LinkCard } from '../components/sectionpage'
import { SmartLink } from '../components/ui'
import { CampusMap, CtaBand, Heading } from '../components/kit'
import { CourseEnquiryForm } from '../components/forms'
import { CampusPlaces, CampusAdmissions } from '../components/places'

const tel = (n) => `tel:${n.replace(/[^\d+]/g, '')}`

// Eligibility as published on klh.edu.in /entry-requirements (only programmes KLH lists there).
const ER = PAGES['entry-requirements']?.blocks || []
const er = (start) => ER.find(b => b.type === 'p' && b.text.startsWith(start))?.text
const ELIGIBILITY = {
  btech: er('Admissions will be made for B.Tech'),
  bba: er('Duration 3 Years'),
  mba: er('Eligibility Criteria for MBA'),
}
const eligibility = (p) => ELIGIBILITY[p.slug.startsWith('btech') ? 'btech' : p.slug]

const LEVEL = { UG: 'Undergraduate', PG: 'Postgraduate' }
const campusesOf = (p) => p.campuses.map(c => c.c).sort().join(', ')
// Programme, level, duration, campuses, arrow: the same columns in the list's header row and in every row.
const COLS = 'lg:grid-cols-[minmax(0,1fr)_140px_100px_190px_20px]'

/* Programmes as a plain list: one row each, hairlines between rows, the whole row links to the programme.
   Below 1024px the rows show the level, duration and campuses on one line under the name. */
function ProgrammeRows({ items }) {
  return (
    <ul className="border-t border-line">
      {items.map(p => (
        <li key={p.slug} className="border-b border-line">
          <Link to={`/programmes/${p.slug}`} className={`group -mx-3 grid items-center gap-x-6 gap-y-1 rounded-[8px] px-3 py-5 transition-colors hover:bg-surface ${COLS}`}>
            <span className="min-w-0">
              <span className="block font-display text-[17px] font-semibold text-ink transition-colors group-hover:text-navy">{p.short}</span>
              <span className="mt-0.5 block text-[14px] text-muted">{p.name}</span>
            </span>
            <span className="text-[14.5px] text-ink-2 max-lg:hidden">{LEVEL[p.level]}</span>
            <span className="text-[14.5px] text-ink-2 max-lg:hidden">{p.dur}</span>
            <span className="text-[14.5px] text-ink-2 max-lg:hidden">{campusesOf(p)}</span>
            <ArrowRight size={16} aria-hidden className="text-muted transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-brand max-lg:hidden" />
            <span className="text-[13.5px] text-ink-2 lg:hidden">{LEVEL[p.level]} · {p.dur} · {campusesOf(p)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

// A row of choices, one selected (the filters).
function Choice({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-line bg-white p-1">
      {options.map(([v, t]) => (
        <button key={v} type="button" aria-pressed={v === value} onClick={() => onChange(v)}
          className={`h-9 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-colors ${v === value ? 'bg-navy text-white' : 'text-ink-2 hover:text-navy'}`}>{t}</button>
      ))}
    </div>
  )
}

const schoolId = (s) => s.replace('School of ', '').toLowerCase().replace(/ /g, '-')
const CAMPUS_NAMES = [...new Set(ALL_PROGRAMMES.flatMap(p => p.campuses.map(c => c.c)))].sort()

/* /programmes: a clean catalogue. Filters for level and campus (kept in the address, so a filtered list can be
   shared), then each school as a labelled group of rows. Every school stays on the page, so the section bar's
   links always land; a school with nothing matching says so in one line. */
export function Programmes() {
  const [params, setParams] = useSearchParams()
  const level = LEVEL[params.get('level')] ? params.get('level') : 'all'
  const campus = CAMPUS_NAMES.includes(params.get('campus')) ? params.get('campus') : 'all'
  const set = (k, v) => setParams(p => { const n = new URLSearchParams(p); if (v === 'all') n.delete(k); else n.set(k, v); return n }, { replace: true, preventScrollReset: true })
  const fits = (p) => (level === 'all' || p.level === level) && (campus === 'all' || p.campuses.some(c => c.c === campus))
  const shown = ALL_PROGRAMMES.filter(fits).length

  return (<>
    <PageHeader title="Programmes" crumb="Programmes" lead="Undergraduate and postgraduate programmes in engineering, computer applications and management, on the Aziznagar and Bachupally campuses.">
      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
        {[[ALL_PROGRAMMES.length, 'Programmes'], [PROGRAMMES.length, 'Schools'], [CAMPUS_NAMES.length, 'Campuses']].map(([v, t]) => (
          <div key={t} className="flex items-baseline gap-2"><dt className="sr-only">{t}</dt><dd className="font-display text-[26px] font-semibold text-navy">{v}</dd><dd aria-hidden className="text-[14px] text-muted">{t}</dd></div>
        ))}
      </dl>
    </PageHeader>

    <section className="py-12 md:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-center gap-3">
          <Choice label="Level" value={level} onChange={v => set('level', v)} options={[['all', 'All levels'], ['UG', 'Undergraduate'], ['PG', 'Postgraduate']]} />
          <Choice label="Campus" value={campus} onChange={v => set('campus', v)} options={[['all', 'Both campuses'], ...CAMPUS_NAMES.map(c => [c, c])]} />
          <p aria-live="polite" className="meta text-muted sm:ml-auto">Showing {shown} of {ALL_PROGRAMMES.length}</p>
        </div>

        {/* column labels, lined up with the rows */}
        <div aria-hidden className="mt-12 hidden xl:grid xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-12">
          <span />
          <div className={`meta grid gap-x-6 pb-3 text-muted ${COLS}`}><span>Programme</span><span>Level</span><span>Duration</span><span>Campuses</span><span /></div>
        </div>

        <div className="mt-10 space-y-14 xl:mt-0 xl:space-y-16">
          {PROGRAMMES.map((s, k) => {
            const items = s.items.filter(fits)
            return (
              <div key={s.school} id={schoolId(s.school)} className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-12">
                <div className="xl:sticky xl:top-24 xl:self-start xl:pt-5">
                  <p className="meta text-blue">{String(k + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 font-display text-[20px] font-semibold leading-snug text-navy">{s.school}</h2>
                  <p className="mt-1 text-[14px] text-muted">{s.items.length} programmes</p>
                </div>
                {items.length ? <ProgrammeRows items={items} />
                  : <p className="border-y border-line py-5 text-[14.5px] text-muted">No {level === 'all' ? '' : `${LEVEL[level].toLowerCase()} `}programmes{campus === 'all' ? '' : ` at ${campus}`} in this school.</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>

    {/* both campuses, drawn alike, with the programmes each one teaches */}
    <section id="by-campus" className="border-t border-line bg-surface py-14 md:py-20">
      <div className="wrap">
        <Heading align="center" eyebrow="Campuses" title={<>One university, <span className="hl">two campuses</span></>}
          sub="Aziznagar and Bachupally side by side. Follow a programme to the campuses that teach it." />
        <CampusMap />
      </div>
    </section>
    <CtaBand />
  </>)
}

/* /programmes/:slug */
export function ProgrammeDetail() {
  const { slug } = useParams()
  const p = ALL_PROGRAMMES.find(x => x.slug === slug)
  if (!p) return <Navigate to="/programmes" replace />
  const elig = eligibility(p)
  const more = PROGRAMME_MORE[p.slug]
  const related = ALL_PROGRAMMES.filter(x => x.school === p.school && x.slug !== p.slug)
  const facts = [['Level', p.level === 'UG' ? 'Undergraduate' : 'Postgraduate'], ['Duration', p.dur], ['School', p.school], ['Campuses', p.campuses.map(c => c.c).join(', ')]]
  return (<>
    <PageHeader title={p.short} crumb="Programmes" lead={p.name} photo={SCHOOL_PHOTO[p.school]}>
      <dl className="hero-in mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4" style={{ animationDelay: '.24s' }}>
        {facts.map(([t, v]) => <div key={t} className="bg-[rgb(6_14_28/.35)] p-4"><dt className="meta text-white/60">{t}</dt><dd className="mt-1.5 text-[14.5px] font-semibold text-white">{v}</dd></div>)}
      </dl>
    </PageHeader>
    <section className="py-14 md:py-20">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div className="min-w-0 space-y-12">
          <div id="overview">
            <h2 className="display-3 text-navy md:text-[26px]">Overview</h2>
            {p.d && <p className="mt-4 text-[17px] leading-relaxed text-ink">{p.d}</p>}
            {more?.about && <p className="mt-4 text-[16px] leading-[1.75] text-ink-2">{more.about}</p>}
            {more?.specialisations && (<>
              <h3 className="mt-6 text-[15px] font-semibold text-ink">Specialisations</h3>
              <ul className="mt-3 flex flex-wrap gap-2">{more.specialisations.map(t => <li key={t} className="rounded-full bg-blue-soft px-3.5 py-1.5 text-[14px] text-navy">{t}</li>)}</ul>
            </>)}
            {more?.careers && (<>
              <h3 className="mt-6 text-[15px] font-semibold text-ink">Career roles</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{more.careers.map(t => <li key={t} className="flex items-center gap-2.5 text-[15px] text-ink-2"><span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t}</li>)}</ul>
            </>)}
            {more?.source && <SmartLink to={more.source} className="link-arrow mt-5">Department page{/^https?:/.test(more.source) && <ArrowUpRight size={14} />}</SmartLink>}
          </div>
          <div id="campuses">
            <h2 className="display-3 text-navy md:text-[26px]">Campuses &amp; duration</h2>
            <dl className="mt-5 divide-y divide-line border-y border-line text-[15px]">
              <div className="grid grid-cols-[140px_1fr] gap-4 py-3"><dt className="text-muted">Duration</dt><dd className="text-ink">{p.dur}</dd></div>
              {more?.lateral && <div className="grid grid-cols-[140px_1fr] gap-4 py-3"><dt className="text-muted">Lateral entry</dt><dd className="text-ink">{more.lateral}</dd></div>}
              <div className="grid grid-cols-[140px_1fr] gap-4 py-3"><dt className="text-muted">Level</dt><dd className="text-ink">{p.level === 'UG' ? 'Undergraduate' : 'Postgraduate'}</dd></div>
            </dl>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {p.campuses.map(c => <LinkCard key={c.c} to={c.href} title={`${c.c} campus`} text={c.href.startsWith('http') ? 'Department page on klh.edu.in' : 'Campus page'} icon={<MapPin size={18} className="mb-3 text-brand" />} />)}
            </div>
          </div>
          <div id="eligibility">
            <h2 className="display-3 text-navy md:text-[26px]">Eligibility</h2>
            {elig ? <p className="mt-4 text-[16px] leading-[1.75] text-ink-2">{elig}</p>
              : <p className="mt-4 text-[16px] leading-[1.75] text-ink-2">KLH has not published the eligibility criteria for {p.short} online. The admission help desk will confirm them: <a href={tel(SITE.phone)} className="font-semibold text-blue">{SITE.phone}</a>.</p>}
            <Link to="/admissions#eligibility" className="link-arrow mt-4">All entry requirements <ArrowRight size={14} /></Link>
          </div>
          <div id="fees">
            <h2 className="display-3 text-navy md:text-[26px]">Fees &amp; scholarships</h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-ink-2">KLH publishes its fee structure (engineering and non-engineering programmes, hostel and transport) and its scholarships for 2025–26.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <LinkCard to="/admissions#fees" title="Fee structure" text="Fee particulars and refund policy" />
              <LinkCard to="/scholarships-2025-26" title="Scholarships 2025–26" text="On klh.edu.in" />
            </div>
          </div>
          <div id="apply">
            <h2 className="display-3 text-navy md:text-[26px]">How to apply</h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-ink-2">Apply online on the KL admissions portal, then attend counselling and confirm your seat at your chosen campus.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary">Apply Now <ExternalLink size={15} /></a>
              <Link to="/admissions" className="btn-outline">Admissions</Link>
            </div>
          </div>
          {related.length > 0 && (
            <div id="related">
              <h2 className="display-3 text-navy md:text-[26px]">Related programmes</h2>
              <div className="mt-5"><ProgrammeRows items={related} /></div>
            </div>
          )}
        </div>
        <aside className="card self-start p-6 lg:sticky lg:top-24">
          <p className="font-display text-lg font-semibold">Enquire about {p.short}</p>
          <p className="mb-5 mt-1 text-sm text-muted">An admissions counsellor will contact you.</p>
          <CourseEnquiryForm key={p.slug} programme={p.form} compact />
        </aside>
      </div>
    </section>
  </>)
}

/* /campuses: what is on each campus (its places, side by side), the programmes map, then each campus's own admissions, side by side. */
export function Campuses() {
  return (<>
    <PageHeader title="Campuses" crumb="Campuses" lead="KL University Hyderabad teaches on two campuses in the city, Aziznagar and Bachupally. Look around each one: its buildings, library, labs, sport and more." />
    <section id="places" className="bg-surface py-14 md:py-20">
      <div className="wrap">
        <Heading align="center" eyebrow="On campus" title={<>Places on <span className="hl">each campus</span></>}
          sub="Each campus has its own spaces. Open a place to see its photographs." />
        <CampusPlaces />
        <div className="mt-8 text-center"><Link to="/maps-directions" className="btn-outline btn-sm">Maps &amp; directions<ArrowRight size={14} /></Link></div>
      </div>
    </section>
    <section id="by-campus" className="bg-white py-14 md:py-20">
      <div className="wrap">
        <Heading align="center" eyebrow="Programmes" title={<>Programmes on <span className="hl">each campus</span></>}
          sub="Follow a programme to the campuses that teach it." />
        <CampusMap />
      </div>
    </section>
    {/* each campus's own admissions, side by side */}
    <section id="admissions" className="bg-surface py-14 md:py-20">
      <div className="wrap">
        <Heading align="center" eyebrow="Admissions" title={<>Admissions at <span className="hl">each campus</span></>}
          sub="Each campus has its own programmes and its own admissions. Choose a campus, see what it teaches, apply or send an enquiry." />
        <CampusAdmissions />
      </div>
    </section>
    <CtaBand />
  </>)
}
