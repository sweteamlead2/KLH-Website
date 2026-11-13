import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Phone } from 'lucide-react'
import { MENU, UTILITY, PROGRAMMES } from '../site'
import { SITE } from '../data'
import { Logo, SmartLink } from './ui'
import MainNav from './MainNav'

const tel = (p) => `tel:${p.replace(/[^\d+]/g, '')}`
const programmeLinks = PROGRAMMES.flatMap(s => s.items.map(p => ({ t: `${p.short} · ${p.name}`, to: `/programmes/${p.slug}` })))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null)
  const [compact, setCompact] = useState(false)
  const { pathname, hash } = useLocation()
  const [lastLoc, setLastLoc] = useState(pathname + hash)
  if (pathname + hash !== lastLoc) { setLastLoc(pathname + hash); setOpen(false); setSub(null) }

  useEffect(() => {
    const f = () => setCompact(window.scrollY > 120)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="wrap flex h-10 items-center justify-between gap-6">
          <p className="flex items-center gap-2.5 truncate text-[12.5px] font-medium tracking-[.06em]"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />KONERU LAKSHMAIAH EDUCATION FOUNDATION <span className="font-normal text-white/55 max-xl:hidden">(Deemed to be University)</span></p>
          <nav aria-label="Quick links" className="flex shrink-0 items-center gap-5 text-[12.5px]">
            {UTILITY.map(l => <SmartLink key={l.t} to={l.href} className="u-link text-white/75 transition-colors hover:text-sun">{l.t}</SmartLink>)}
          </nav>
        </div>
      </div>

      {/* Header: logo, main menu (MainNav, 1280px and wider; a drawer below that) and Apply Now */}
      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-[box-shadow,border-color] duration-300 ${compact ? 'border-line shadow-[0_10px_30px_-18px_rgba(10,26,51,.35)]' : 'border-line/70'}`}>
        <div className="wrap flex items-center gap-4 max-md:h-16 md:h-[76px]">
          <Link to="/" aria-label="KL University Hyderabad home" className="shrink-0"><span className="md:hidden"><Logo height={36} /></span><span className="max-md:hidden"><Logo height={44} /></span></Link>
          <MainNav />
          <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary btn-sm ml-auto shrink-0 xl:ml-0">Apply Now</a>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line max-md:hidden xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer: one accordion per menu item */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${open ? '' : 'pointer-events-none'}`} inert={!open}>
        <div className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <aside className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white transition-transform duration-300 ease-out-soft ${open ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-label="Menu">
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Logo height={38} />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-line"><X size={20} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 pb-8" aria-label="Mobile">
            {MENU.map(n => (
              <div key={n.label} className="border-b border-line">
                <button className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold" onClick={() => setSub(sub === n.label ? null : n.label)} aria-expanded={sub === n.label}>
                  {n.label}<ChevronDown size={18} className={`transition-transform duration-300 ${sub === n.label ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${sub === n.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pl-3 text-[13.5px] text-muted">{n.blurb}</p>
                    <Link to={n.to} className="block py-2.5 pl-3 text-[15px] font-semibold text-navy">{n.label} overview</Link>
                    {(n.programmes ? [{ title: 'Programmes', links: programmeLinks }] : n.groups).map(g => (
                      <div key={g.title} className="pb-2">
                        <p className="meta pl-3 pt-2 text-muted">{g.title}</p>
                        <ul>{g.links.map(l => <li key={l.to}><SmartLink to={l.to} className="block py-2.5 pl-3 text-[15px] text-ink-2">{l.t}</SmartLink></li>)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6 grid gap-3">
              <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary">Apply Now</a>
              <Link to="/about#contact" className="btn-outline">Contact us</Link>
              <a href={tel(SITE.phone)} className="mt-2 flex items-center gap-2 text-[15px] text-ink-2"><Phone size={15} />{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="text-[15px] text-ink-2">{SITE.email}</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6">
              {UTILITY.map(l => <SmartLink key={l.t} to={l.href} className="meta text-muted">{l.t}</SmartLink>)}
            </div>
          </nav>
        </aside>
      </div>
    </>
  )
}
