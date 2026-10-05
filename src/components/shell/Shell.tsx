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
  FileText,
  Globe,
  Home,
  Layers,
  MapPin,
  Menu,
  Network,
  Search,
  Sliders,
  TrendingUp,
  X,
} from "lucide-react";
import { CommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { COUNTRIES_44, CLUSTER_NAMES } from "@/landing/facts";
import { cn } from "@/lib/utils";

const COLLAPSE_KEY = "rasio.sidebar.collapsed";

const NAV_ITEMS = [
  { path: "/clustering", label: "Peta & 5 Klaster", icon: Layers, badge: "k=5" },
  { path: "/spasial", label: "Ekonometrika Spasial", icon: Network, badge: "SDM" },
  { path: "/simulator", label: "Simulator Kebijakan", icon: Sliders, badge: "Real-time" },
  { path: "/forecasting", label: "Peramalan 2025–2035", icon: TrendingUp, badge: "MAPE 1.3%" },
  { path: "/metodologi", label: "Metodologi Ilmiah", icon: BookOpen, badge: "LR Test" },
];

const WALKTHROUGH_STEPS = [
  {
    path: "/clustering",
    title: "1. Pemetaan Tipologi Spasial",
    hint: "Lihat konsentrasi 7 negara ASEAN di Klaster Frontier",
  },
  {
    path: "/spasial",
    title: "2. Verifikasi Efek Limpahan",
    hint: "Periksa Moran's I (+0,729) & LeSage-Pace multiplier",
  },
  {
    path: "/simulator",
    title: "3. Simulasi Dampak Regional",
    hint: "Uji 3 tuas intervensi dan kalkulasi limpahan",
  },
  {
    path: "/forecasting",
    title: "4. Evaluasi Proyeksi 10 Tahun",
    hint: "Tinjau fanchart selang keyakinan metana",
  },
  {
    path: "/metodologi",
    title: "5. Audit Metodologis",
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
  const [filterAseanOnly, setFilterAseanOnly] = useState(false);

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

  // Current walkthrough step
  const currentStepIdx = WALKTHROUGH_STEPS.findIndex((s) => s.path === location.pathname);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#070b14]/90 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile drawer toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Buka menu navigasi"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Brand Link */}
          <a href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Compass className="size-4 text-slate-950 font-bold" strokeWidth={2.4} />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-[15px] text-white group-hover:text-emerald-400 transition-colors">
                  GRAIN
                </span>
                <span className="rounded bg-emerald-500/20 border border-emerald-500/30 px-1 py-0.2 font-mono text-[9px] font-bold text-emerald-400">
                  WORKSPACE
                </span>
              </div>
            </div>
          </a>

          {/* Active Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 font-mono text-[12px] text-slate-400">
            <span>Prototype</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">
              {NAV_ITEMS.find((n) => n.path === location.pathname)?.label || "Workspace"}
            </span>
          </div>
        </div>

        {/* Topbar Center: Quick Guided Walkthrough Step Pill */}
        {currentStepIdx >= 0 && (
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[12px]">
            <span className="font-mono font-bold text-emerald-400">
              {currentStepIdx + 1}/5
            </span>
            <span className="text-slate-300 font-medium">
              {WALKTHROUGH_STEPS[currentStepIdx].title}
            </span>
            {currentStepIdx < WALKTHROUGH_STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => navigate(WALKTHROUGH_STEPS[currentStepIdx + 1].path)}
                className="ml-2 flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Lanjut <ArrowRight className="size-3" />
              </button>
            )}
          </div>
        )}

        {/* Topbar Right: Search trigger & Return to Landing */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-1.5 text-[12.5px] text-slate-400 hover:border-emerald-500/40 hover:text-white transition-all backdrop-blur-md"
          >
            <Search className="size-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Cari data / modul…</span>
            <kbd className="hidden sm:inline rounded border border-white/10 bg-slate-800 px-1 font-mono text-[10px]">
              Ctrl+K
            </kbd>
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-1.5 text-[12.5px] font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors no-underline"
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </a>
        </div>
      </header>

      {/* Walkthrough Progress Bar Strip (Always visible at top of workspace) */}
      <nav
        aria-label="Alur Analisis Berkelanjutan"
        className="border-b border-white/5 bg-slate-950/70 px-4 py-2 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Alur Investigasi:</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {WALKTHROUGH_STEPS.map((s, idx) => {
              const isActive = location.pathname === s.path;
              const isPast = idx < currentStepIdx;
              return (
                <button
                  key={s.path}
                  type="button"
                  onClick={() => navigate(s.path)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                      : isPast
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-400 hover:text-slate-200",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded-full text-[10px] font-mono",
                      isActive
                        ? "bg-emerald-400 text-slate-950 font-bold"
                        : isPast
                        ? "bg-emerald-500/30 text-emerald-300"
                        : "bg-slate-800 text-slate-400",
                    )}
                  >
                    {isPast ? <Check className="size-2.5" /> : idx + 1}
                  </span>
                  <span className="hidden sm:inline">{s.title.split(". ")[1]}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
            <span>Dataset:</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400 font-semibold">
              44 Negara Asia-Pasifik (1961–2024)
            </span>
          </div>
        </div>
      </nav>

      {/* Main Workspace Layout with Collapsible Glass Sidebar */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col border-r border-white/10 bg-slate-950/75 backdrop-blur-2xl transition-all duration-300 relative z-30 shrink-0",
            collapsed ? "w-[72px]" : "w-[260px]",
          )}
        >
          {/* Sidebar Nav Links */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            <div className="px-3 py-2">
              {!collapsed && (
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  Modul Analitik
                </span>
              )}
            </div>

            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-semibold transition-all relative",
                    active
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-white shadow-[0_0_18px_rgba(16,185,129,0.15)]"
                      : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100 border border-transparent",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5 shrink-0 transition-colors",
                      active ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400",
                    )}
                    strokeWidth={active ? 2.2 : 1.8}
                  />

                  {!collapsed && (
                    <>
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[10px] font-bold shrink-0",
                            active
                              ? "bg-emerald-500/25 text-emerald-300"
                              : "bg-slate-800 text-slate-400",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer & Collapse Toggle */}
          <div className="border-t border-white/10 p-3">
            {!collapsed && (
              <div className="mb-3 rounded-xl border border-white/5 bg-slate-900/80 p-3 text-[11.5px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Status Model:</span>
                  <span className="text-emerald-400 font-bold">Optimal</span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-slate-300">
                  SDM Time-FE (k-NN, k=4)
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={toggleCollapse}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-slate-900/60 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label={collapsed ? "Buka panel samping" : "Tutup panel samping"}
            >
              {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
              {!collapsed && <span className="text-[12px] font-medium">Sembunyikan Sidebar</span>}
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
            <div className="relative flex w-[280px] flex-col border-r border-white/10 bg-slate-950 p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-bold text-[16px] text-white">Menu Navigasi</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 flex-1 space-y-1">
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
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold",
                        active
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-white"
                          : "text-slate-400 hover:bg-slate-900",
                      )}
                    >
                      <Icon className={cn("size-5", active ? "text-emerald-400" : "text-slate-400")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Primary Page Content Outlet */}
        <main className="flex-1 overflow-y-auto">
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
