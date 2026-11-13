import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Images, MapPin, X } from 'lucide-react'
import { CAMPUS_INFO, CAMPUS_PLACES, SITE } from '../data'
import { ALL_PROGRAMMES } from '../site'
import { Img } from './ui'
import { Reveal } from './motion'
import { CourseEnquiryForm } from './forms'

/* The places on each campus, side by side (on wide screens the two headers share a row, so both sets of tiles start level). Not a comparison: each campus shows its own six places (they differ,
   because the campuses differ), in the same frame, the same tile sizes and the same order of layout, alphabetical.
   A tile opens that place's photographs in a viewer (arrow keys, swipe, Escape). Under the tiles, each campus has
   the same two blocks: its location (the map klh.edu.in embeds for it, the address, directions) and admissions
   (apply, and a link down to that campus's own admissions section, CampusAdmissions). Phones stack the campuses. */

export function CampusPlaces() {
  const [open, setOpen] = useState(null)   // { campus, place, i }
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] lg:gap-x-8 lg:gap-y-0">
        {CAMPUS_INFO.map((c, k) => {
          const info = CAMPUS_PLACES[c.key]
          return (
            <Reveal key={c.key} delay={k * 100} className="rounded-[22px] border border-line bg-white p-3 sm:p-4 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
              <header className="grid items-start gap-3 px-2 pb-4 pt-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-3">
                <div className="min-w-0">
                  <p className="meta text-blue">Campus</p>
                  <h3 className="mt-1 font-display text-[26px] font-semibold leading-tight text-navy sm:text-[30px]">{c.name}</h3>
                </div>
                <Link to={c.to} className="btn-outline btn-sm w-fit shrink-0">Campus page<ArrowRight size={14} /></Link>
              </header>
              <ul className="grid grid-cols-2 content-start gap-2 sm:gap-3">
                {info.places.map((p, i, all) => {
                  // the first place is wide; so is the last when it would otherwise sit alone in its row
                  const wide = i === 0 || (i === all.length - 1 && i % 2 === 1)
                  return (
                  <li key={p.t} className={wide ? 'col-span-2' : ''}>
                    <button type="button" onClick={() => setOpen({ campus: c, place: p, i: 0 })}
                      aria-label={`${p.t}, ${c.name} campus: view ${p.photos.length} photo${p.photos.length > 1 ? 's' : ''}`}
                      className={`group relative block w-full overflow-hidden rounded-[14px] bg-navy text-left ${wide ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                      <Img p={p.photos[0][0]} alt="" zoom />
                      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_14_28/.88)_0%,rgb(6_14_28/.35)_50%,transparent_80%)]" />
                      <span aria-hidden className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[rgb(6_14_28/.55)] px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        <Images size={12} />{p.photos.length}
                      </span>
                      <span className="absolute inset-x-3 bottom-3 text-white sm:inset-x-4 sm:bottom-4">
                        <span className="block font-display text-[15px] font-semibold leading-tight sm:text-[18px]">{p.t}</span>
                        <span className="mt-1 line-clamp-2 block text-[12px] leading-snug text-white/75 max-sm:hidden sm:text-[13px]">{p.d}</span>
                      </span>
                    </button>
                  </li>
                  )
                })}
              </ul>

              <div className="mt-3 grid content-start gap-3 sm:mt-4">
                {/* Location */}
                <section aria-label={`${c.name} campus location`} className="overflow-hidden rounded-[14px] border border-line">
                  <iframe src={info.map} title={`Map of the ${c.name} campus`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="block aspect-[2/1] w-full border-0 bg-surface" />
                  <div className="p-4">
                    <p className="meta text-blue">Location</p>
                    <p className="mt-1 flex items-start gap-1.5 text-[14px] leading-snug text-ink-2"><MapPin size={14} className="mt-0.5 shrink-0 text-brand" />{info.where}</p>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${info.at}`} target="_blank" rel="noreferrer" className="btn-outline btn-sm mt-3 w-fit">
                      Directions<ArrowUpRight size={14} /><span className="sr-only"> to the {c.name} campus (opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </section>
                {/* Admissions */}
                <section aria-label={`Admissions at the ${c.name} campus`} className="surface-navy rounded-[14px] p-4 text-white sm:p-5">
                  <p className="meta text-sun">Admissions</p>
                  <p className="mt-1 font-display text-[19px] font-semibold">Study at {c.name}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary btn-sm">Apply now<ArrowUpRight size={14} /><span className="sr-only"> (KL admissions portal, opens in a new tab)</span></a>
                    <a href={`#admissions-${c.key}`} className="btn-ghost btn-sm">Admissions at {c.name}<ArrowRight size={14} /></a>
                  </div>
                </section>
              </div>
            </Reveal>
          )
        })}
      </div>
      {open && <PlaceViewer {...open} onClose={() => setOpen(null)} />}
    </>
  )
}

/* A place's photographs, one at a time, uncropped, with the caption and thumbnails. */
function PlaceViewer({ campus, place, i: start, onClose }) {
  const d = useRef(null)
  const [i, setI] = useState(start)
  const n = place.photos.length
  const go = (s) => setI(v => (v + s + n) % n)
  useEffect(() => { d.current?.showModal() }, [])
  const touch = useRef(null)
  const onKey = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
  const [p, alt] = place.photos[i]
  const nav = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-navy'
  return (
    <dialog ref={d} onClose={onClose} onKeyDown={onKey} onClick={e => e.target === d.current && d.current.close()} aria-label={`${place.t}, ${campus.name} campus`}
      className="m-auto h-[min(860px,calc(100dvh-24px))] w-[min(1100px,calc(100vw-24px))] max-h-none max-w-none overflow-hidden rounded-[20px] bg-[#060e1c] p-0 text-white backdrop:bg-[rgb(6_14_28/.85)]">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="meta text-sun">{campus.name} campus</p>
            <h3 className="mt-1 font-display text-[20px] font-semibold sm:text-[24px]">{place.t}</h3>
            <p className="mt-1 text-[13.5px] text-white/70">{place.d}</p>
          </div>
          <button type="button" onClick={() => d.current.close()} aria-label="Close" autoFocus className={nav}><X size={18} /></button>
        </div>
        <div className="relative min-h-0 flex-1 touch-pan-y"
          onPointerDown={e => { touch.current = e.clientX }}
          onPointerUp={e => { if (touch.current == null) return; const dx = e.clientX - touch.current; touch.current = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1) }}>
          <Img key={p} p={p} alt={alt} fit="contain" eager />
          {n > 1 && (<>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${nav} absolute left-3 top-1/2 -translate-y-1/2`}><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${nav} absolute right-3 top-1/2 -translate-y-1/2`}><ArrowRight size={18} /></button>
          </>)}
        </div>
        <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
          <p className="min-w-0 text-[13.5px] text-white/75"><span className="meta mr-2 text-white/50" aria-live="polite">{i + 1} / {n}</span>{alt}</p>
          {n > 1 && (
            <ul className="flex shrink-0 gap-2 max-sm:hidden">
              {place.photos.map(([tp, ta], k) => (
                <li key={tp}>
                  <button type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}: ${ta}`} aria-current={k === i || undefined}
                    className={`block h-12 w-16 overflow-hidden rounded-[8px] ring-2 transition ${k === i ? 'ring-sun' : 'opacity-60 ring-transparent hover:opacity-100'}`}>
                    <Img p={tp} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  )
}

/* Admissions at each campus, side by side (#admissions): one panel per campus, each separate and complete (the
   programmes taught there, Apply, that campus's fees and admissions page, and an enquiry form with the campus
   already chosen). On wide screens the panels share their rows (heading, programmes, buttons, form), so the two
   forms start level even though the programme lists differ in length. Each panel has its own id
   (#admissions-aziznagar, #admissions-bachupally) for the campus panels' links. Phones stack them. */
export function CampusAdmissions() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-8 lg:gap-y-0">
      {CAMPUS_INFO.map((c, k) => {
        const info = CAMPUS_PLACES[c.key]
        const progs = ALL_PROGRAMMES.filter(p => p.campuses.some(x => x.c === c.name))
        return (
          <Reveal key={c.key} delay={k * 100} id={`admissions-${c.key}`}
            className="rounded-[22px] border border-line bg-white p-5 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid">
            <header className="pb-5">
              <p className="meta text-blue">{c.name} campus</p>
              <h3 className="mt-1 font-display text-[26px] font-semibold leading-tight text-navy sm:text-[30px]">Admissions at {c.name}</h3>
              <p className="mt-2 flex items-start gap-1.5 text-[13.5px] leading-snug text-ink-2"><MapPin size={14} className="mt-0.5 shrink-0 text-brand" />{info.where}</p>
            </header>
            <div>
              <p className="meta text-muted">Programmes at {c.name}</p>
              <ul className="mt-3 border-t border-line">
                {progs.map(p => (
                  <li key={p.slug} className="border-b border-line">
                    <Link to={`/programmes/${p.slug}`} className="group -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[8px] px-3 py-3 transition-colors hover:bg-surface">
                      <span className="min-w-0">
                        <span className="block font-display text-[15.5px] font-semibold text-ink group-hover:text-navy">{p.short}</span>
                        <span className="block text-[13px] text-muted">{p.name} · {p.level === 'UG' ? 'Undergraduate' : 'Postgraduate'} · {p.dur}</span>
                      </span>
                      <ArrowRight size={16} aria-hidden className="text-muted transition-[transform,color] group-hover:translate-x-1 group-hover:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6">
              <div className="flex flex-wrap gap-3">
                <a href={SITE.applyUrl} target="_blank" rel="noreferrer" className="btn-primary">Apply now<ArrowUpRight size={16} /><span className="sr-only"> (KL admissions portal, opens in a new tab)</span></a>
                <Link to={info.admissions} className="btn-outline">{c.name} fees &amp; admissions</Link>
              </div>
              <p className="mt-3 text-[13px] text-muted">Applications are made on the KL admissions portal.</p>
            </div>
            <div className="mt-6 border-t border-line pt-6">
              <h4 className="font-display text-[19px] font-semibold text-ink">Admission enquiry</h4>
              <p className="mb-5 mt-1 text-[14px] text-muted">An admissions counsellor for the {c.name} campus will contact you.</p>
              <CourseEnquiryForm key={c.key} compact campus={info.enquiry} />
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
