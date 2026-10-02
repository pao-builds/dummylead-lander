import gsap from 'gsap';

/** Wide layout breakpoint. Keep in sync with the media query in FlankExhibit.astro. */
const WIDE = '(min-width: 1000px)';

/**
 * Controls for a FlankExhibit's side points: light the ones that match what
 * the centerpiece is showing, play a one-time entrance, or show all of them
 * (reduced motion). Lighting only dims/wires on the wide layout; on narrow
 * screens the points are a plain list below the centerpiece and stay lit.
 */
export function flank(root: HTMLElement) {
  const points = gsap.utils.toArray<HTMLElement>('[data-point]', root);
  const wide = window.matchMedia(WIDE);
  const fill = (pt: HTMLElement) => pt.querySelector('.fx-wire-fill');

  /** Light the points at these indices (into the exhibit's points array). */
  const light = (lit: number[]) => {
    points.forEach((pt) => {
      const on = !wide.matches || lit.includes(Number(pt.dataset.point));
      gsap.to(pt, { opacity: on ? 1 : 0.4, duration: 0.45, ease: 'power2.out' });
      gsap.to(fill(pt), {
        scaleX: on && wide.matches ? 1 : 0,
        duration: on ? 0.55 : 0.3,
        ease: on ? 'power2.inOut' : 'power2.in',
      });
      if (on && wide.matches) {
        gsap.fromTo(
          pt.querySelector('.fx-check'),
          { scale: 0.7 },
          { scale: 1, duration: 0.45, ease: 'back.out(2.6)', delay: 0.1 }
        );
      }
    });
  };

  /** Hide the points ahead of `enter()`. */
  const arm = () => gsap.set(points, { autoAlpha: 0 });

  /** Points slide in from their side toward the centerpiece. */
  const enter = (onComplete?: () => void) =>
    gsap.fromTo(
      points,
      { autoAlpha: 0, x: (_i: number, t: HTMLElement) => (t.closest('.fx-side-left') ? -24 : 24) },
      { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', onComplete }
    );

  /** Static state: every point lit and wired. */
  const all = () => gsap.set(points.map(fill), { scaleX: 1 });

  return { light, arm, enter, all };
}
