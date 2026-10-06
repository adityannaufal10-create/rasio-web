import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Compass, FileCheck, Layers, Menu, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Gauge } from "@/components/ui/gauge";
import { RibbonText } from "@/components/ui/ribbon-text";
import { StatTile } from "@/components/ui/stat-tile";
import { FACTS } from "./facts";
import { useReducedMotion, useScrollProgress } from "./motion";
import TriageCanvas from "./TriageCanvas";
import EvidenceWall from "./EvidenceWall";
import WorkflowRail from "./WorkflowRail";
import WhyGrainSection from "./WhyGrainSection";
import InstrumentShowcase from "./InstrumentShowcase";
import { FluxVortex } from "@/components/ui/flux-vortex";
import { CinematicFooter } from "@/components/ui/cinematic-footer";
import { cn } from "@/lib/utils";

const WORKSPACE_URL = "/clustering";

const NAV = [
  { href: "#problem", label: "Paradoks Emisi" },
  { href: "#why-grain", label: "Urgensi Spasial" },
  { href: "#triage", label: "Simulasi Spasial" },
  { href: "#evidence", label: "Bukti Empiris" },
  { href: "#workflow", label: "Alur Prototype" },
  { href: "#inside", label: "Instrumen Live" },
];

function jump(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id.slice(1))?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function HeroSVGSchematic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 450" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" fill="none">
        {/* Abstract topographic lines & meridian grid */}
        <path d="M0 420 Q400 380 800 410 T1600 390" />
        <path d="M0 360 Q350 310 800 350 T1600 320" opacity="0.6" />
        <path d="M0 300 Q450 250 800 290 T1600 260" opacity="0.4" />
        <path d="M0 240 Q400 190 800 230 T1600 200" opacity="0.2" />

        {/* Abstract network nodes */}
        <circle cx="480" cy="330" r="4" fill="#ef4444" />
        <circle cx="560" cy="300" r="3" fill="#10b981" />
        <circle cx="680" cy="350" r="5" fill="#ef4444" />
        <circle cx="820" cy="320" r="7" fill="#ef4444" />
        <circle cx="940" cy="340" r="3" fill="#10b981" />

        {/* Spatial links */}
        <line x1="480" y1="330" x2="680" y2="350" strokeDasharray="4 4" stroke="#06b6d4" opacity="0.5" />
        <line x1="680" y1="350" x2="820" y2="320" strokeDasharray="4 4" stroke="#06b6d4" opacity="0.7" />
        <line x1="820" y1="320" x2="940" y2="340" strokeDasharray="4 4" stroke="#06b6d4" opacity="0.5" />
      </g>
    </svg>
  );
}

