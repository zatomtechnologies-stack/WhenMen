import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  scrub?: boolean | number;
}

/**
 * Attach to a container ref — all children with [data-reveal] will animate in
 * when they enter the viewport.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('[data-reveal]') ?? [];

      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          y: options.y ?? 60,
          x: options.x ?? 0,
          opacity: options.opacity ?? 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: options.duration ?? 0.9,
          stagger: options.stagger ?? 0.12,
          delay: options.delay ?? 0,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Parallax effect — element moves at a different rate from scroll.
 * speed: 0.1 = subtle, 0.4 = dramatic
 */
export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Horizontal scroll-scrub for text marquees or feature rows.
 */
export function useHorizontalReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('[data-h-reveal]');
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
