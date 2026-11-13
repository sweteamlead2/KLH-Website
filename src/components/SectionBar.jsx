import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SECTIONS, pageOf, pageName } from '../site'
import { smoothScrollTo } from './scroll'

// In-page navigation for tablets and desktops (768px and wider), on pages with sections (SECTIONS in site.js):
// a white bar floating at the bottom with every section of the page in one row. The section in view is a filled
// navy block that glides from item to item as you scroll; clicking an item scrolls to it.
// The bar rises in once you reach the first section (it stays out of the hero and page headers).
// Phones have the same thing as a picker under the header (SectionPicker in phonenav.jsx).

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function SectionBar() {
  const { pathname } = useLocation()
  const page = pageOf(pathname)
  const [items, setItems] = useState([])     // the page's sections that are actually on the page
  const [active, setActive] = useState(null)
  const [last, setLast] = useState(pathname)
  if (pathname !== last) { setLast(pathname); setActive(null); setItems([]) }
  const scroller = useRef(null)
  const links = useRef({})
  const lock = useRef(false)   // true while a click-started scroll runs, so the bar doesn't flicker through the sections it passes
  const sync = useRef(null)

  // Watch a band across the middle of the screen; the last section in it is the current one.
  useEffect(() => {
    if (!page) return
    const inBand = new Set()
    let els = []
    const pick = () => {
      if (lock.current) return
      // at the end of the page the last sections can't scroll up to the band: take the last one in view
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const seen = atEnd ? els.filter(e => e.getBoundingClientRect().top < window.innerHeight * 0.85) : []
      const vis = els.filter(e => inBand.has(e))
      if (seen.length) setActive(seen[seen.length - 1].id)
      else if (vis.length) setActive(vis[vis.length - 1].id)
      else if (els[0] && els[0].getBoundingClientRect().top > window.innerHeight * 0.4) setActive(null)
    }
    sync.current = pick
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? inBand.add(e.target) : inBand.delete(e.target)))
      pick()
    }, { rootMargin: '-40% 0px -55% 0px' })
    let frame = 0
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) pick() }) }
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setTimeout(() => {
      const found = SECTIONS[page].filter(([id]) => document.getElementById(id))
      els = found.map(([id]) => document.getElementById(id))
      setItems(found)
      els.forEach(e => io.observe(e))
    }, 0)
    return () => { clearTimeout(t); io.disconnect(); sync.current = null; window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [page, pathname])

  // The navy block: measured from the active link, re-measured when the bar resizes.
  const [size, setSize] = useState(0)
  const [overflow, setOverflow] = useState(false)   // the row is wider than the bar: fade its edges
  useEffect(() => {
    const el = scroller.current; if (!el) return
    const ro = new ResizeObserver(() => { setSize(el.clientWidth); setOverflow(el.scrollWidth > el.clientWidth + 1) })
    ro.observe(el)
    return () => ro.disconnect()
  }, [items.length])
  const [box, setBox] = useState(null)
  useLayoutEffect(() => {
    const a = links.current[active]
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads layout, so it has to run after render
    setBox(b => (a ? { l: a.offsetLeft, w: a.offsetWidth, jump: !b?.shown, shown: true } : { ...b, shown: false }))
  }, [active, size, items])

  // Keep the active item in view when the row scrolls sideways (narrow screens, long section names).
  useEffect(() => {
    const a = links.current[active], s = scroller.current
    if (a && s && s.scrollWidth > s.clientWidth) s.scrollTo({ left: a.offsetLeft - s.clientWidth / 2 + a.offsetWidth / 2, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [active])

  if (!page || !items.length) return null
  const shown = active !== null
  const go = (e, id) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return   // let "open in new tab" work
    e.preventDefault()
    setActive(id)
    smoothScrollTo(document.getElementById(id), {
      onStart: () => { lock.current = true },
      onDone: () => { lock.current = false; sync.current?.() },
    })
  }
  // Arrow keys, Home and End move between the items.
  const onKey = (e) => {
    const all = [...e.currentTarget.querySelectorAll('a')]
    const i = all.indexOf(document.activeElement); if (i < 0) return
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: all.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault(); all[(next + all.length) % all.length].focus()
  }

  return (
    <nav id="section-bar" aria-label={`Sections on this page: ${pageName(page, pathname)}`} inert={!shown}
      className={`fixed inset-x-0 bottom-4 z-[70] hidden transition-[opacity,transform] duration-500 ease-out-soft motion-reduce:transition-none md:block ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <div className="wrap">
        <div className="rounded-[14px] border border-line/80 bg-white/95 p-1.5 shadow-[0_18px_44px_-18px_rgba(10,26,51,.4),0_2px_8px_-2px_rgba(10,26,51,.08)] backdrop-blur-md">
        <div ref={scroller} className={`no-scrollbar overflow-x-auto rounded-[10px] ${overflow ? '[mask-image:linear-gradient(90deg,transparent,#000_40px,#000_calc(100%-40px),transparent)]' : ''}`}>
          <ul onKeyDown={onKey} className="relative flex min-w-max">
            <span aria-hidden className="pointer-events-none absolute inset-y-0 rounded-[10px] bg-navy shadow-[0_8px_18px_-10px_rgba(10,26,51,.8)]"
              style={box ? { left: box.l, width: box.w, opacity: box.shown ? 1 : 0, transition: box.jump || reducedMotion() ? 'opacity .2s' : 'left .45s cubic-bezier(.22,1,.36,1), width .45s cubic-bezier(.22,1,.36,1), opacity .2s' } : { opacity: 0 }} />
            {items.map(([id, t]) => {
              const on = id === active
              return (
                <li key={id} className="flex-1">
                  <a ref={el => { links.current[id] = el }} href={`#${id}`} onClick={e => go(e, id)} aria-current={on ? 'location' : undefined}
                    className={`relative flex h-10 items-center justify-center whitespace-nowrap rounded-[10px] px-4 text-[13.5px] outline-offset-[-2px] transition-colors duration-300 ${on ? 'font-semibold text-white' : 'text-ink-2 hover:bg-navy/[.05] hover:text-navy'}`}>
                    {t}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        </div>
      </div>
    </nav>
  )
}
