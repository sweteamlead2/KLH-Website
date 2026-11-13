// Smooth scroll used by the menus (MainNav, SectionBar).
// Scrolls `target` to the top of the view (null: the top of the page), honouring scroll-margin-top and reduced motion,
// and moves keyboard focus there. `onStart` runs at once and `onDone` once scrolling has finished, so scroll-spies
// can hold still meanwhile instead of flickering through the sections in between.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function smoothScrollTo(target, { onStart, onDone } = {}) {
  const behavior = reducedMotion() ? 'auto' : 'smooth'
  onStart?.()
  // The scroll is over once the target has arrived (or the page can't scroll further) and scrolling has paused,
  // at `scrollend`, or after 3 seconds at most. A pause on the way (a slow frame) doesn't end it.
  const deadline = performance.now() + 3000
  const arrived = () => {
    if (!target) return window.scrollY < 2
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    return Math.abs(target.getBoundingClientRect().top - margin) < 3 || atEnd
  }
  let timer, finished = false
  const done = () => {
    if (finished) return
    finished = true; clearTimeout(timer)
    window.removeEventListener('scrollend', end); window.removeEventListener('scroll', idle)
    onDone?.()
  }
  const check = () => { if (arrived() || performance.now() > deadline) done(); else timer = setTimeout(check, 150) }
  const idle = () => { clearTimeout(timer); timer = setTimeout(check, 150) }
  const end = () => check()
  window.addEventListener('scrollend', end)
  window.addEventListener('scroll', idle, { passive: true })
  timer = setTimeout(check, 400)
  if (target) target.scrollIntoView({ behavior, block: 'start' }); else window.scrollTo({ top: 0, behavior })
  // move keyboard focus with the view, without a second jump
  const focusEl = target || document.getElementById('main')
  if (focusEl) { if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1'); focusEl.focus({ preventScroll: true }) }
}
