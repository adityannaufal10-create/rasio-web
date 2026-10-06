import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart2,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  FileText,
  Globe,
  Home,
  Layers,
  MapPin,
  Menu,
  Network,
  Radio,
  Search,
  Sliders,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { ThemeBackdrop, PipoThemeIndicator } from "@/components/ThemeBackdrop";
import { COUNTRIES_44, CLUSTER_NAMES } from "@/landing/facts";
import { cn } from "@/lib/utils";

const COLLAPSE_KEY = "rasio.sidebar.collapsed";

interface NavItem {
  path: string;
  label: string;
  icon: typeof Layers;
  badge: string;
  subtitle: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    path: "/clustering",
    label: "Peta & 5 Klaster",
    icon: Layers,
    badge: "k=5",
    subtitle: "Tipologi Sistem Pangan & Emisi",
  },
  {
    path: "/spasial",
    label: "Ekonometrika Spasial",
    icon: Network,
    badge: "SDM",
    subtitle: "Moran's I & LeSage-Pace Multiplier",
  },
  {
    path: "/simulator",
    label: "Simulator Kebijakan",
    icon: Sliders,
    badge: "Real-time",
    subtitle: "Intervensi N₂O, Moratorium, AWD",
  },
  {
    path: "/forecasting",
    label: "Peramalan 2025–2035",
    icon: TrendingUp,
    badge: "MAPE 1.3%",
    subtitle: "CV Bebas Bocor 2.904 Fold",
  },
  {
    path: "/metodologi",
    label: "Metodologi Ilmiah",
    icon: BookOpen,
    badge: "LR Test",
    subtitle: "Panel 44 Negara × 64 Tahun",
  },
];

const WALKTHROUGH_STEPS = [
  {
    path: "/clustering",
    stepNum: "01",
    title: "1. Pemetaan Tipologi Spasial",
    shortTitle: "Tipologi Spasial",
    hint: "Lihat konsentrasi 7 negara ASEAN di Klaster Frontier",
  },
  {
    path: "/spasial",
    stepNum: "02",
    title: "2. Verifikasi Efek Limpahan",
    shortTitle: "Efek Limpahan",
    hint: "Periksa Moran's I (+0,729) & LeSage-Pace multiplier",
  },
  {
    path: "/simulator",
    stepNum: "03",
    title: "3. Simulasi Dampak Regional",
    shortTitle: "Simulasi Kebijakan",
    hint: "Uji 3 tuas intervensi dan kalkulasi limpahan",
  },
  {
    path: "/forecasting",
    stepNum: "04",
    title: "4. Evaluasi Proyeksi 10 Tahun",
    shortTitle: "Proyeksi 10 Tahun",
    hint: "Tinjau fanchart selang keyakinan metana",
  },
  {
    path: "/metodologi",
    stepNum: "05",
    title: "5. Audit Metodologis",
    shortTitle: "Audit Metodologi",
    hint: "Verifikasi struktur panel seimbang 44 negara",
  },
];

