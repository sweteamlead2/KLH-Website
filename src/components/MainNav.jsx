import { Link, useLocation } from 'react-router-dom'
import { DOCK } from '../site'
import { smoothScrollTo } from './scroll'

// Desktop main menu (1280px and wider), inside the header (Navbar). Each item leads to its page and the page
// you are on is underlined; it doesn't follow scrolling (the floating SectionBar does that for a page's sections).
// Tablets and phones keep their own navigation (Navbar drawer, phonenav).

export default function MainNav() {
  const { pathname } = useLocation()
  const active = DOCK.findIndex(d => (d.match ? d.match(pathname) : pathname === d.to))

  const onPick = (e, i) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return   // let "open in new tab" work
    if (i === active) { e.preventDefault(); smoothScrollTo(null) }             // already on this page: back to its top
  }

  // Arrow keys, Home and End move between the menu's links.
  const onKey = (e) => {
    const links = [...e.currentTarget.querySelectorAll('a')]
    const k = links.indexOf(document.activeElement); if (k < 0) return
    const next = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: links.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    links[(next + links.length) % links.length].focus()
  }

  return (
    <nav aria-label="Main" onKeyDown={onKey} className="hidden h-full min-w-0 flex-1 items-center justify-center xl:flex">
      <ul className="flex h-full items-center">
        {DOCK.map((d, i) => {
          const on = i === active
          return (
            <li key={d.label} className="h-full">
              <Link to={d.to} onClick={e => onPick(e, i)} aria-current={on ? 'page' : undefined}
                className={`relative flex h-full items-center whitespace-nowrap px-(--px) text-[13px] font-medium outline-offset-[-2px] transition-colors [--px:7px] ${on ? 'text-navy' : 'text-ink-2 hover:text-navy'}`}>
                {d.label}
                <span className={`absolute inset-x-(--px) bottom-0 h-0.5 origin-left bg-brand transition-transform duration-300 motion-reduce:transition-none ${on ? 'scale-x-100' : 'scale-x-0'}`} />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