export function LandingPage({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useScrollProgress(heroRef, undefined, "exit", !reduced);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 3D Quantum Particle Vortex Dynamic Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <FluxVortex speed={0.7} opacity={0.7} />
      </div>

      {/* Navigation Header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl py-3.5 shadow-2xl"
            : "bg-transparent py-5 border-b border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-8">
          {/* Logo brand */}
          <a
            href="/"
            className="flex items-center gap-3 no-underline group"
            aria-label="GRAIN Beranda"
          >
            <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Compass className="size-5 text-slate-950 font-bold" strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[18px] tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  GRAIN
                </span>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/30 px-1 py-0.2 font-mono text-[10px] font-bold text-emerald-400">
                  ASEAN
                </span>
              </div>
              <span className="block font-mono text-[10px] text-slate-400 tracking-wider">
                TIM IRIS · RASIO 10.0
              </span>
            </div>
          </a>

          {/* Centered navigation links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi Utama">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => jump(e, n.href)}
                className="text-[14px] font-medium text-slate-300 hover:text-emerald-400 transition-colors no-underline"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-1.5 text-[13px] text-slate-400 hover:border-emerald-500/40 hover:text-white transition-all backdrop-blur-md"
              >
                <Search className="size-3.5" />
                <span>Cari…</span>
                <kbd className="rounded border border-white/10 bg-slate-800 px-1 font-mono text-[10px]">Ctrl+K</kbd>
              </button>
            )}

            <a
              href={WORKSPACE_URL}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-[13.5px] font-bold text-slate-950 no-underline shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
            >
              Masuk Prototype
              <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#070b14]/95 px-6 pb-6 pt-3 backdrop-blur-2xl lg:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  jump(e, n.href);
                  setMenuOpen(false);
                }}
                className="block py-2.5 text-[15px] font-medium text-slate-300 hover:text-emerald-400 no-underline"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href={WORKSPACE_URL}
                className="flex h-11 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950 no-underline"
              >
                Masuk Prototype Workspace
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="lp-hero relative isolate overflow-hidden pt-36 sm:pt-44 pb-20"
        aria-labelledby="hero-title"
      >
        {/* Background Parallax Line Graphic */}
        <div className="lp-far pointer-events-none absolute inset-x-0 top-[25%] -z-20 h-[50vh]">
          <HeroSVGSchematic className="h-full w-full" />
        </div>

        {/* Atmospheric Glow */}
        <div className="lp-glow pointer-events-none absolute left-1/2 top-[25%] -z-10 h-[70vh] w-[min(1200px,130vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,185,129,0.22),rgba(6,182,212,0.08)_55%,transparent)]" />

        <div className="lp-copy relative z-10 mx-auto flex max-w-[1040px] flex-col items-center px-4 text-center sm:px-8">
          {/* Announcement pill */}
          <a
            href="#triage"
            onClick={(e) => jump(e, "#triage")}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] text-emerald-300 backdrop-blur-md transition-all hover:border-emerald-500/60 hover:bg-emerald-500/20 no-underline"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold">Padjadjaran Statistics Olympiad 10.0 · Statistics Day 2026</span>
            <span className="flex items-center gap-1 text-white font-mono text-[11px]">
              Lihat Simulasi Spasial <ArrowRight className="size-3" />
            </span>
          </a>

          {/* Main Provocative Headline with RibbonText */}
          <h1
            id="hero-title"
            className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-extrabold tracking-tight leading-[1.05] text-white [text-wrap:balance]"
          >
            <RibbonText className="pb-2">Emisi Pangan Tidak Berhenti di Garis Batas.</RibbonText>
          </h1>

          {/* Subtitle with empirical contrast */}
          <p className="mt-6 max-w-[66ch] text-[clamp(1.05rem,1.4vw,1.22rem)] leading-relaxed text-slate-300 [text-wrap:pretty]">
            ASEAN menyumbang <strong className="text-white font-semibold">22,78% emisi alih guna lahan dunia</strong> meski hanya memikul 7,44% total GRK. Pendekatan mitigasi iklim yang terisolasi di tingkat nasional memicu kebocoran karbon ke negara tetangga.
          </p>

          {/* Hero CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WORKSPACE_URL}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 text-[15.5px] font-bold text-slate-950 no-underline shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all hover:bg-emerald-400 hover:scale-[1.03] active:scale-[0.98]"
            >
              Buka Prototype Workspace
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#triage"
              onClick={(e) => jump(e, "#triage")}
              className="inline-flex h-12 items-center rounded-xl border border-white/15 bg-slate-900/60 px-6 text-[15px] font-semibold text-slate-300 no-underline backdrop-blur-md transition-all hover:border-emerald-500/40 hover:text-white"
            >
              Telusuri Simulasi 44 Negara
            </a>
          </div>
        </div>

        {/* Product Workspace Preview Frame with BorderBeam */}
        <div className="lp-frame-wrap relative z-0 mx-auto mt-16 w-[min(1220px,94vw)] pb-16">
          <figure className="lp-frame relative m-0 rounded-2xl border border-white/10 bg-slate-900/90 p-2 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(16,185,129,0.25)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-slate-950/70 rounded-t-xl" aria-hidden="true">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-[11.5px] text-slate-400">
                  grain-web · Ekonometrika Spasial Sistem Pangan ASEAN · Panel 1961–2024
                </span>
              </div>
              <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                SDM TIME-FIXED EFFECTS AIC 4.752,0
              </span>
            </div>

            {/* Embedded interactive preview illustration */}
            <div className="relative overflow-hidden rounded-b-xl bg-slate-950 p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Visual mock 1: Map preview badge */}
                <Card className="bg-slate-900/80 border-white/10 hover:border-emerald-500/30 transition-all">
                  <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-[13px] font-semibold text-slate-200">Peta Tematik Spasial</CardTitle>
                    <span className="font-mono text-xs font-bold text-emerald-400">4 Layer Aktif</span>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <div className="flex items-center justify-center h-28 rounded-xl bg-slate-950/80 border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                      <span className="font-mono text-[13px] text-emerald-300 z-10 flex items-center gap-2">
                        <Compass className="size-4 text-emerald-400" />
                        Asia-Pasifik 44 Negara
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Visual mock 2: Moran's I gauge */}
                <Card className="bg-slate-900/80 border-white/10 hover:border-cyan-500/30 transition-all">
                  <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-[13px] font-semibold text-slate-200">Autokorelasi Spasial</CardTitle>
                    <span className="font-mono text-xs font-bold text-cyan-400">Moran's I 2024</span>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <Gauge
                      value={0.729}
                      min={-0.2}
                      max={1.0}
                      warning={0.3}
                      critical={0.6}
                      className="max-w-[170px] mx-auto mt-2"
                    />
                  </CardContent>
                </Card>

                {/* Visual mock 3: LeSage-Pace multiplier */}
                <Card className="bg-slate-900/80 border-white/10 hover:border-purple-500/30 transition-all">
                  <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-[13px] font-semibold text-slate-200">Efek Limpahan LeSage-Pace</CardTitle>
                    <span className="font-mono text-xs font-bold text-purple-400">Pupuk N₂O</span>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                        <span>Limpahan Tak Langsung</span>
                        <span className="text-cyan-400 font-bold">+1,1046 (2,20×)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 mt-1">
                        <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ width: "69%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                        <span>Efek Domestik</span>
                        <span className="text-slate-200">+0,5011</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 mt-1">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <BorderBeam size={280} duration={14} borderWidth={1.5} colorFrom="#10b981" colorTo="#06b6d4" />
          </figure>

          {/* Floating Inspection Case Tag (Like Caliber's brand tag) */}
          <div className="lp-near pointer-events-none absolute -top-10 right-[3%] z-20 hidden lg:block" aria-hidden="true">
            <div className="lp-cord mx-auto h-[80px] w-[2px] bg-gradient-to-b from-emerald-500/20 to-emerald-500/60" />
            <div className="lp-tag -mt-1" style={{ ["--w" as string]: "200px" }}>
              <div className="lp-tag-band is-emerald">Audit Ekonometrika</div>
              <span className="lp-tag-hole" />
              <div className="lp-tag-body">
                <div className="lp-tag-name">Indonesia</div>
                <div className="lp-tag-line">Klaster Frontier Konversi</div>
                <div className="lp-tag-sign">
                  <span className="lp-stamp red">12,57% Emisi Dunia</span>
                  <span className="lp-stamp cyan">Episentrum Spasial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEDGER SECTION: 5 KEY EMPIRICAL STATS */}
      <section id="problem" className="relative mx-auto max-w-[1320px] px-4 py-20 sm:px-8 border-t border-white/10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Paradoks Emisi & Kebocoran Karbon</span>
            </div>
            <h2 className="mt-3 text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold tracking-tight text-white leading-tight">
              Regresi Tradisional Gagal. Kebijakan Domestik Menumpahkan Beban ke Tetangga.
            </h2>
          </div>
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-300">
            <p>
              Riset iklim konvensional memperlakukan negara sebagai entitas yang saling independen. Padahal, saat satu negara memberlakukan moratorium deforestasi atau memangkas subsidi pupuk, aktivitas agribisnis bergeser melintasi perbatasan kawasan.
            </p>
            <p>
              Data membuktikan secara tegas: korelasi peringkat Spearman antara emisi per kapita dengan pangsa emisi global mendekati nol (<strong>0,008</strong>). Negara penentu iklim bukanlah negara dengan emisi per kapita tertinggi, melainkan episentrum alih guna lahan kawasan.
            </p>
          </div>
        </div>

        {/* 5 Empirical Stat Tiles */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatTile
            label="Cakupan Data"
            value={FACTS.countries}
            unit="Negara"
            subtext="Asia-Pasifik 1961–2024"
            badge="Panel Seimbang"
            tone="default"
          />
          <StatTile
            label="Total Observasi"
            value={FACTS.observations}
            subtext="64 Tahun Beruntun"
            badge="0 Missing"
            tone="emerald"
          />
          <StatTile
            label="Pangsa LUC ASEAN"
            value={FACTS.globalLUCShare}
            subtext="Dari total emisi lahan dunia"
            badge="Ketimpangan"
            tone="crimson"
          />
          <StatTile
            label="Moran's I (2024)"
            value={FACTS.moran2024}
            subtext="Naik dari +0,255 (1961)"
            badge="p < 0.001"
            tone="cyan"
          />
          <StatTile
            label="Rasio Limpahan N₂O"
            value={FACTS.spilloverRatio}
            subtext="Tak langsung vs domestik"
            badge="SDM Model"
            tone="amber"
          />
        </div>
      </section>

      {/* WHY GRAIN: PARADOKS & URGENSI SPASIAL (OPTION B) */}
      <WhyGrainSection />

      {/* 44-COUNTRY SCROLL-PINNED CANVAS SIMULATION */}
      <TriageCanvas />

      {/* 3D-TILTED EVIDENCE CONVEYOR BELT */}
      <EvidenceWall />

      {/* HORIZONTAL WORKFLOW RAIL (6 ANALYTICAL MODULES) */}
      <WorkflowRail />

      {/* LIVE INSTRUMENTS PREVIEW (OPTION A) */}
      <InstrumentShowcase />

      {/* RESEARCH STAMP & FINAL WORKSPACE ENTRY CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-28 bg-gradient-to-b from-transparent to-slate-950/80">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-12 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[700px]">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              Solusi Teruji · Terbuka Penuh
            </span>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold tracking-tight leading-tight text-white">
              Masuk ke Ruang Kendali Prototype GRAIN.
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-slate-300">
              Eksplorasi seluruh peta interaktif, uji regresi ekonometrika spasial, jalankan simulasi kebijakan regional, dan teliti peramalan metana 10 tahun ke depan.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={WORKSPACE_URL}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 text-[16px] font-bold text-slate-950 no-underline shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all hover:bg-emerald-400 hover:scale-[1.03] active:scale-[0.98]"
              >
                Buka Prototype Sekarang
                <ArrowRight className="size-5" />
              </a>
              <a
                href="/metodologi"
                className="inline-flex h-12 items-center rounded-xl border border-white/15 bg-slate-900/60 px-6 text-[15px] font-semibold text-slate-300 no-underline hover:border-emerald-500/40 hover:text-white transition-all"
              >
                Baca Dokumentasi Metodologi
              </a>
            </div>
          </div>

          {/* Research Credential Stamp */}
          <Card className="p-6 shadow-2xl backdrop-blur-xl rotate-1 self-center lg:self-auto max-w-[340px] border-emerald-500/40 bg-slate-900/90 hover:rotate-0 transition-transform duration-300">
            <CardHeader className="p-0 pb-3 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
              <span className="font-mono text-[11px] font-semibold uppercase text-emerald-400">
                Sertifikasi Model
              </span>
              <FileCheck className="size-4 text-emerald-400" />
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-2.5 text-[12.5px]">
              <div className="flex justify-between text-slate-300">
                <span>Spesifikasi:</span>
                <span className="font-mono text-white font-semibold">SDM Time-FE</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Nilai AIC:</span>
                <span className="font-mono text-emerald-400 font-bold">{FACTS.sdmAic}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Matriks W:</span>
                <span className="font-mono text-white">k-NN (k=4)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Validasi Peramalan:</span>
                <span className="font-mono text-white">2.904 Fold CV</span>
              </div>
            </CardContent>
            <CardFooter className="p-0 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>GRAIN · TIM IRIS</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* GRAND FINALE: CINEMATIC CURTAIN REVEAL FOOTER */}
      <CinematicFooter />
    </div>
  );
}

export default LandingPage;
