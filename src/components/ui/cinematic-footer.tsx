"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BookOpen, Compass, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR GRAIN & RASIO 10.0
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #070b14;
  color: #f8fafc;
  
  /* Dynamic Variables using GRAIN Emerald & Cyan tokens */
  --pill-bg-1: rgba(255, 255, 255, 0.04);
  --pill-bg-2: rgba(255, 255, 255, 0.015);
  --pill-shadow: rgba(0, 0, 0, 0.6);
  --pill-highlight: rgba(255, 255, 255, 0.08);
  --pill-inset-shadow: rgba(0, 0, 0, 0.9);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(16, 185, 129, 0.14);
  --pill-bg-2-hover: rgba(6, 182, 212, 0.06);
  --pill-border-hover: rgba(16, 185, 129, 0.5);
  --pill-shadow-hover: rgba(16, 185, 129, 0.3);
  --pill-highlight-hover: rgba(255, 255, 255, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.6)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background with Emerald Accent */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow with Emerald & Cyan */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(16, 185, 129, 0.22) 0%, 
    rgba(6, 182, 212, 0.12) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

/* Giant Background Text Masking for GRAIN */
.footer-giant-bg-text {
  font-size: clamp(240px, 36vw, 700px);
  line-height: 0.72;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 2px rgba(16, 185, 129, 0.28);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 75%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(203, 213, 225, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px rgba(16, 185, 129, 0.3));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (GSAP Elastic Physics)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as unknown as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. DIAGONAL SLEEK MARQUEE ITEM (GRAIN Context)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-white">GRAIN PLATFORM</span> <span className="text-emerald-400">✦</span>
    <span>44 NEGARA ASIA-PASIFIK</span> <span className="text-cyan-400">✦</span>
    <span>64 TAHUN PANEL SEIMBANG</span> <span className="text-emerald-400">✦</span>
    <span>5 KLASTER TIPOLOGI PANGAN</span> <span className="text-cyan-400">✦</span>
    <span>GLOBAL MORAN'S I +0,729</span> <span className="text-emerald-400">✦</span>
    <span>SPATIAL DURBIN MODEL (SDM)</span> <span className="text-cyan-400">✦</span>
    <span>EFEK LIMPAHAN N₂O 2,20×</span> <span className="text-emerald-400">✦</span>
    <span>2.904 FOLD WALK-FORWARD CV</span> <span className="text-cyan-400">✦</span>
    <span className="text-emerald-300">TIM IRIS | RASIO 10.0</span> <span className="text-emerald-400">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax for Giant Text "GRAIN"
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        Sits in page flow. Because it has clipPath, its fixed contents
        are ONLY visible within its bounding box as the user scrolls.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to viewport underneath */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#070b14] text-slate-100 cinematic-footer-wrapper">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background watermark text: GRAIN (Raised & Enlarged) */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-[5vh] md:bottom-[7vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none tracking-tighter"
          >
            GRAIN
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer, positioned cleanly below navbar) */}
          <div className="absolute top-16 md:top-20 left-0 w-full overflow-hidden border-y border-white/10 bg-[#070b14]/80 backdrop-blur-md py-3.5 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-slate-400 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content (Elevated for optimal vertical composition) */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-10 md:mt-12 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tight mb-4 text-center"
            >
              Siap Menjelajahi GRAIN?
            </h2>

            <p className="max-w-2xl text-center text-sm md:text-base text-slate-300 font-light mb-10 leading-relaxed">
              Buka ruang kendali ekonometrika spasial, telusuri 5 tipologi klaster pangan, dan jalankan simulasi mitigasi kebocoran karbon regional Asia-Pasifik.
            </p>

            {/* Interactive Magnetic Pills: 2 Primary Buttons + Secondary Links */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              
              {/* 2 Primary Magnetic Action Buttons */}
              <div className="flex flex-wrap justify-center gap-5 w-full">
                <MagneticButton
                  as="a"
                  href="/clustering"
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 shadow-[0_0_30px_rgba(16,185,129,0.25)] no-underline"
                >
                  <Compass className="size-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
                  <span>Buka Prototype Workspace</span>
                  <ArrowUpRight className="size-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="/metodologi"
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-slate-200 font-bold text-sm md:text-base flex items-center gap-3 group border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] no-underline"
                >
                  <BookOpen className="size-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>Dokumentasi Metodologi</span>
                  <ArrowUpRight className="size-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>
              </div>

              {/* Secondary Navigation Pills */}
              <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-2">
                <MagneticButton as="a" href="/clustering" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-emerald-300 no-underline">
                  Peta 5 Klaster
                </MagneticButton>
                <MagneticButton as="a" href="/spasial" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-emerald-300 no-underline">
                  Ekonometrika Spasial
                </MagneticButton>
                <MagneticButton as="a" href="/simulator" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-emerald-300 no-underline">
                  Simulator Kebijakan
                </MagneticButton>
                <MagneticButton as="a" href="/forecasting" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-emerald-300 no-underline">
                  Peramalan Metana 2025–2035
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits (Tim IRIS | Rasio 10.0) */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-slate-400 text-[11px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 font-mono">
              © 2026 Tim IRIS | Rasio 10.0
            </div>

            {/* Center Badge: Tim IRIS | Rasio 10.0 */}
            <div className="footer-glass-pill px-6 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-emerald-500/30">
              <span className="text-emerald-400 text-[11px] md:text-xs font-bold uppercase tracking-wider font-mono">
                Tim IRIS | Rasio 10.0
              </span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="size-11 rounded-full footer-glass-pill flex items-center justify-center text-slate-400 hover:text-emerald-400 group order-3 border-white/10"
            >
              <ChevronUp className="size-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
