import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms
  className?: string;
}

/**
 * Scroll-triggered animated number counter.
 * Uses IntersectionObserver so it fires once when the element enters view.
 */
export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const startVal = 0;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + eased * (target - startVal)));
      if (progress < 1) requestAnimationFrame(step);
    }

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ animation: started ? 'counter-in 0.5s ease forwards' : undefined }}
    >
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}
