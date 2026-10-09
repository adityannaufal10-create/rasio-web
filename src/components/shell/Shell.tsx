import { useEffect, useRef, useState, type ReactNode } from "react";
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
  Keyboard,
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
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal";
import { COUNTRIES_44, CLUSTER_NAMES } from "@/landing/facts";
import { cn } from "@/lib/utils";
import { ThemeControl } from "@/components/ThemeProvider";

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
    label: "Cartography & 5 Clusters",
    icon: Layers,
    badge: "k=5",
    subtitle: "Agrifood Typologies & Emissions",
  },
  {
    path: "/spasial",
    label: "Spatial Econometrics",
    icon: Network,
    badge: "SDM",
    subtitle: "Moran's I & LeSage–Pace Multipliers",
  },
  {
    path: "/simulator",
    label: "Policy Simulator",
    icon: Sliders,
    badge: "Real-time",
    subtitle: "N₂O, Moratorium, & AWD Levers",
  },
  {
    path: "/forecasting",
    label: "Forecasting 2025–2035",
    icon: TrendingUp,
    badge: "MAPE 1.3%",
    subtitle: "Leak-Free 2,904-Fold CV",
  },
  {
    path: "/metodologi",
    label: "Scientific Methodology",
    icon: BookOpen,
    badge: "LR Test",
    subtitle: "Balanced 44-Country Panel Matrix",
  },
];

