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
  const [wide, setWide] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 && window.innerHeight >= 760 : true));

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
      className="relative border-t border-black/10"
      style={{ height: pinned ? "360vh" : "auto" }}
    >
      <div className={pinned ? "sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden py-12" : "py-24"}>
        {/* Section Intro */}
        <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 sm:px-8">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-neutral-800">
            <span className="size-2 rounded-full bg-emerald-400 " />
            <span>Narrative Arc & Analytical Architecture</span>
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold tracking-tight text-neutral-950 leading-tight">
            Six Solution Pillars, One Harmonized Regional Framework.
          </h2>
          <p className="mt-3 max-w-[68ch] text-[15.5px] leading-relaxed text-neutral-600">
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
                  "grain-feature-card group flex shrink-0 flex-col justify-between rounded-xl border border-black/10 bg-surface p-6 transition-colors duration-200 hover:border-neutral-300",
                  pinned ? "w-[min(620px,50vw)]" : "w-full",
                )}
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl border border-black/10 bg-grain-mist font-mono text-[16px] font-bold text-neutral-800">
                        0{step.num}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                          {step.role}
                        </span>
                        <h3 className="text-[20px] font-medium text-neutral-950 tracking-tight">{step.title}</h3>
                      </div>
                    </div>
                    <span className="grain-card-symbol"><Icon size={20} strokeWidth={1.7} /></span>
                  </div>

                  {/* Body description */}
                  <p className="mt-5 text-[14.5px] leading-relaxed text-neutral-700">{step.description}</p>

                  {/* Scientific Metric Badge */}
                  <div className="mt-6 rounded-xl border border-black/10 bg-neutral-100/50 px-4 py-3">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-600">
                      Scientific Benchmark
                    </span>
                    <span className="mt-0.5 block font-mono text-[13.5px] font-bold text-neutral-800">
                      {step.metrics}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[12.5px] text-neutral-600">Interactive Module</span>
                  <a
                    href={step.path}
                    className="inline-flex items-center gap-2 rounded-xl bg-grain-mist border border-black/10 px-4 py-2 text-[13.5px] font-semibold text-neutral-800 transition-all hover:bg-grain-blue hover:text-white hover:shadow-lg hover:shadow-black/5"
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
