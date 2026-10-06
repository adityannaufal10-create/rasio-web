import { useEffect } from "react";
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
    category: "Pindah Cepat Antar Modul (Langsung)",
    items: [
      { keys: ["1"], description: "Buka Modul 1: Peta & 5 Klaster", actionHint: "/clustering" },
      { keys: ["2"], description: "Buka Modul 2: Ekonometrika Spasial (SDM)", actionHint: "/spasial" },
      { keys: ["3"], description: "Buka Modul 3: Simulator Kebijakan Pangan", actionHint: "/simulator" },
      { keys: ["4"], description: "Buka Modul 4: Peramalan Metana 2025–2035", actionHint: "/forecasting" },
      { keys: ["5"], description: "Buka Modul 5: Metodologi Ilmiah & Uji LR", actionHint: "/metodologi" },
    ],
  },
  {
    category: "Alur Navigasi Investigasi (Sekuensial)",
    items: [
      { keys: ["[", "←"], description: "Pindah ke Modul Sebelumnya", actionHint: "Previous Step" },
      { keys: ["]", "→"], description: "Lanjut ke Modul Berikutnya", actionHint: "Next Step" },
      { keys: ["H", "0"], description: "Kembali ke Beranda Naratif (Landing Page)", actionHint: "/" },
    ],
  },
  {
    category: "Kontrol Workspace & Utilitas",
    items: [
      { keys: ["B"], description: "Buka / Sembunyikan Panel Samping (Sidebar)", actionHint: "Toggle Sidebar" },
      { keys: ["Ctrl", "K"], description: "Buka Pencarian Cepat / Command Palette", actionHint: "Search" },
      { keys: ["/"], description: "Fokus ke Pencarian Data & Negara", actionHint: "Quick Find" },
      { keys: ["?"], description: "Buka Panduan Pintasan Keyboard Ini", actionHint: "Help" },
      { keys: ["Esc"], description: "Tutup Dialog / Modal / Palette", actionHint: "Close" },
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
        className="fixed inset-0 bg-[#070b14]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-6 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-2xl animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Top laser highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 via-cyan-400 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/35 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <Keyboard className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="shortcuts-title" className="text-lg font-bold text-white tracking-tight">
                  Pintasan Keyboard (Keyboard Shortcuts)
                </h2>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                  SMOOTH NAV
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Navigasi cepat antar modul analitik & data panel tanpa menyentuh mouse
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5 transition-colors"
            aria-label="Tutup panduan shortcut"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Shortcut Groups List */}
        <div className="mt-5 max-h-[62vh] overflow-y-auto space-y-6 pr-1">
          {SHORTCUT_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {group.category}
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800/60 hover:border-emerald-500/30 p-2.5 sm:px-3.5 transition-all group"
                  >
                    <span className="text-[13px] text-slate-300 group-hover:text-white font-medium">
                      {item.description}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="inline-flex min-w-[24px] items-center justify-center rounded-lg border border-white/20 bg-slate-800/90 px-2 py-1 font-mono text-[11px] font-bold text-emerald-300 shadow-[0_2px_0_rgba(255,255,255,0.1)] group-hover:border-emerald-500/50 group-hover:text-emerald-200 transition-colors"
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
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Pintasan aktif di seluruh tampilan dashboard</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-3 py-1 font-semibold text-emerald-300 hover:text-white transition-colors"
          >
            Tutup (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
