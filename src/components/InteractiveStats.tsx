/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";

interface StatItemProps {
  target: number;
  label: string;
  suffix?: string;
}

function Counter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="font-serif">
      {count}
    </span>
  );
}

export default function InteractiveStats({ stats }: { stats: { projectsDone: number; skillsCount: number; yearsLearning: number } }) {
  return (
    <div className="grid grid-cols-3 gap-6 md:gap-10 pt-10 border-t border-luxury-stone/50 font-sans">
      <div className="space-y-1">
        <div className="text-3xl md:text-5xl font-light text-luxury-charcoal">
          <Counter target={stats.projectsDone} />
          <span className="text-luxury-sage font-light text-2xl md:text-3xl ml-0.5">✦</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-luxury-charcoal/50 font-medium">
          Projects Done
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-3xl md:text-5xl font-light text-luxury-charcoal">
          <Counter target={stats.skillsCount} />
          <span className="text-luxury-sage font-light text-2xl md:text-3xl ml-0.5">+</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-luxury-charcoal/50 font-medium">
          Key Verticals
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-3xl md:text-5xl font-light text-luxury-charcoal">
          <Counter target={stats.yearsLearning} />
          <span className="text-luxury-sage font-light text-xl md:text-2xl ml-0.5">Yrs</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-luxury-charcoal/50 font-medium">
          Constant Growth
        </div>
      </div>
    </div>
  );
}
