// Ground theme: The "Pipo" mesh (Bloom Field, 21st.dev / Caliber style) adapted for GRAIN palette.
// Animated drifting radial blooms with fine film grain texture over deep obsidian canvas (#070b14).
// Offsets are anchored so offset = 0 at t = 0 (no snap on initial mount).
// Pauses when hidden or prefers-reduced-motion is active.

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Subtle analog tactile grain
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`;

export interface BloomConfig {
  rgb: string;
  x: number;
  y: number;
  r: number;
  alpha: number;
}

// GRAIN Color Palette Bloom Field:
// 1. Emerald (#10b981) - Primary Sustainable Agriculture Accent
// 2. Cyan (#06b6d4) - Spatial Connectivity & AWD Water Management
// 3. Deep Forest (#064e3b) - Grounding Vegetation Depth
// 4. Deep Ocean Teal (#0d9488) - Regional Hydro-Climatic Balance
// 5. Midnight Slate (#1e293b) - Atmospheric Contrast
const BLOOMS: BloomConfig[] = [
  { rgb: "16, 185, 129", x: 68.1, y: 38.0, r: 52.0, alpha: 0.35 }, // Emerald
  { rgb: "6, 182, 212", x: 24.5, y: 72.0, r: 54.0, alpha: 0.30 }, // Cyan
  { rgb: "6, 78, 59", x: 52.0, y: 15.0, r: 66.0, alpha: 0.45 }, // Deep Forest
  { rgb: "13, 148, 136", x: 84.0, y: 80.0, r: 46.0, alpha: 0.28 }, // Teal
  { rgb: "30, 41, 59", x: 36.0, y: 22.0, r: 60.0, alpha: 0.40 }, // Midnight Slate
];

const SEED = 42;
// A static phase per bloom hashed once from seed.
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + SEED * 78.233) * 43758.5453;
  return (v - Math.floor(v)) * Math.PI * 2;
};
const PHASE = BLOOMS.map((_, i) => [hash(i + 1), hash(i + 11)] as const);
const AMT = 0.72;

function frame(t: number, intensityMultiplier: number = 1.0) {
  const ph = t * 0.75; // Relaxed organic drift velocity
  const layers = BLOOMS.map((b, i) => {
    const [p, p2] = PHASE[i];
    // Offset is mathematically 0 at t = 0
    const x = b.x + (Math.sin(ph * 0.55 + p) - Math.sin(p)) * 14 * AMT;
    const y = b.y + (Math.sin(ph * 0.43 + p2) - Math.sin(p2)) * 14 * AMT;
    const s = (k: number) => `${(b.r * k).toFixed(3)}%`;
    const a = Math.min(1.0, b.alpha * intensityMultiplier);

    return `radial-gradient(circle at ${x.toFixed(3)}% ${y.toFixed(3)}%, rgba(${b.rgb}, ${a.toFixed(3)}) 0%, rgba(${b.rgb}, ${(a * 0.844).toFixed(3)}) ${s(0.25)}, rgba(${b.rgb}, ${(a * 0.5).toFixed(3)}) ${s(0.5)}, rgba(${b.rgb}, ${(a * 0.156).toFixed(3)}) ${s(0.75)}, rgba(${b.rgb}, 0) ${s(1)})`;
  });

  return `${GRAIN}, ${layers.join(", ")}`;
}

export function ThemeBackdrop({
  intensity = 1.0,
  className,
}: {
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.backgroundImage = frame(0, intensity);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;
    let last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      if (!start) start = now;
      if (now - last < 33) return; // ~30 fps cap for smooth low-power performance
      last = now;
      el.style.backgroundImage = frame((now - start) / 1000, intensity);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [intensity]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pipo-backdrop fixed inset-0 pointer-events-none z-0 transition-opacity duration-700",
        className
      )}
      style={{
        backgroundColor: "#070b14",
        backgroundSize: "120px 120px, auto, auto, auto, auto, auto",
        backgroundBlendMode: "overlay, normal, normal, normal, normal, normal",
      }}
    />
  );
}

export const PipoBackdrop = ThemeBackdrop;

/**
 * Quick toggle pill in the header showing active Pipo mesh status and allowing intensity toggling
 */
export function PipoThemeIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden lg:inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[12px] font-mono text-emerald-300 backdrop-blur-md shadow-[0_0_16px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20",
        className
      )}
      title="Tema Latar: Pipo Mesh (Caliber Bloom Field · Emerald & Cyan)"
    >
      <span className="relative flex size-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
      </span>
      <Sparkles className="size-3.5 text-emerald-400" />
      <span className="font-semibold text-white tracking-wide">Pipo Mesh</span>
      <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
        AKTIF
      </span>
    </div>
  );
}

export default ThemeBackdrop;
