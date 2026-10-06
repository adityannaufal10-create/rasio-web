import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, Layers, Network, Waves } from "lucide-react";
import { CLUSTER_COLORS, CLUSTER_NAMES, COUNTRIES_44, CountryDot, FACTS } from "./facts";
import { clamp, easeInOut, easeOut, seg, useReducedMotion, useScrollProgress } from "./motion";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    step: 1,
    title: "44 Economies in Isolation",
    subtitle: "Domestically Centered Policy Paradigm",
    desc: "44 Asia-Pacific nations formulate unilateral NDC climate targets without accounting for spatial dependencies with contiguous neighbors.",
    badge: "2,816 Panel Observations",
    icon: Globe,
  },
  {
    step: 2,
    title: "5 Agrifood System Typologies",
    subtitle: "K-Means Clustering k=5 (Silhouette 0.5336)",
    desc: "Empirical partitioning proves 7 out of 10 ASEAN members concentrate within the Land Conversion Frontier cluster (Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Cambodia, Laos).",
    badge: "ARI Stability 0.973",
    icon: Layers,
  },
  {
    step: 3,
    title: "Deepening Spatial Clustering",
    subtitle: "Global Moran's I: +0.255 (1961) → +0.729 (2024)",
    desc: "The k-NN (k=4) spatial weights matrix reveals cross-border spatial autocorrelation surged nearly threefold over 64 years. Agrifood emissions are deeply clustered.",
    badge: "Moran's I = +0.729",
    icon: Network,
  },
  {
    step: 4,
    title: "Transboundary Spillover Decomposition",
    subtitle: "Spatial Durbin Model (SDM) LeSage–Pace",
    desc: "Transboundary N₂O fertilizer indirect spillovers (+1.1046) exceed direct domestic effects (+0.5011) by 2.20×. Uncoordinated policies inadvertently trigger carbon leakage.",
    badge: "Multiplier 1.61×",
    icon: Waves,
  },
] as const;

