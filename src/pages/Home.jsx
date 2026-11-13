import { ArrowRight, Check } from 'lucide-react'
import { HomeSlider, AboutKlh, Gallery, CenterOfExcellence, AwardsRankings } from '../components/home'
import { Img, SmartLink } from '../components/ui'
import { Reveal } from '../components/motion'
import { Heading, MoreLink, CampusMap, Faq, CtaBand } from '../components/kit'
import { PlacementHighlights, SchoolCards, FitTable, PillarCarousel, StoryCarousel, JoinSteps } from '../components/landing'
import Hero from '../components/Hero'
import { NEWS, WHY_STUDY } from '../data'

/* Highlights: KLH's announcement banners at full width (uncropped, controls under them), then the latest news
   as a row of cards: photo, date, headline (three lines at most), so the section reads top to bottom with no gaps. */
function Highlights() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="wrap">
        <Heading align="center" eyebrow="Highlights" title={<>What’s new at <span className="hl">KLH</span></>} sub="Announcements, achievements and events from both campuses." />
        <Reveal className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_30px_60px_-44px_rgba(10,26,51,.6)]"><HomeSlider /></Reveal>

        <div className="mt-14 flex items-end justify-between gap-4 border-b border-line pb-3">
          <h3 className="font-display text-[22px] font-semibold text-ink md:text-[24px]">Latest news</h3>
          <p className="meta text-muted">{NEWS.length} stories</p>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-2 no-scrollbar">
          {NEWS.map((n, k) => (
            <Reveal as="li" key={n.href} delay={k * 70} className="max-sm:w-[82%] max-sm:shrink-0 max-sm:snap-start">
              <SmartLink to={n.href} className="group card flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-navy/30 hover:shadow-[0_20px_40px_-28px_rgba(10,26,51,.5)]">
                <span className="block aspect-[16/10] overflow-hidden bg-surface"><Img p={n.img} alt="" position="center 30%" zoom /></span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="meta flex items-center gap-2 text-blue">{n.date}<span className="h-px w-6 bg-brand" /></span>
                  <span title={n.t} className="mt-3 line-clamp-3 text-[15px] font-semibold leading-snug text-ink group-hover:text-navy">{n.t}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-brand">Read more<ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" /></span>
                </span>
              </SmartLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* Why KLH: the owners' eight pillars as tall photo cards in a carousel, then KLH's own "Why study at KL University" list. */
function WhyKlh() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="wrap">
        <Heading align="center" eyebrow="Why KLH" title={<>What makes <span className="hl">KLH</span> different</>} sub="Eight things KLH is built around, from AI-native learning to leadership." />
        <PillarCarousel />
        <Reveal className="mt-12 rounded-[22px] border border-line bg-white p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-[22px] font-semibold text-ink md:text-[26px]">Why study at KL University</h3>
            <MoreLink to="/why-klh">Why KLH</MoreLink>
          </div>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_STUDY.items.map(t => (
              <li key={t} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink-2">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Check size={12} strokeWidth={3} /></span>{t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

// Home, in the owners' order (each group is one tab of the section bar), laid out as an admissions landing page.
export default function Home() {
  return (<>
    <Hero />
    <div id="highlights"><Highlights /><AboutKlh /></div>

    <section id="campuses" className="bg-surface py-16 md:py-24">
      <div className="wrap">
        <Heading align="center" eyebrow="Campuses" title={<>Two campuses. <span className="hl">One KLH.</span></>}
          sub="KL University Hyderabad teaches on two campuses in the city, Aziznagar and Bachupally. Follow a programme to the campuses that teach it." />
        <CampusMap />
        <div className="mt-8 text-center"><MoreLink to="/campuses">Compare the campuses</MoreLink></div>
      </div>
    </section>

    <section id="programmes" className="bg-white py-16 md:py-24">
      <div className="wrap">
        <Heading align="center" eyebrow="Programmes" title={<>Explore <span className="hl">programmes</span></>}
          sub="Undergraduate and postgraduate programmes in engineering, computer applications and management. Choose your best fit." />
        <SchoolCards />
        <FitTable />
        <div className="mt-10 text-center"><MoreLink to="/programmes">All programmes</MoreLink></div>
      </div>
    </section>

    <div id="why-klh"><WhyKlh /></div>

    <div id="outcomes">
      <PlacementHighlights />
      <AwardsRankings />
    </div>

    <div id="learning"><CenterOfExcellence /></div>

    <div id="stories">
      <section className="bg-white py-16 md:py-24">
        <div className="wrap">
          <Heading align="center" eyebrow="Stories" title={<>Stories from <span className="hl">KLH students</span></>} sub="What KLH students say about placements, faculty and campus, in their own words." />
          <StoryCarousel />
        </div>
      </section>
      <Gallery />
    </div>

    <section id="admissions" className="bg-surface py-16 md:py-24">
      <div className="wrap"><JoinSteps /></div>
    </section>

    <section id="faqs" className="bg-white py-16 md:py-24">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Heading eyebrow="FAQs" title={<>Frequently asked <span className="hl">questions</span></>} sub="Admissions, programmes, campuses and fees." className="!mb-0" />
        <Faq />
      </div>
    </section>
    <CtaBand />
  </>)
}
