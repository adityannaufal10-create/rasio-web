import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Calculator, Database, MapPin, Network, TrendingUp } from "lucide-react";
import { WORKFLOW_PANELS } from "./facts";
import { useReducedMotion, useScrollProgress } from "./motion";
import { cn } from "@/lib/utils";

const ICONS = [MapPin, Database, Network, Calculator, TrendingUp, BarChart3];

export default function WorkflowRail() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 : true));

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pinned = wide && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const setTravel = () => {
      const r = rail.current;
      const s = section.current;
      if (r && s) {
        const travelDistance = Math.max(0, r.scrollWidth - window.innerWidth + 80);
        s.style.setProperty("--travel", `${travelDistance}px`);
      }
    };
    setTravel();
    window.addEventListener("resize", setTravel);
    return () => window.removeEventListener("resize", setTravel);
  }, [pinned]);

  useScrollProgress(section, undefined, "pin", pinned);

  return (
    <section
      id="workflow"
      ref={section}
      aria-label="6-Module Analytical Pipeline"
      className="relative border-t border-white/10"
      style={{ height: pinned ? "360vh" : "auto" }}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-12" : "py-24"}>
        {/* Section Intro */}
        <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 sm:px-8">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Narrative Arc & Analytical Architecture</span>
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold tracking-tight text-white leading-tight">
            Six Solution Pillars, One Harmonized Regional Framework.
          </h2>
          <p className="mt-3 max-w-[68ch] text-[15.5px] leading-relaxed text-slate-400">
            The prototype architecture is constructed hierarchically: from empirical typology mapping and spatial econometric verification to policy intervention simulators accounting for transboundary spillover multipliers.
          </p>
        </div>

        {/* Horizontal Track (pinned on desktop) or Vertical list on mobile */}
        <div
          ref={rail}
          className={cn(
            pinned
              ? "lp-rail flex gap-8 pl-[max(2rem,calc((100vw-1320px)/2+2rem))] pr-16 will-change-transform"
              : "mx-auto flex max-w-[880px] flex-col gap-10 px-4 sm:px-8",
          )}
        >
          {WORKFLOW_PANELS.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article
                key={step.id}
                className={cn(
                  "group flex shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/90 p-7 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-950/20",
                  pinned ? "w-[min(620px,50vw)]" : "w-full",
                )}
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 font-mono text-[16px] font-bold text-emerald-400">
                        0{step.num}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          {step.role}
                        </span>
                        <h3 className="text-[20px] font-bold text-white tracking-tight">{step.title}</h3>
                      </div>
                    </div>
                    <Icon className="size-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  {/* Body description */}
                  <p className="mt-5 text-[14.5px] leading-relaxed text-slate-300">{step.description}</p>

                  {/* Scientific Metric Badge */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Scientific Benchmark
                    </span>
                    <span className="mt-0.5 block font-mono text-[13.5px] font-bold text-emerald-300">
                      {step.metrics}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[12.5px] text-slate-400">Interactive Module</span>
                  <a
                    href={step.path}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2 text-[13.5px] font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {step.actionText}
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