export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Toggle collapse and persist
  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Search items for Command Palette
  const commandItems: CommandItem[] = [
    // Modules
    {
      id: "mod-home",
      group: "Halaman & Modul",
      title: "Landing Page (Beranda Naratif)",
      hint: "Simulasi 44 negara & overview solusi",
      icon: Home,
      run: () => navigate("/"),
    },
    {
      id: "mod-clustering",
      group: "Halaman & Modul",
      title: "Peta & 5 Klaster Pangan",
      hint: "Kartografi interaktif dan profil 5 tipologi",
      icon: Layers,
      run: () => navigate("/clustering"),
    },
    {
      id: "mod-spasial",
      group: "Halaman & Modul",
      title: "Ekonometrika Spasial Lanjut",
      hint: "Global Moran's I & model SDM LeSage-Pace",
      icon: Network,
      run: () => navigate("/spasial"),
    },
    {
      id: "mod-simulator",
      group: "Halaman & Modul",
      title: "Laboratorium Simulator Kebijakan",
      hint: "Simulasi pupuk N₂O, moratorium, & AWD padi",
      icon: Sliders,
      run: () => navigate("/simulator"),
    },
    {
      id: "mod-forecasting",
      group: "Halaman & Modul",
      title: "Peramalan Metana 2025–2035",
      hint: "Proyeksi deret waktu bebas bocor 2.904 fold CV",
      icon: TrendingUp,
      run: () => navigate("/forecasting"),
    },
    {
      id: "mod-metodologi",
      group: "Halaman & Modul",
      title: "Metodologi & Transparansi Ilmiah",
      hint: "Data panel seimbang, matriks W k-NN, uji LR",
      icon: BookOpen,
      run: () => navigate("/metodologi"),
    },
    // Countries (ASEAN first)
    ...COUNTRIES_44.map((c) => ({
      id: `country-${c.name}`,
      group: c.isAsean ? "Negara ASEAN-10" : "Negara Asia-Pasifik",
      title: c.name,
      hint: `${c.clusterName} · ${c.luc_pc.toFixed(2)} t CO₂/kapita`,
      icon: MapPin,
      keywords: `${c.name} ${c.clusterName} ${c.isAsean ? "asean" : ""}`,
      run: () => navigate("/clustering"),
    })),
    // Clusters
    ...[0, 1, 2, 3, 4].map((k) => ({
      id: `cluster-${k}`,
      group: "Tipologi Klaster",
      title: `Klaster ${k}: ${CLUSTER_NAMES[k]}`,
      hint: "Buka analisis klaster",
      icon: Layers,
      run: () => navigate("/clustering"),
    })),
  ];

  // Current active navigation and walkthrough step
  const currentNav = NAV_ITEMS.find((n) => n.path === location.pathname);
  const CurrentIcon = currentNav?.icon || Layers;
  const currentStepIdx = WALKTHROUGH_STEPS.findIndex((s) => s.path === location.pathname);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      {/* Pipo Mesh Backdrop (Bloom Field adapted for GRAIN emerald/cyan/obsidian palette) */}
      <ThemeBackdrop />

      {/* Top Header Bar (Navbar) */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#070b14]/85 px-4 backdrop-blur-2xl sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Subtle laser highlight on top edge */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 via-cyan-400/50 to-transparent pointer-events-none" />

        <div className="flex items-center gap-4">
          {/* Mobile drawer toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-900/80 hover:text-white md:hidden border border-white/5 transition-colors"
            aria-label="Buka menu navigasi"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Brand Link */}
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-1 ring-white/25 group-hover:scale-105 transition-transform duration-200">
              <Compass className="size-4.5 text-slate-950" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 leading-none">
                <span className="font-black text-[16px] tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent group-hover:to-cyan-200 transition-colors">
                  GRAIN
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <span className="relative flex size-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" />
                  </span>
                  WORKSPACE v2.4
                </span>
              </div>
            </div>
          </a>

          {/* Active Breadcrumb with rich glass chip */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 font-mono text-[11.5px] text-slate-400">
            <span className="text-slate-400">Asia-Pasifik (N=44)</span>
            <ChevronRight className="size-3 text-slate-500" />
            <span className="text-slate-400">Panel 1961–2024</span>
            <ChevronRight className="size-3 text-slate-500" />
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <CurrentIcon className="size-3.5 text-emerald-400" />
              {currentNav?.label || "Workspace"}
            </span>
          </div>
        </div>

        {/* Topbar Center: Quick Guided Walkthrough Step Pill */}
        {currentStepIdx >= 0 && (
          <div className="hidden xl:flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-slate-900/80 px-3.5 py-1 text-[12px] shadow-[0_0_16px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-400/20 border border-emerald-400/40 px-2 py-0.5 font-mono font-bold text-[10.5px] text-emerald-300">
              {WALKTHROUGH_STEPS[currentStepIdx].stepNum}/05
            </span>
            <span className="text-slate-200 font-semibold text-[12.5px]">
              {WALKTHROUGH_STEPS[currentStepIdx].title}
            </span>
            {currentStepIdx < WALKTHROUGH_STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => navigate(WALKTHROUGH_STEPS[currentStepIdx + 1].path)}
                className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-2.5 py-0.5 font-semibold text-[11px] text-emerald-300 hover:text-white transition-all shadow-[0_0_8px_rgba(16,185,129,0.2)]"
              >
                Lanjut <ArrowRight className="size-3" />
              </button>
            )}
          </div>
        )}

        {/* Topbar Right: Pipo Indicator, Search trigger & Return to Landing */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active Pipo Mesh Theme Indicator */}
          <PipoThemeIndicator />

          {/* Search trigger button */}
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 hover:bg-slate-800/80 hover:border-emerald-500/40 px-3 py-1.5 text-[12.5px] text-slate-300 hover:text-white transition-all backdrop-blur-md shadow-[0_0_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_16px_rgba(16,185,129,0.18)]"
          >
            <Search className="size-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Cari data / modul…</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-white/15 bg-slate-800/90 px-1.5 py-0.5 font-mono text-[10px] text-slate-300 shadow-sm">
              Ctrl+K
            </kbd>
          </button>

          {/* Return to Landing Page */}
          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/70 hover:bg-emerald-500/15 hover:border-emerald-500/35 hover:text-emerald-300 px-3 py-1.5 text-[12.5px] font-semibold text-slate-300 transition-all no-underline backdrop-blur-md"
          >
            <Home className="size-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Landing Page</span>
          </a>
        </div>
      </header>

      {/* Walkthrough Progress Bar Strip (Secondary Nav) */}
      <nav
        aria-label="Alur Analisis Berkelanjutan"
        className="border-b border-white/10 bg-slate-950/70 px-4 py-2.5 backdrop-blur-xl relative z-30"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
            </span>
            <span className="text-slate-300 font-semibold">Alur Investigasi:</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {WALKTHROUGH_STEPS.map((s, idx) => {
              const isActive = location.pathname === s.path;
              const isPast = idx < currentStepIdx;
              return (
                <div key={s.path} className="flex items-center gap-1.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(s.path)}
                    title={s.hint}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-emerald-500/10 border border-emerald-500/45 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/30 font-semibold"
                        : isPast
                        ? "bg-slate-900/60 border border-emerald-500/25 text-slate-200 hover:text-white hover:bg-slate-800/80"
                        : "bg-slate-900/40 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-4.5 place-items-center rounded-full text-[10px] font-mono shrink-0 transition-all",
                        isActive
                          ? "bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 font-black shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400 border border-white/5",
                      )}
                    >
                      {isPast ? <Check className="size-2.5 stroke-[3]" /> : idx + 1}
                    </span>
                    <span className="hidden sm:inline">{s.shortTitle}</span>
                  </button>

                  {idx < WALKTHROUGH_STEPS.length - 1 && (
                    <span
                      className={cn(
                        "hidden xl:block h-[1.5px] w-4 rounded-full transition-colors",
                        isPast ? "bg-emerald-500/40" : "bg-white/10"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-1 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="size-1.5 rounded-full bg-cyan-400" />
            <span>Dataset Panel:</span>
            <span className="rounded bg-slate-800/90 px-1.5 py-0.5 text-emerald-300 font-bold border border-white/5">
              44 Negara (1961–2024)
            </span>
          </div>
        </div>
      </nav>

      {/* Main Workspace Layout with Collapsible Glass Sidebar */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl transition-all duration-300 relative z-30 shrink-0 select-none shadow-[4px_0_30px_rgba(0,0,0,0.5)]",
            collapsed ? "w-[76px]" : "w-[276px]",
          )}
        >
          {/* Sidebar Category Header */}
          <div className="p-3 pb-2 border-b border-white/5">
            {!collapsed ? (
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                  <Layers className="size-3.5 text-emerald-400" />
                  Modul Analitik
                </span>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-300">
                  5 MODUL
                </span>
              </div>
            ) : (
              <div className="flex justify-center py-1">
                <span className="size-2 rounded-full bg-emerald-400/70" />
              </div>
            )}
          </div>

          {/* Sidebar Nav Links */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  title={collapsed ? `${item.label} · ${item.subtitle}` : undefined}
                  className={cn(
                    "group relative flex w-full items-center rounded-xl transition-all duration-200 text-left",
                    collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                    active
                      ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent border border-emerald-500/35 text-white shadow-[0_0_20px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/25"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/70 border border-transparent hover:border-white/10"
                  )}
                >
                  {/* Active glowing indicator pill on left edge */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                  )}

                  {/* Icon container with customized halo */}
                  <div
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg transition-all",
                      active
                        ? "bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]"
                        : "bg-slate-900/80 border border-white/5 text-slate-400 group-hover:text-emerald-300 group-hover:border-emerald-500/30 group-hover:bg-slate-800/80"
                    )}
                  >
                    <Icon className="size-4.5" strokeWidth={active ? 2.3 : 1.8} />
                  </div>

                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={cn(
                            "truncate text-[13.5px] font-bold leading-tight",
                            active ? "text-white" : "text-slate-300 group-hover:text-white"
                          )}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold shrink-0",
                              active
                                ? "bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                                : "bg-slate-900 border border-white/10 text-slate-400 group-hover:text-slate-300"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-slate-400 mt-0.5 font-medium leading-none">
                        {item.subtitle}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer & Model Telemetry Card */}
          <div className="border-t border-white/10 p-3 bg-slate-950/60">
            {!collapsed && (
              <div className="mb-3 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-3 text-[11.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-white/5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                    <Cpu className="size-3 text-emerald-400" />
                    Telemetri Model
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold font-mono text-[10.5px]">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Optimal
                  </span>
                </div>
                <div className="mt-2 space-y-1 font-mono text-[10.5px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Estimasi:</span>
                    <span className="text-slate-200 font-semibold">SDM Time-FE</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Matriks W:</span>
                    <span className="text-cyan-400 font-semibold">k-NN (k=4)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Moran's I:</span>
                    <span className="text-emerald-300 font-bold">+0,729 (p&lt;0,001)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar Collapse Toggle Button */}
            <button
              type="button"
              onClick={toggleCollapse}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 hover:bg-slate-800/90 hover:border-emerald-500/35 p-2 text-slate-400 hover:text-white transition-all shadow-sm group"
              aria-label={collapsed ? "Buka panel samping" : "Tutup panel samping"}
            >
              {collapsed ? (
                <ChevronRight className="size-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronLeft className="size-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              )}
              {!collapsed && (
                <span className="text-[12px] font-semibold text-slate-300 group-hover:text-white">
                  Sembunyikan Sidebar
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
            <div
              className="fixed inset-0 bg-[#070b14]/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative flex w-[290px] flex-col border-r border-white/10 bg-slate-950 p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950">
                    <Compass className="size-4" strokeWidth={2.4} />
                  </div>
                  <span className="font-bold text-[15px] text-white">Menu Navigasi</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 flex-1 space-y-1.5 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const active = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                        active
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/35 text-white"
                          : "text-slate-400 hover:bg-slate-900",
                      )}
                    >
                      <div
                        className={cn(
                          "grid size-8 place-items-center rounded-lg",
                          active
                            ? "bg-emerald-500/25 text-emerald-300"
                            : "bg-slate-900 text-slate-400",
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13.5px]">{item.label}</span>
                          <span className="font-mono text-[9.5px] font-bold text-emerald-300 bg-emerald-500/20 px-1 rounded">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Primary Page Content Outlet */}
        <main className="flex-1 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        items={commandItems}
      />
    </div>
  );
}

export default Shell;
