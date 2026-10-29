/* Dependency-free, progressive enhancements. Safe to initialize more than once. */
export function initWow(root = document) {
  const cleanups = [];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // HTML: <div data-spotlight> ... </div>. CSS uses --spot-x and --spot-y.
  root.querySelectorAll('[data-spotlight]').forEach(el => {
    const move = e => {
      if (motion.matches || e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX-r.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY-r.top}px`);
    };
    el.addEventListener('pointermove', move);
    cleanups.push(() => el.removeEventListener('pointermove', move));
  });
  // HTML: <div data-reveal>. Content stays visible if JS is unavailable.
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('wow-pending');
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.08});
    root.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('wow-pending'); observer.observe(el);
    });
    const restore = () => { if (motion.matches) root.querySelectorAll('.wow-pending').forEach(el => el.classList.remove('wow-pending')); };
    motion.addEventListener('change', restore);
    cleanups.push(() => {observer.disconnect(); motion.removeEventListener('change', restore); root.querySelectorAll('.wow-pending').forEach(el => el.classList.remove('wow-pending'));});
  }
  return () => cleanups.forEach(fn => fn());
}
