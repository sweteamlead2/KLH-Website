import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Pause, Play } from 'lucide-react'
import { HERO, SITE, PARTNERS } from '../data'
import { CAMPUS_VIDEO } from '../assets'
import { smoothScrollTo } from './scroll'
import { Img } from './ui'

/* Home landing hero: the campus film's aerial shots play full-bleed behind the headline, looping smoothly.
   - Only one stretch of the film plays (HERO.clip, the aerial campus views); at its end the picture dips to dark
     and starts again, so the loop never jumps.
   - The hero fills the screen below the header and grows if its words need more room (small phones).
   - The film fades in once it can play; until then (and if it can't) the navy background shows.
   - It pauses when scrolled out of view or when the tab is hidden, and has a pause button.
   - With reduced motion or Data Saver it doesn't play; the first frame of the clip stands still. */

const prefersReduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const saveData = () => navigator.connection?.saveData === true

export default function Hero() {
  const video = useRef(null)
  const section = useRef(null)
  const [ready, setReady] = useState(false)    // first frame decoded: fade the film in
  const [dim, setDim] = useState(false)        // dip to dark around the loop point
  const [paused, setPaused] = useState(() => prefersReduced() || saveData())   // the visitor's choice
  const [visible, setVisible] = useState(true) // on screen and the tab in front
  const [from, to] = HERO.clip

  // Start at the clip, loop it with a short dip to dark.
  useEffect(() => {
    const v = video.current; if (!v) return
    let raf = 0, jumping = false
    const start = () => { if (v.currentTime < from || v.currentTime > to) v.currentTime = from }
    const onSeeked = () => { if (jumping) { jumping = false; setTimeout(() => setDim(false), 80) } }
    const tick = () => {
      const t = v.currentTime
      if (!jumping && t >= to - 0.55) setDim(true)
      if (!jumping && t >= to) { jumping = true; v.currentTime = from }
      raf = requestAnimationFrame(tick)
    }
    const onPlay = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick) }
    const onPause = () => cancelAnimationFrame(raf)
    v.addEventListener('loadedmetadata', start)
    v.addEventListener('seeked', onSeeked)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    if (v.readyState >= 1) start()
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', start); v.removeEventListener('seeked', onSeeked)
      v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause)
    }
  }, [from, to])

  // Pause off screen and in background tabs.
  useEffect(() => {
    const el = section.current; if (!el) return
    let onScreen = true
    const update = () => setVisible(onScreen && !document.hidden)
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; update() }, { threshold: 0.05 })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  // Play or pause to match.
  useEffect(() => {
    const v = video.current; if (!v) return
    if (!paused && visible) v.play().catch(() => setPaused(true)); else v.pause()
  }, [paused, visible])

  const explore = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return
    const target = document.getElementById('programmes')
    if (target) { e.preventDefault(); smoothScrollTo(target) }
  }

  return (
    <section ref={section} aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(540px,calc(100svh-112px))] flex-col justify-end overflow-hidden bg-navy text-white md:min-h-[min(920px,max(560px,calc(100svh-77px)))] lg:min-h-[min(920px,max(560px,calc(100svh-117px)))]">
      {/* The film */}
      <video ref={video} src={`${CAMPUS_VIDEO}#t=${from}`} muted playsInline preload="auto" aria-hidden tabIndex={-1}
        onLoadedData={() => setReady(true)}
        className={`hero-drift absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out-soft ${ready ? 'opacity-100' : 'opacity-0'}`} />
      {/* Shade: darker where the words sit (left and bottom), lighter top right; it also hides the film's own captions */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(6_14_28/.86)_0%,rgb(6_14_28/.55)_42%,rgb(6_14_28/.18)_72%,rgb(6_14_28/.32)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(6_14_28/.92)_0%,rgb(6_14_28/.55)_30%,transparent_62%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[rgb(6_14_28/.55)] to-transparent" />
      <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 bg-[#060e1c] transition-opacity duration-500 ${dim ? 'opacity-70' : 'opacity-0'}`} />

      <div className="wrap pb-28 pt-20 md:pb-10">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-[680px]">
            <p className="hero-in meta flex items-center gap-3 text-white/70"><span className="h-px w-8 bg-sun" />{HERO.eyebrow}</p>
            <h1 id="hero-title" className="hero-in mt-5 font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.025em] sm:text-[56px] lg:text-[72px]" style={{ animationDelay: '.12s' }}>
              <span className="sr-only">KL University Hyderabad (KLH): </span>{HERO.title[0]}<br /><span className="text-sun">{HERO.title[1]}</span>
            </h1>
            <p className="hero-in mt-5 max-w-[540px] text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ animationDelay: '.24s' }}>{HERO.lead}</p>
            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '.36s' }}>
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary group h-[52px] px-6 text-[15px] shadow-[0_14px_30px_-12px_rgba(168,16,26,.9)]">
                Apply Now<ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="#programmes" onClick={explore} className="btn group h-[52px] border border-white/30 bg-white/10 px-6 text-[15px] text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-navy">
                Explore Programmes<ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="hero-in mt-5 flex items-center gap-2.5 text-[14px] font-medium text-white/85" style={{ animationDelay: '.48s' }}>
              <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-sun/70 motion-reduce:hidden" /><span className="relative h-2 w-2 rounded-full bg-sun" /></span>
              {HERO.note}
            </p>
          </div>

          {/* Industry academies on campus (KLH's partners), as white logo tiles */}
          <div className="hero-in max-lg:hidden lg:w-[360px]" style={{ animationDelay: '.6s' }}>
            <p className="text-right text-[15px] font-semibold leading-snug text-white">Industry academies<br />on campus</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {PARTNERS.map(([p, n]) => <li key={n} title={n} className="h-14 rounded-[10px] bg-white px-4 py-2.5"><Img p={p} alt={n} fit="contain" eager /></li>)}
            </ul>
          </div>
        </div>

        {/* Four facts about KLH along the bottom of the hero */}
        <ul className="hero-in mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-white/15 bg-white/10 backdrop-blur-md lg:mt-14 lg:grid-cols-4" style={{ animationDelay: '.7s' }}>
          {HERO.tiles.map(t => (
            <li key={t.k} className="bg-[rgb(6_14_28/.5)] p-4 md:p-5">
              <p className="meta text-sun max-sm:text-[9.5px]">{t.k}</p>
              <p className="mt-2 font-display text-[16px] font-semibold leading-tight md:text-[20px]">{t.t}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/70 md:text-[13px]">{t.d}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Pause / play */}
      <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play background video' : 'Pause background video'}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-6 md:top-6">
        {paused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}
      </button>
    </section>
  )
}
