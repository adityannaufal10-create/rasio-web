import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { ThemeControl, useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight, Compass, Database, FileCheck, Layers, Menu, Network, Search, Sliders, TrendingUp, X } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { StatTile } from "@/components/ui/stat-tile";
import { FACTS, COUNTRIES_44, CLUSTER_COLORS } from "./facts";
import { useReducedMotion } from "./motion";
import TriageCanvas from "./TriageCanvas";
import EvidenceWall from "./EvidenceWall";
import WorkflowRail from "./WorkflowRail";
import WhyGrainSection from "./WhyGrainSection";
import InstrumentShowcase from "./InstrumentShowcase";
import { CinematicFooter } from "@/components/ui/cinematic-footer";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#problem", label: "The problem" },
  { href: "#why-grain", label: "Why GRAIN" },
  { href: "#triage", label: "Spatial story" },
  { href: "#evidence", label: "Evidence" },
  { href: "#workflow", label: "The toolkit" },
  { href: "#inside", label: "Live instruments" },
];
const MODULES = [
  { path: "/clustering", label: "Cartography", detail: "44 economies. Five typologies.", icon: Layers },
  { path: "/spasial", label: "Spatial econometrics", detail: "See the cross-border connection.", icon: Network },
  { path: "/simulator", label: "Policy simulator", detail: "Explore coordinated action.", icon: Sliders },
  { path: "/forecasting", label: "Methane forecasting", detail: "Look ahead to 2035.", icon: TrendingUp },
  { path: "/metodologi", label: "Methodology", detail: "Inspect every assumption.", icon: BookOpen },
];
const HERO_CONFIG = {
  dark: 0,
  phi: 1.8,
  theta: 0.3,
  diffuse: 1.4,
  mapBrightness: 5,
  baseColor: [0.88, 0.91, 0.9] as [number, number, number],
  glowColor: [0.95, 0.96, 0.95] as [number, number, number],
  markerColor: [0.02, 0.48, 0.35] as [number, number, number],
  markers: COUNTRIES_44.map(c => {
    const hex = CLUSTER_COLORS[c.cluster];
    return {
      location: [c.lat, c.lon] as [number, number],
      size: c.isAsean ? 0.045 : 0.022,
      color: [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16) / 255) as [number, number, number],
    };
  }),
};

