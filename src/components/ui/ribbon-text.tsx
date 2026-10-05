import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ANGLE = 32;
const WAVE = 14;
const CLOCK0 = 20.75;
const FEATHER = 9;

// Emerald-cyan cyber-scientific gradients
const BANDS = [
  { hex: "#FFFFFF", from: 4.32, to: 33.18 },
  { hex: "#A7F3D0", from: 37.86, to: 58.14 }, // Emerald-200
  { hex: "#34D399", from: 58.86, to: 79.64 }, // Emerald-400
  { hex: "#06B6D4", from: 80, to: 100 },      // Cyan-500
];

const PHASE = [0.0, 1.7, 3.1, 4.6, 5.9, 2.3, 0.8, 3.9];

function gradient(ph: number, bands = BANDS) {
  const amp = (WAVE / 100) * 0.35 * 100;
  const c = CLOCK0 + ph * 1.2;
  const drift = (k: number) => amp * (Math.sin(c + PHASE[k]) - Math.sin(CLOCK0 + PHASE[k]));
  const seams = bands.slice(1).map((b, i) => (bands[i].to + b.from) / 2 + drift(i));
  const stops: string[] = [];
  bands.forEach((b, i) => {
    const from = i === 0 ? b.from : seams[i - 1] + FEATHER / 2;
    const to = i === bands.length - 1 ? b.to : seams[i] - FEATHER / 2;
    stops.push(`${b.hex} ${from.toFixed(3)}%`, `${b.hex} ${Math.max(to, from).toFixed(3)}%`);
  });
  return `linear-gradient(${ANGLE}deg, ${stops.join(", ")})`;
}

export function RibbonText({
  children,
  className,
  speed = 1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.backgroundImage = gradient(0, BANDS);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0,
      start = 0,
      visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    const tick = (now: number) => {
      if (!start) start = now;
      if (visible) el.style.backgroundImage = gradient(((now - start) / 1000) * speed, BANDS);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed]);

  return (
    <span
      ref={ref}
      className={cn(
        "block bg-clip-text text-transparent [-webkit-background-clip:text] [background-size:125%_125%] [background-position:0%_0%]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default RibbonText;