export default function TriageCanvas() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  const pRef = useRef(reduced ? 1 : 0);
  const [phaseIdx, setPhaseIdx] = useState(0);

  // Cluster center target coordinates relative to canvas width/height
  const getClusterTarget = (cluster: number, w: number, h: number) => {
    switch (cluster) {
      case 2: // Frontier Lahan (Center-Left focus)
        return { x: w * 0.35, y: h * 0.52 };
      case 4: // Padat Penduduk (Upper Center)
        return { x: w * 0.62, y: h * 0.35 };
      case 0: // Industri Mapan (Lower Right)
        return { x: w * 0.72, y: h * 0.68 };
      case 1: // Peternakan Ekstensif (Upper Left)
        return { x: w * 0.22, y: h * 0.28 };
      case 3: // Petro-Ekonomi (Upper Right)
        return { x: w * 0.82, y: h * 0.28 };
      default:
        return { x: w * 0.5, y: h * 0.5 };
    }
  };

  // Pre-seed pseudo-random initial positions for 44 countries
  const seeds = useRef(
    COUNTRIES_44.map((_, i) => ({
      rx: 0.15 + 0.7 * Math.sin(i * 137.5 + 42) * 0.5 + 0.35,
      ry: 0.2 + 0.65 * Math.cos(i * 92.3 + 19) * 0.5 + 0.32,
      vx: (Math.sin(i * 73) * 0.4),
      vy: (Math.cos(i * 51) * 0.4),
    })),
  );

  const draw = useCallback((p: number) => {
    pRef.current = p;
    const c = canvas.current;
    if (!c || !size.current.w) return;
    const ctx = c.getContext("2d")!;
    const { w, h, dpr } = size.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Phases interpolation factors
    const f1 = seg(p, 0.05, 0.25); // Chaos to Clustering
    const f2 = seg(p, 0.28, 0.52); // Clustering to Spatial Pull (lines)
    const f3 = seg(p, 0.55, 0.78); // Spatial Pull to Spillover
    const f4 = seg(p, 0.8, 0.98);  // Focus Indonesian Epicenter & Multiplier

    // Determine current phase index
    const currentPhase = p < 0.26 ? 0 : p < 0.54 ? 1 : p < 0.79 ? 2 : 3;
    setPhaseIdx(currentPhase);

    const positions: { x: number; y: number; c: CountryDot }[] = [];

    // Calculate positions
    COUNTRIES_44.forEach((country, i) => {
      const seed = seeds.current[i];
      // Base chaotic position
      const chaosX = seed.rx * w;
      const chaosY = seed.ry * h;

      // Cluster position (Phase 2 target)
      const target = getClusterTarget(country.cluster, w, h);
      // Small spread around target
      const spreadAngle = (i * 2.39996) % (Math.PI * 2);
      const spreadDist = 28 + (i % 6) * 14;
      const clustX = target.x + Math.cos(spreadAngle) * spreadDist;
      const clustY = target.y + Math.sin(spreadAngle) * spreadDist;

      // Interpolate from Chaos to Cluster
      let x = chaosX + (clustX - chaosX) * easeInOut(f1);
      let y = chaosY + (clustY - chaosY) * easeInOut(f1);

      // ASEAN pull together in Phase 3
      if (country.isAsean && f2 > 0) {
        const aseanFocus = { x: w * 0.38, y: h * 0.52 };
        const dX = (aseanFocus.x - x) * 0.25 * easeInOut(f2);
        const dY = (aseanFocus.y - y) * 0.25 * easeInOut(f2);
        x += dX;
        y += dY;
      }

      positions.push({ x, y, c: country });
    });

    // Phase 3 & 4: Draw spatial connection lines (k-NN nearest neighbors)
    if (f2 > 0.05) {
      ctx.lineWidth = 1.2;
      const lineAlpha = 0.35 * easeOut(f2) * (1 - 0.3 * f4);

      // Connect ASEAN-10 countries (especially Land Frontier)
      const aseanNodes = positions.filter((p) => p.c.isAsean);
      for (let i = 0; i < aseanNodes.length; i++) {
        for (let j = i + 1; j < aseanNodes.length; j++) {
          const n1 = aseanNodes[i];
          const n2 = aseanNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 180) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha * (1 - dist / 180)})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
    }

    // Phase 4: Draw Spillover Waves around Indonesia
    if (f3 > 0.1) {
      const indo = positions.find((p) => p.c.name === "Indonesia");
      if (indo) {
        const waveProgress = (p * 5) % 1;
        const waveAlpha = Math.sin(waveProgress * Math.PI) * 0.6 * f3;
        const maxR = 190 * f3;

        // Ripple 1
        ctx.strokeStyle = `rgba(239, 68, 68, ${waveAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(indo.x, indo.y, 45 + waveProgress * maxR, 0, Math.PI * 2);
        ctx.stroke();

        // Ripple 2 (Cyan N2O spillover)
        const wave2Progress = ((p * 5 + 0.5) % 1);
        const wave2Alpha = Math.sin(wave2Progress * Math.PI) * 0.7 * f3;
        ctx.strokeStyle = `rgba(6, 182, 212, ${wave2Alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(indo.x, indo.y, 25 + wave2Progress * maxR * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Draw Country Dots
    positions.forEach(({ x, y, c: country }) => {
      // Color transition from neutral slate to cluster color
      const baseCol = country.isAsean ? "#cbd5e1" : "#64748b";
      const clusterCol = CLUSTER_COLORS[country.cluster] || "#3b82f6";

      // Radius
      let radius = country.isAsean ? 6.5 : 4.5;
      if (country.name === "Indonesia") {
        radius = 8 + 4 * f3; // Indonesia grows as epicenter
      }

      // Dot color
      ctx.fillStyle = f1 > 0.1 ? clusterCol : baseCol;
      ctx.globalAlpha = country.isAsean ? 1 : 0.45 + 0.35 * (1 - f2);

      // Glow halo for ASEAN countries in phase 3 & 4
      if (country.isAsean && f2 > 0.2) {
        ctx.shadowBlur = 12 * f2;
        ctx.shadowColor = clusterCol;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring for ASEAN-10
      if (country.isAsean) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Labels for key countries when clustered
      if (f1 > 0.4 && (country.isAsean || country.highlight)) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = `${country.name === "Indonesia" ? "700 13px" : "600 11px"} "Plus Jakarta Sans", sans-serif`;
        ctx.fillText(country.name, x + radius + 6, y + 4);
      }
    });

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const el = stage.current;
    const c = canvas.current;
    if (!el || !c) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.current = { w: r.width, h: r.height, dpr };
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      draw(pRef.current);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    if (reduced) draw(1);
  }, [reduced, draw]);

  useScrollProgress(section, draw, "pin", !reduced);

  const curPhase = PHASES[phaseIdx];
  const Icon = curPhase.icon;

  return (
    <section
      id="triage"
      ref={section}
      aria-label="44-Economy Spatial Dynamics Simulation"
      className="relative border-t border-white/10"
      style={{ height: reduced ? "auto" : "420vh" }}
    >
      {/* Sticky container that stays pinned while user scrolls through 420vh */}
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-4 py-8 sm:px-8">
        {/* Top HUD Header */}
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between border-b border-white/10 pb-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
              Regional Spatial Dynamics Simulation · 44 Economies
            </span>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <div className="flex items-center gap-2 text-[12.5px] text-slate-400">
              <span className="size-2 rounded-full bg-red-500" />
              <span>Cluster 2 (Land Frontier: 7 ASEAN)</span>
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-slate-400">
              <span className="size-2 rounded-full bg-amber-500" />
              <span>Cluster 4 (High-Density Agrarian)</span>
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-slate-400">
              <span className="size-2 rounded-full bg-blue-500" />
              <span>Cluster 0 (Industrial)</span>
            </div>
          </div>

          {/* Phase indicator pills */}
          <div className="flex items-center gap-1.5 font-mono text-[12px]">
            {PHASES.map((p, idx) => (
              <span
                key={p.step}
                className={cn(
                  "grid size-6 place-items-center rounded-md font-semibold transition-all duration-300",
                  idx === phaseIdx
                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                    : idx < phaseIdx
                    ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border border-white/10 text-slate-500",
                )}
              >
                {p.step}
              </span>
            ))}
          </div>
        </div>

        {/* Central Canvas Viewport */}
        <div ref={stage} className="relative my-auto flex-1 h-full w-full min-h-[350px]">
          <canvas ref={canvas} className="absolute inset-0 block h-full w-full" />

          {/* Floating Live Metric Card on Phase 4 */}
          {phaseIdx >= 2 && (
            <div className="absolute right-4 top-6 hidden max-w-[280px] rounded-2xl border border-emerald-500/40 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl animate-fade-in md:block">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
                <span>SDM Spatial Coefficient</span>
                <span className="text-emerald-400 font-bold">p &lt; 0.001</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[28px] font-mono font-bold text-white tabular-nums">
                  {phaseIdx === 2 ? FACTS.moran2024 : FACTS.spilloverRatio}
                </span>
                <span className="text-[12px] font-semibold text-emerald-400">
                  {phaseIdx === 2 ? "Moran's I (2024)" : "Indirect Spillover"}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-300">
                {phaseIdx === 2
                  ? "Agrifood emissions exhibit powerful spatial clustering across Southeast Asia."
                  : "N₂O fertilizer spills 2.20× greater impact into neighboring economies."}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Narrative Banner */}
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="grid size-12 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Icon className="size-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase text-emerald-300">
                    Phase {curPhase.step} of 4 · {curPhase.badge}
                  </span>
                  <h3 className="text-[19px] font-bold text-white tracking-tight">{curPhase.title}</h3>
                </div>
                <p className="mt-1 text-[13px] font-medium text-emerald-400">{curPhase.subtitle}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-300">{curPhase.desc}</p>
              </div>

              <div className="hidden flex-col items-end gap-1.5 lg:flex">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Scroll to advance
                </span>
                <span className="flex items-center gap-1 text-[13px] font-semibold text-emerald-400">
                  {phaseIdx === 3 ? "Proceed to Evidence Wall" : `Advance to Phase ${phaseIdx + 2}`}
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