function jump(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id.slice(1))?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export function LandingPage({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { isDark } = useTheme();
  const globeConfig = useMemo(() => ({ ...HERO_CONFIG, dark: isDark ? 1 : 0, mapBrightness: isDark ? 2.2 : 5,
    baseColor: (isDark ? [.1, .11, .14] : [.88, .91, .94]) as [number, number, number],
    glowColor: (isDark ? [.12, .14, .19] : [.95, .96, .98]) as [number, number, number],
  }), [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="grain-landing">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className={cn("grain-nav", scrolled && "is-scrolled")}>
        <div className="grain-nav-inner">
          <Link to="/" className="grain-brand" aria-label="GRAIN Homepage">
            <Compass size={26} strokeWidth={1.7} />
            <span>GRAIN<span className="grain-brand-region">ASEAN</span></span>
          </Link>
          <nav className="grain-nav-links" aria-label="Main navigation">
            {NAV.map(n => <a key={n.href} href={n.href} onClick={e => jump(e, n.href)}>{n.label}</a>)}
          </nav>
          <div className="grain-nav-actions">
            <ThemeControl />
            {onOpenCommandPalette && <button type="button" className="icon-button" onClick={onOpenCommandPalette} aria-label="Search GRAIN" title="Search GRAIN (Ctrl+K)"><Search size={19} /></button>}
            <Link to="/clustering" className="grain-button small">Explore GRAIN <ArrowRight size={14} /></Link>
            <button type="button" className="icon-button grain-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="landing-menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav id="landing-menu" className="grain-mobile-menu" aria-label="Mobile navigation">
          {NAV.map(n => <a key={n.href} href={n.href} onClick={e => { jump(e, n.href); setMenuOpen(false); }}>{n.label}<ChevronRight size={16} /></a>)}
          <Link to="/clustering" onClick={() => setMenuOpen(false)}>Explore the workspace<ArrowRight size={16} /></Link>
        </nav>}
      </header>

      <main id="main-content">
        <section className="grain-hero" aria-labelledby="hero-title">
          <div className="grain-hero-copy">
            <h1 id="hero-title">Agrifood emissions.<br /><span>Beyond borders.</span></h1>
            <p>ASEAN contributes <strong>{FACTS.globalLUCShare} of global land-use emissions</strong> despite producing just {FACTS.globalGHGShare} of total greenhouse gases. Explore the connections that national policies alone cannot see.</p>
            <div className="grain-hero-actions">
              <Link to="/clustering" className="grain-button">Explore the workspace <ArrowRight size={17} /></Link>
              <a href="#triage" className="grain-text-link" onClick={e => jump(e, "#triage")}>Follow the spatial story <ChevronRight size={17} /></a>
            </div>
            <p className="grain-hero-credit">TEAM IRIS · RASIO 10.0<br />Padjadjaran Statistics Olympiad · Statistics Day 2026</p>
          </div>
          <figure className="grain-hero-visual">
            <Globe config={globeConfig} reducedMotion={reduced} />
            <figcaption><span className="grain-status-dot" />44 Asia-Pacific economies · 10 ASEAN members<span className="grain-hero-hint">Drag to explore the globe</span></figcaption>
          </figure>
        </section>

        <nav className="grain-module-strip" aria-label="Explore analytical modules">
          {MODULES.map(({ path, label, detail, icon: Icon }) => <Link key={path} to={path} className="grain-module">
            <span className="grain-module-symbol"><Icon size={29} strokeWidth={1.45} /></span>
            <span className="grain-module-name">{label}</span><span className="grain-module-detail">{detail}</span>
          </Link>)}
        </nav>

        <section id="problem" className="grain-section grain-problem">
          <div className="grain-section-heading">
            <h2>The emission paradox.<br /><span>A regional problem.</span></h2>
            <p>Conventional climate research treats sovereign nations as independent spatial units. Yet when one nation enacts deforestation moratoria or rationalizes fertilizer subsidies, agribusiness supply chains displace activity across contiguous regional borders.</p>
          </div>
          <div className="grain-problem-feature">
            <div className="grain-paradox-comparison">
              <div><strong>{FACTS.globalLUCShare}</strong><span>Global land-use emissions</span><div className="grain-comparison-track"><i style={{ width: "100%" }} /></div></div>
              <div><strong>{FACTS.globalGHGShare}</strong><span>Total global greenhouse gases</span><div className="grain-comparison-track"><i style={{ width: "32.66%" }} /></div></div>
              <p>ASEAN's share of global emissions</p>
            </div>
            <div className="grain-problem-insight">
              <h3>Local intensity doesn't tell the whole story.</h3>
              <p>The Spearman rank correlation between per capita emissions and global emission share is virtually zero (<strong>{FACTS.spearman}</strong>). Key planetary climate anchors are not the highest per-capita emitters, but regional land-conversion epicenters.</p>
              <Link to="/spasial" className="grain-text-link">Examine the spatial evidence <ChevronRight size={16} /></Link>
            </div>
          </div>
          <div className="grain-stat-ledger">
            <StatTile icon={<Compass size={19} strokeWidth={1.7} />} label="Data scope" value={FACTS.countries} unit="Nations" subtext="Asia-Pacific 1961–2024" badge="Balanced Panel" tone="default" />
            <StatTile icon={<Database size={19} strokeWidth={1.7} />} label="Observations" value={FACTS.observations} subtext="64 Consecutive Years" badge="Zero Missing" tone="default" />
            <StatTile icon={<Layers size={19} strokeWidth={1.7} />} label="ASEAN LUC share" value={FACTS.globalLUCShare} subtext="Of global land-use emissions" badge="Asymmetry" tone="crimson" />
            <StatTile icon={<Network size={19} strokeWidth={1.7} />} label="Moran's I (2024)" value={FACTS.moran2024} subtext="Up from +0.255 (1961)" badge="p < 0.001" tone="cyan" />
            <StatTile icon={<ArrowRight size={19} strokeWidth={1.7} />} label="N₂O spillover ratio" value={FACTS.spilloverRatio} subtext="Indirect vs. domestic effect" badge="SDM Model" tone="violet" />
          </div>
        </section>

        <WhyGrainSection />
        <TriageCanvas />
        <EvidenceWall />
        <WorkflowRail />
        <InstrumentShowcase />

        <section className="grain-section grain-final">
          <div>
            <h2>From evidence.<br /><span>To coordinated action.</span></h2>
            <p>Explore interactive cartography, verify spatial econometric models, run regional policy simulations, and inspect 10-year horizon methane forecasts.</p>
            <div className="grain-hero-actions"><Link to="/clustering" className="grain-button">Open the workspace <ArrowRight size={17} /></Link><Link to="/metodologi" className="grain-text-link">Read the methodology <ChevronRight size={17} /></Link></div>
          </div>
          <aside className="grain-research-note" aria-label="Model verification">
            <FileCheck size={28} strokeWidth={1.5} />
            <h3>Built on empirical evidence.</h3>
            <dl><div><dt>Specification</dt><dd>SDM Time-FE</dd></div><div><dt>AIC criterion</dt><dd>{FACTS.sdmAic}</dd></div><div><dt>Spatial matrix</dt><dd>k-NN (k=4)</dd></div><div><dt>Forecast validation</dt><dd>2,904-fold CV</dd></div></dl>
            <p>GRAIN · TEAM IRIS</p>
          </aside>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
}
export default LandingPage;
