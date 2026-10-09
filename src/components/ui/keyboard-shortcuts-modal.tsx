import { useEffect, useRef } from "react";
import { useDialogFocus } from "@/lib/useDialogFocus";
import { Keyboard, X, ArrowLeft, ArrowRight, Home, Search, Layers, SidebarClose, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortcutGroup {
  category: string;
  items: {
    keys: string[];
    description: string;
    actionHint?: string;
  }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    category: "Direct Module Navigation",
    items: [
      { keys: ["1"], description: "Open Module 1: Cartography & 5 Clusters", actionHint: "/clustering" },
      { keys: ["2"], description: "Open Module 2: Spatial Econometrics (SDM)", actionHint: "/spasial" },
      { keys: ["3"], description: "Open Module 3: Regional Policy Simulator", actionHint: "/simulator" },
      { keys: ["4"], description: "Open Module 4: Methane Forecasting 2025–2035", actionHint: "/forecasting" },
      { keys: ["5"], description: "Open Module 5: Methodology & Specification Tests", actionHint: "/metodologi" },
    ],
  },
  {
    category: "Sequential Investigation Track",
    items: [
      { keys: ["[", "←"], description: "Navigate to Previous Module", actionHint: "Previous Step" },
      { keys: ["]", "→"], description: "Advance to Next Module", actionHint: "Next Step" },
      { keys: ["H", "0"], description: "Return to Landing Page Overview", actionHint: "/" },
    ],
  },
  {
    category: "Workspace Controls & Utilities",
    items: [
      { keys: ["B"], description: "Toggle Sidebar Panel Expand/Collapse", actionHint: "Toggle Sidebar" },
      { keys: ["Ctrl", "K"], description: "Open Command Palette Search", actionHint: "Search" },
      { keys: ["/"], description: "Focus Data & Country Search", actionHint: "Quick Find" },
      { keys: ["?"], description: "Open This Keyboard Shortcuts Guide", actionHint: "Help" },
      { keys: ["Esc"], description: "Close Active Modal / Dialog / Drawer", actionHint: "Close" },
    ],
  },
];

export function KeyboardShortcutsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(open, panel, onClose);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/25 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div ref={panel} className="grain-dialog relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-black/10 bg-surface p-5 sm:p-6 text-neutral-900 shadow-xl">
        {/* Top laser highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 via-cyan-400 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-black/10 text-neutral-800 shadow-sm">
              <Keyboard className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="shortcuts-title" className="text-lg font-bold text-neutral-950 tracking-tight">
                  Keyboard Shortcuts Guide
                </h2>
                <span className="rounded-full bg-grain-mist border border-black/10 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-800">
                  SMOOTH NAV
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                Rapid navigation across analytical modules without touching the mouse
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 border border-black/5 transition-colors"
            aria-label="Close shortcuts guide"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Shortcut Groups List */}
        <div className="mt-5 max-h-[62vh] overflow-y-auto space-y-6 pr-1">
          {SHORTCUT_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800/90 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {group.category}
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-surface/60 hover:bg-neutral-100/60 hover:border-black/10 p-2.5 sm:px-3.5 transition-all group"
                  >
                    <span className="text-[13px] text-neutral-700 group-hover:text-neutral-950 font-medium">
                      {item.description}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="inline-flex min-w-[24px] items-center justify-center rounded-lg border border-black/20 bg-neutral-100/90 px-2 py-1 font-mono text-[11px] font-bold text-neutral-800 shadow-[0_2px_0_rgba(255,255,255,0.1)] group-hover:border-black/10 group-hover:text-neutral-800 transition-colors"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Sparkles className="size-3.5 text-neutral-800" />
            <span>Shortcuts enabled across all workspace views</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-grain-mist hover:bg-grain-mist border border-black/10 px-3 py-1 font-semibold text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
