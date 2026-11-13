import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ImageOff } from 'lucide-react'
import { klh, LOGO } from '../assets'
import { Reveal } from './motion'

/* Official KLH logo at its native aspect ratio. The artwork has black lettering,
   so on dark backgrounds it sits on a white plate instead of being recoloured. */
export function Logo({ onDark, height = 48 }) {
  const el = <img src={LOGO.src} alt={LOGO.alt} width={LOGO.w} height={LOGO.h} style={{ height, width: 'auto' }} className="block" />
  return onDark ? <span className="inline-block rounded-[6px] bg-white p-2.5">{el}</span> : el
}

/* A klh.edu.in image by upload path (p). Fills its box (cover by default);
   fit='contain' for artwork with text, fit='natural' to keep the file's own aspect ratio.
   zoom: scale slightly when a parent `.group` is hovered. */
/* Loading state, picked from where the image sits and how big it is (override with `loader`):
   hero    above the fold (eager): its own colours, blurred, sharpen into the photo
   banner  carousel slides and wide artwork: colour wash with a slow light sweep
   card    photos in cards and grids: colour wash, shimmer after a beat, then a gentle settle
   content images in page text: reserved box, shimmer, then fade up
   logo    logos and posters on white: soft pulse, then fade in
   icon    small artwork (≤160px): just a quick fade
   Images already in the browser cache show at once, with no animation. Reduced motion: a plain short fade. */
function loaderFor({ loader, eager, fit, w, h }) {
  if (loader) return loader
  if (eager) return 'hero'
  if (w <= 160 && h <= 160) return 'icon'
  if (fit === 'contain') return w >= 900 ? 'banner' : 'logo'
  if (fit === 'natural') return 'content'
  return 'card'
}
const phStyle = (c) => {
  if (!c) return undefined
  const [a, b, d, e] = c.match(/.{6}/g).map(x => '#' + x)
  return { '--ph-a': a, '--ph-b': b, '--ph-c': d, '--ph-d': e }
}

// How wide each kind of image is drawn, so the browser picks the smallest AVIF that stays sharp
const SIZES = {
  hero: '100vw', banner: '100vw',
  content: '(min-width: 1024px) 820px, 100vw',
  card: '(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw',
  logo: '320px', icon: '160px',
}
// AVIF copies made by scripts/optimize-images.cjs (public/img/<width>/<path>.avif); widths listed in the manifest
const avifSet = (p, widths) => widths?.length ? widths.map(x => `/img/${x}/${encodeURI(p.replace(/\.\w+$/, '.avif'))} ${x}w`).join(', ') : null

export function Img({ p, alt = '', className = '', fit = 'cover', eager, position, zoom, loader, sizes }) {
  let i = null
  try { i = klh(p, alt) } catch (e) { if (import.meta.env.DEV) console.warn(e.message) }
  const [state, setState] = useState('loading')
  // an image the browser already has (cache, back navigation) is complete before React sees onLoad
  const ref = useRef(null)
  useEffect(() => { const el = ref.current; if (el?.complete && el.naturalWidth) setState('cached') }, [p])
  const kind = loaderFor({ loader, eager, fit, w: i?.w || 0, h: i?.h || 0 })
  const box = fit === 'natural' ? 'w-full' : 'h-full w-full'
  const avif = i ? avifSet(p, i.v) : null
  const f = fit === 'natural' ? 'h-auto' : fit === 'contain' ? 'h-full object-contain' : 'h-full object-cover'
  if (!i) return (
    <span className={`img-frame ${box}`} data-loader={kind} data-state="error" style={fit === 'natural' ? { aspectRatio: '16 / 9' } : undefined}>
      <span aria-hidden className="img-ph"><ImageOff size={20} className="img-ph-icon" /></span>
    </span>
  )
  return (
    <span className={`img-frame ${box}`} data-loader={kind} data-state={state} style={phStyle(i.c)}>
      <picture className="contents">
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes || SIZES[kind]} />}
      <img ref={ref} src={i.src} alt={i.alt} width={i.w} height={i.h} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined}
        onLoad={() => setState(s => s === 'cached' ? s : 'loaded')} onError={() => setState('error')}
        className={`img-el w-full ${f} ${zoom ? 'transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]' : ''} ${className}`}
        style={position ? { objectPosition: position } : undefined} />
      </picture>
      <span aria-hidden className="img-ph">{state === 'error' && <ImageOff size={20} className="img-ph-icon" />}</span>
    </span>
  )
}