const WALKTHROUGH_STEPS = [
  {
    path: "/clustering",
    stepNum: "01",
    title: "1. Spatial Typology Mapping",
    shortTitle: "Spatial Typology",
    hint: "Inspect 7 ASEAN members clustered in Land Frontier",
  },
  {
    path: "/spasial",
    stepNum: "02",
    title: "2. Spillover Verification",
    shortTitle: "Spillover Verification",
    hint: "Examine Moran's I (+0.729) & LeSage-Pace multipliers",
  },
  {
    path: "/simulator",
    stepNum: "03",
    title: "3. Regional Policy Simulation",
    shortTitle: "Policy Simulator",
    hint: "Test 3 intervention levers and net mitigation",
  },
  {
    path: "/forecasting",
    stepNum: "04",
    title: "4. 10-Year Horizon Forecast",
    shortTitle: "10-Year Forecast",
    hint: "Review multi-horizon empirical fancharts",
  },
  {
    path: "/metodologi",
    stepNum: "05",
    title: "5. Methodological Audit",
    shortTitle: "Methodology Audit",
    hint: "Audit 44-country balanced panel & W matrix",
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
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; key: string } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // Trigger floating micro-toast confirming shortcut action
  const triggerToast = (message: string, key: string) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ message, key });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 1300);
  };

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

  // Current active navigation and walkthrough step
  const currentNav = NAV_ITEMS.find((n) => n.path === location.pathname);
  const CurrentIcon = currentNav?.icon || Layers;
  const currentStepIdx = WALKTHROUGH_STEPS.findIndex((s) => s.path === location.pathname);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      // Ctrl+K / Cmd+K always toggles Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
        return;
      }

      // Escape closes open dialogs/drawers
      if (e.key === "Escape") {
        if (shortcutsModalOpen) {
          e.preventDefault();
          setShortcutsModalOpen(false);
          return;
        }
        if (cmdOpen) {
          e.preventDefault();
          setCmdOpen(false);
          return;
        }
        if (mobileOpen) {
          e.preventDefault();
          setMobileOpen(false);
          return;
        }
      }

      // Non-modifier shortcuts below only run when NOT typing in an input field
      if (isInput) return;

      // '?' or 'Shift + /' opens Keyboard Shortcuts Cheat Sheet Modal
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsModalOpen((o) => !o);
        return;
      }

      // '/' opens Command Palette (like GitHub / Linear)
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setCmdOpen(true);
        return;
      }

      // 'b' or 'B' toggles sidebar collapse
      if (e.key.toLowerCase() === "b" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleCollapse();
        triggerToast(collapsed ? "Expand Sidebar" : "Collapse Sidebar", "B");
        return;
      }

      // 'h' or 'H' or '0' jumps to Landing Page
      if ((e.key.toLowerCase() === "h" || e.key === "0") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        navigate("/");
        triggerToast("Narrative Overview", "H");
        return;
      }

      // Number keys 1-5 jump directly to modules 1-5
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const targetStep = WALKTHROUGH_STEPS[num - 1];
        if (targetStep) {
          navigate(targetStep.path);
          triggerToast(`Module ${num}: ${targetStep.shortTitle}`, String(num));
        }
        return;
      }

      // Sequential navigation: '[' (Previous Step)
      if (e.key === "[" || (e.altKey && e.key === "ArrowLeft")) {
        e.preventDefault();
        if (currentStepIdx > 0) {
          const prevStep = WALKTHROUGH_STEPS[currentStepIdx - 1];
          navigate(prevStep.path);
          triggerToast(`← ${prevStep.shortTitle}`, "[");
        } else {
          triggerToast("First Module Active", "1");
        }
        return;
      }

      // Sequential navigation: ']' (Next Step)
      if (e.key === "]" || (e.altKey && e.key === "ArrowRight")) {
        e.preventDefault();
        if (currentStepIdx < WALKTHROUGH_STEPS.length - 1) {
          const nextStep = WALKTHROUGH_STEPS[currentStepIdx + 1];
          navigate(nextStep.path);
          triggerToast(`→ ${nextStep.shortTitle}`, "]");
        } else {
          triggerToast("Final Module Active", "5");
        }
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStepIdx, collapsed, shortcutsModalOpen, cmdOpen, mobileOpen, navigate]);

  // Search items for Command Palette
  const commandItems: CommandItem[] = [
    // Modules
    {
      id: "mod-home",
      group: "Pages & Modules",
      title: "Landing Page (Narrative Overview)",
      hint: "44-country simulation & empirical synthesis",
      icon: Home,
      run: () => navigate("/"),
    },
    {
      id: "mod-clustering",
      group: "Pages & Modules",
      title: "Cartography & 5 Agrifood Clusters",
      hint: "Interactive map and 5 regional typologies",
      icon: Layers,
      run: () => navigate("/clustering"),
    },
    {
      id: "mod-spasial",
      group: "Pages & Modules",
      title: "Advanced Spatial Econometrics",
      hint: "Global Moran's I & LeSage–Pace SDM decomposition",
      icon: Network,
      run: () => navigate("/spasial"),
    },
    {
      id: "mod-simulator",
      group: "Pages & Modules",
      title: "Regional Policy Simulator Lab",
      hint: "Simulate N₂O fertilizer, forest moratoria, & AWD",
      icon: Sliders,
      run: () => navigate("/simulator"),
    },
    {
      id: "mod-forecasting",
      group: "Pages & Modules",
      title: "Methane Forecasting 2025–2035",
      hint: "Leak-free projections with 2,904-fold CV",
      icon: TrendingUp,
      run: () => navigate("/forecasting"),
    },
    {
      id: "mod-metodologi",
      group: "Pages & Modules",
      title: "Methodology & Scientific Transparency",
      hint: "Balanced panel, k-NN W-matrix, LR specification tests",
      icon: BookOpen,
      run: () => navigate("/metodologi"),
    },
    // Countries (ASEAN first)
    ...COUNTRIES_44.map((c) => ({
      id: `country-${c.name}`,
      group: c.isAsean ? "ASEAN-10 Economies" : "Asia-Pacific Economies",
      title: c.name,
      hint: `${c.clusterName} · ${c.luc_pc.toFixed(2)} t CO₂/capita`,
      icon: MapPin,
      keywords: `${c.name} ${c.clusterName} ${c.isAsean ? "asean" : ""}`,
      run: () => navigate("/clustering"),
    })),
    // Clusters
    ...[0, 1, 2, 3, 4].map((k) => ({
      id: `cluster-${k}`,
      group: "Agrifood Typologies",
      title: `Cluster ${k}: ${CLUSTER_NAMES[k]}`,
      hint: "Open cluster profile & audit",
      icon: Layers,
      run: () => navigate("/clustering"),
    })),
  ];

  const navigation = (compact = false) => NAV_ITEMS.map((item, idx) => {
    const active = location.pathname === item.path;
    const Icon = item.icon;
    return <button key={item.path} type="button"
      onClick={() => { navigate(item.path); setMobileOpen(false); }}
      className="grain-sidebar-item" aria-current={active ? "page" : undefined}
      title={`${item.label} · ${item.badge} (Shortcut: ${idx + 1})`}>
      <Icon size={19} strokeWidth={1.7} />
      {!compact && <><span><strong>{WALKTHROUGH_STEPS[idx].shortTitle}</strong><small>{item.subtitle}</small></span><kbd>{idx + 1}</kbd></>}
    </button>;
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("close-workspace-navigation")?.focus();
    return () => { document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [mobileOpen]);
  useEffect(() => () => { if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current); }, []);

  return (
    <div className="grain-workspace">
      <a href="#workspace-content" className="skip-link">Skip to analysis</a>
      <header className="grain-workspace-header">
        <div>
          <button type="button" onClick={() => setMobileOpen(o => !o)} className="icon-button md:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="workspace-navigation">
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <a href="/" className="grain-brand" aria-label="GRAIN Homepage"><Compass size={25} strokeWidth={1.7} /><span>GRAIN</span></a>
          <span className="grain-workspace-context">Asia-Pacific · 44 economies · 1961–2024</span>
        </div>
        <div>
          <ThemeControl />
          <button type="button" className="grain-toolbar-button" onClick={() => setShortcutsModalOpen(true)} aria-label="Keyboard Shortcuts" title="Keyboard shortcuts (?)"><Keyboard size={17} /><span>Shortcuts</span><kbd>?</kbd></button>
          <button type="button" className="grain-toolbar-button" onClick={() => setCmdOpen(true)} aria-label="Search GRAIN" title="Search modules, economies and clusters (Ctrl+K)"><Search size={17} /><span>Search GRAIN</span><kbd>Ctrl K</kbd></button>
          <a href="/" className="grain-toolbar-button" title="Return to Landing Page (H)" aria-label="Return to landing page"><Home size={17} /><span>Overview</span></a>
        </div>
      </header>

      <nav className="grain-walkthrough" aria-label="Sequential Analytical Walkthrough">
        <span>Presentation path</span>
        <div>{WALKTHROUGH_STEPS.map((step, idx) => <button type="button" key={step.path}
          onClick={() => navigate(step.path)} aria-current={idx === currentStepIdx ? "step" : undefined}
          title={`${step.hint} (Shortcut: ${idx + 1})`}>
          <span>{idx < currentStepIdx ? <Check size={10} /> : idx + 1}</span>
          {["Cartography", "Spatial effects", "Policies", "Forecasts", "Methodology"][idx]}
        </button>)}</div>
      </nav>

      <div className="grain-workspace-body">
        <aside className={cn("grain-sidebar", collapsed && "is-collapsed")} aria-label="Analytical modules">
          {!collapsed && <p className="grain-sidebar-label">Analytical modules · 5 suites</p>}
          <nav aria-label="Workspace navigation">{navigation(collapsed)}</nav>
          <div className="grain-sidebar-bottom">
            {!collapsed && <div className="grain-model-note">
              <h3>Selected model</h3>
              <p>Estimation <strong>SDM Time-FE</strong></p>
              <p>Spatial weights <strong>k-NN (k=4)</strong></p>
              <p>Moran's I <strong>+0.729</strong></p>
              <p>Significance <strong>p &lt; 0.001</strong></p>
            </div>}
            <button type="button" className="grain-sidebar-item" onClick={() => setShortcutsModalOpen(true)} aria-label="Keyboard shortcuts" title="Keyboard shortcuts (?)"><Keyboard size={18} />{!collapsed && <span><strong>Keyboard shortcuts</strong></span>}</button>
            <button type="button" className="grain-sidebar-item" onClick={toggleCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title="Toggle sidebar (B)">
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}{!collapsed && <span><strong>Collapse sidebar</strong></span>}
            </button>
          </div>
        </aside>

        {mobileOpen && <div id="workspace-navigation" className="grain-mobile-navigation" role="dialog" aria-modal="true" aria-label="Workspace navigation"
          onKeyDown={e => {
            if (e.key !== "Tab") return;
            const controls = e.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
            const first = controls[0], last = controls[controls.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
          }}>
          <div className="grain-navigation-scrim" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="grain-navigation-sheet">
            <div><strong>Explore GRAIN</strong><button id="close-workspace-navigation" type="button" className="icon-button" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={20} /></button></div>
            <nav aria-label="Mobile workspace navigation">{navigation()}</nav>
            <button type="button" className="grain-sidebar-item" onClick={() => { setMobileOpen(false); setShortcutsModalOpen(true); }}><Keyboard size={19} /><span><strong>Keyboard shortcuts</strong></span></button>
          </div>
        </div>}

        <main id="workspace-content" className="grain-workspace-main">
          <div key={location.pathname}>{children}</div>
          <nav className="flex items-center justify-between gap-4 px-5 pt-8 sm:px-8" aria-label="Previous and next analytical module">
            {currentStepIdx > 0 ? <button type="button" className="grain-text-link" onClick={() => navigate(WALKTHROUGH_STEPS[currentStepIdx - 1].path)}><ChevronLeft size={16} />{WALKTHROUGH_STEPS[currentStepIdx - 1].shortTitle}</button> : <a href="/" className="grain-text-link"><ChevronLeft size={16} />Overview</a>}
            {currentStepIdx < WALKTHROUGH_STEPS.length - 1 && <button type="button" className="grain-text-link" onClick={() => navigate(WALKTHROUGH_STEPS[currentStepIdx + 1].path)}>{WALKTHROUGH_STEPS[currentStepIdx + 1].shortTitle}<ChevronRight size={16} /></button>}
          </nav>
        </main>
      </div>
      {toast && <div className="grain-toast" role="status"><span>{toast.message}</span><kbd>{toast.key}</kbd></div>}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} items={commandItems} />
      <KeyboardShortcutsModal open={shortcutsModalOpen} onClose={() => setShortcutsModalOpen(false)} />
    </div>
  );
}
export default Shell;