/* Section header: mono eyebrow with a rule, display title, optional lead and action. */
export function SectionHead({ eyebrow, title, sub, right, dark, className = '' }) {
  return (
    <Reveal className={`mb-10 grid gap-6 md:mb-12 lg:grid-cols-[1fr_auto] lg:items-end ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <p className={`meta flex items-center gap-3 ${dark ? 'text-white/60' : 'text-muted'}`}><span className="rule h-px bg-brand" />{eyebrow}</p>}
        <h2 className={`display-2 mt-4 ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {sub && <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-2'}`}>{sub}</p>}
      </div>
      {right && <div className="flex flex-wrap gap-3">{right}</div>}
    </Reveal>
  )
}

export const Sec = ({ tone, children, id, className = '' }) => {
  const bg = tone === 'surface' ? 'bg-surface' : tone === 'navy' ? 'bg-navy text-white' : 'bg-white'
  return <section id={id} className={`py-16 max-md:py-12 md:py-24 ${bg} ${className}`}><div className="wrap">{children}</div></section>
}

// eslint-disable-next-line react-refresh/only-export-components
export const isExternal = (to) => /^(https?:|mailto:|tel:)/.test(to || '') || isFile(to)
// eslint-disable-next-line react-refresh/only-export-components
export const isFile = (to) => /^\/(files|media)\//.test(to || '')

/* Internal route or external URL, same styling. External links open in a new tab and show ↗. */
export function SmartLink({ to, children, className, arrow, onClick }) {
  if (isFile(to)) return <a href={to} target="_blank" rel="noreferrer" className={className} onClick={onClick}>{children}</a>
  if (isExternal(to)) return <a href={to} target="_blank" rel="noreferrer" className={className} onClick={onClick}>{children}{arrow && <ArrowUpRight size={13} className="shrink-0 opacity-50" />}</a>
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>
}

export function ArrowLink({ to, children, className = 'link-arrow' }) {
  return (
    <SmartLink to={to} className={`group/a ${className}`}>
      {children}{isExternal(to) && !isFile(to) ? <ArrowUpRight size={15} /> : <ArrowRight size={15} className="transition-transform duration-300 group-hover/a:translate-x-0.5" />}
    </SmartLink>
  )
}

/* Horizontal scroll-snap row with previous/next buttons. No autoplay. */
export function Slider({ children, label, dark }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ atStart: true, atEnd: false })
  const update = () => {
    const el = ref.current
    if (el) setPos({ atStart: el.scrollLeft < 8, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const go = (d) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.85, behavior: 'smooth' })
  const b = `grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 disabled:opacity-30 ${dark ? 'border-white/25 text-white hover:bg-white hover:text-navy' : 'border-line bg-white text-ink hover:border-navy hover:bg-navy hover:text-white'}`
  return (
    <div>
      <div ref={ref} onScroll={update} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0">{children}</div>
      <div className="mt-8 flex items-center justify-end gap-2">
        <button className={b} onClick={() => go(-1)} disabled={pos.atStart} aria-label={`Previous ${label}`}><ArrowLeft size={18} /></button>
        <button className={b} onClick={() => go(1)} disabled={pos.atEnd} aria-label={`Next ${label}`}><ArrowRight size={18} /></button>
      </div>
    </div>
  )
}

/* Banner carousel showing klh.edu.in slider images uncropped. Nothing sits on the banners (they carry their own
   text); the controls are a bar under the image: one segment per slide that fills as the slide plays (click one to
   jump to it), the slide count, and previous / pause / next. The fill drives the timing, so the bar and the slides
   never drift apart; hovering or focusing the carousel holds the current slide. `bar` adds classes to the control
   bar (e.g. "wrap" when the carousel runs full-bleed). */
export function BannerCarousel({ slides, interval = 6000, label = 'Highlights', eagerFirst = true, bar = 'px-4 md:px-5' }) {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const [hover, setHover] = useState(false)
  const running = playing && !hover && slides.length > 1
  // load only the slides shown so far plus the next one, not the whole set up front
  const [seen, setSeen] = useState(() => new Set([0, 1]))
  if (!seen.has(i) || !seen.has((i + 1) % slides.length)) setSeen(s => new Set([...s, i, (i + 1) % slides.length]))
  const go = (d) => setI(n => (n + d + slides.length) % slides.length)
  const btn = 'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white'
  // All klh.edu.in slider banners share one aspect ratio; the frame uses the first slide's
  const first = klh(slides[0][0])
  // Touch swipe on the image frame
  const touch = useRef(null)
  const onDown = (e) => { touch.current = e.clientX }
  const onUp = (e) => { if (touch.current == null) return; const dx = e.clientX - touch.current; touch.current = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1) }
  return (
    <section aria-roledescription="carousel" aria-label={label} className="relative bg-[#f5f6f8]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <div className="relative touch-pan-y select-none overflow-hidden" style={{ aspectRatio: `${first.w} / ${first.h}` }} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => { touch.current = null }} onDragStart={e => e.preventDefault()}>
        {slides.map(([p, alt], k) => (
          <div key={p} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${slides.length}`} aria-hidden={k !== i} className={`absolute inset-0 transition-opacity duration-[900ms] ease-out-soft ${k === i ? 'opacity-100' : 'opacity-0'}`}>
            {seen.has(k) && <Img p={p} alt={alt} fit="contain" eager={eagerFirst && k === 0} />}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="border-t border-line bg-white">
          <div className={`flex items-center gap-4 py-3 ${bar}`}>
            {/* one segment per slide; the current one fills over `interval`, then the next slide shows */}
            <div role="tablist" aria-label="Choose a slide" className="flex min-w-0 flex-1 items-center gap-0.5 sm:gap-1">
              {slides.map(([p], k) => (
                <button key={p} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1} of ${slides.length}`} onClick={() => setI(k)} className="group/s grid h-6 min-w-0 flex-1 place-items-center">
                  <span className={`relative block h-[3px] w-full overflow-hidden rounded-full transition-colors ${k < i ? 'bg-navy/45' : 'bg-line group-hover/s:bg-navy/30'}`}>
                    {k === i && (
                      <span key={`${i}-${playing}`} onAnimationEnd={() => go(1)}
                        className="absolute inset-0 origin-left rounded-full bg-brand"
                        style={playing ? { animation: `progress ${interval}ms linear both`, animationPlayState: running ? 'running' : 'paused' } : undefined} />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="meta shrink-0 tabular-nums text-muted" aria-live="polite"><span className="text-ink">{String(i + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}</p>
            <div className="flex shrink-0 items-center gap-1.5">
              <button className={btn} onClick={() => go(-1)} aria-label="Previous slide"><ArrowLeft size={16} /></button>
              <button className={btn} onClick={() => setPlaying(v => !v)} aria-label={playing ? 'Pause slides' : 'Play slides'}>
                {playing ? <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden><rect x="2" y="1" width="3" height="10" /><rect x="7" y="1" width="3" height="10" /></svg>
                  : <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M3 1l8 5-8 5z" /></svg>}
              </button>
              <button className={btn} onClick={() => go(1)} aria-label="Next slide"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
