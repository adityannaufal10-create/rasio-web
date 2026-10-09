import { useState } from "react";
import {
  Download,
  Eye,
  Maximize2,
  Minimize2,
  Moon,
  Sparkles,
  Sun,
  X,
  ZoomIn,
  Layers,
  CheckCircle2,
  BarChart3,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FigureItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  darkSrc: string;
  lightSrc: string;
  alt: string;
  metrics: {
    label: string;
    value: string;
    tone?: "emerald" | "cyan" | "amber" | "violet";
  }[];
  insight: string;
  badge?: string;
}

interface ScientificFigureViewerProps {
  title: string;
  subtitle: string;
  figures: FigureItem[];
  defaultTabId?: string;
  className?: string;
}

export function ScientificFigureViewer({
  title,
  subtitle,
  figures,
  defaultTabId,
  className,
}: ScientificFigureViewerProps) {
  const [activeId, setActiveId] = useState(defaultTabId || figures[0]?.id || "");
  const [viewMode, setViewMode] = useState<"dark" | "light">("dark");
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentFigure = figures.find((f) => f.id === activeId) || figures[0];
  if (!currentFigure) return null;

  const currentSrc = viewMode === "dark" ? currentFigure.darkSrc : currentFigure.lightSrc;

  return (
    <>
      <div
        className={cn(
          "rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all",
          className
        )}
      >
        {/* Header Strip with Tabs */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VEKTOR ANALITIS PRESI TINGGI
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Matplotlib Lossless · 100% Vektor Asli
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="size-5 text-emerald-400" />
              <span>{title}</span>
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-400 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap p-1 rounded-2xl bg-slate-950/80 border border-white/10">
            {figures.map((fig) => {
              const active = fig.id === activeId;
              return (
                <button
                  key={fig.id}
                  type="button"
                  onClick={() => setActiveId(fig.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                    active
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-[0_0_14px_rgba(16,185,129,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                  )}
                >
                  <span>{fig.tabLabel}</span>
                  {fig.badge && (
                    <span
                      className={cn(
                        "rounded px-1 text-[9px] font-mono font-bold",
                        active ? "bg-slate-950/30 text-slate-950" : "bg-slate-800 text-slate-300"
                      )}
                    >
                      {fig.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport Control Bar */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-950/60 border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300 text-[13px]">
              {currentFigure.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Toggle */}
            <div className="flex items-center rounded-xl bg-slate-900 border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("dark")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all",
                  viewMode === "dark"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
                title="Tampilan kanvas gelap selaras tema (Ngeblend)"
              >
                <Moon className="size-3" />
                <span className="hidden sm:inline">Gelap (Ngeblend)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("light")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all",
                  viewMode === "light"
                    ? "bg-white text-slate-950 border border-white shadow-sm font-bold"
                    : "text-slate-400 hover:text-white"
                )}
                title="Tampilan kertas cetak asli publikasi (Paper Mode)"
              >
                <Sun className="size-3" />
                <span className="hidden sm:inline">Kertas Cetak</span>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setFullscreenOpen(true);
              }}
              className="p-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Perbesar Grafik (Fullscreen)"
              aria-label="Perbesar grafik"
            >
              <Maximize2 className="size-3.5" />
            </button>

            {/* Download Vector Button */}
            <a
              href={currentSrc}
              download={currentFigure.id + ".svg"}
              className="p-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              title="Unduh Berkas Vektor SVG Asli"
              aria-label="Unduh SVG"
            >
              <Download className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="p-5 sm:p-6 pt-4">
          <div
            className={cn(
              "relative rounded-2xl p-4 sm:p-8 min-h-[420px] flex items-center justify-center transition-all overflow-hidden",
              viewMode === "dark"
                ? "bg-gradient-to-b from-slate-950/90 via-[#070d1a]/95 to-slate-950/90 border border-white/10 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)]"
                : "bg-white border border-slate-300 shadow-xl"
            )}
          >
            {/* Subtle background glow when in dark mode */}
            {viewMode === "dark" && (
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),transparent_70%)]" />
            )}

            <img
              src={currentSrc}
              alt={currentFigure.alt}
              className={cn(
                "max-h-[500px] w-auto max-w-full object-contain mx-auto transition-transform duration-300 cursor-zoom-in",
                viewMode === "dark" ? "drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" : ""
              )}
              onClick={() => {
                setZoomLevel(1);
                setFullscreenOpen(true);
              }}
            />
          </div>

          {/* Contextual Metric Strip & Empirical Takeaway */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            {/* Metrics Chips */}
            <div className="lg:col-span-1 flex flex-col justify-center gap-2 p-3.5 rounded-2xl bg-slate-950/70 border border-white/5">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <BarChart3 className="size-3 text-emerald-400" />
                Parameter Kunci
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currentFigure.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-900/80 border border-white/5"
                  >
                    <span className="block font-mono text-[10px] text-slate-400">
                      {m.label}
                    </span>
                    <span
                      className={cn(
                        "block font-mono font-bold text-[13px] tracking-tight mt-0.5",
                        m.tone === "cyan"
                          ? "text-cyan-400"
                          : m.tone === "amber"
                          ? "text-amber-400"
                          : m.tone === "violet"
                          ? "text-purple-400"
                          : "text-emerald-300"
                      )}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Explanation Callout */}
            <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="size-3.5 text-emerald-400" />
                <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                  Temuan Empiris & Interpretasi Spasial
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                {currentFigure.insight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#070b14]/90 backdrop-blur-xl"
            onClick={() => setFullscreenOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl border border-white/15 bg-slate-950 p-5 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-white">
                  {currentFigure.title}
                </h4>
                <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-mono font-bold">
                  VEKTOR HD
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  + Zoom In
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  - Zoom Out
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => setFullscreenOpen(false)}
                  className="p-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Zoom */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center min-h-[350px]">
              <div
                className={cn(
                  "p-6 rounded-2xl transition-all",
                  viewMode === "dark"
                    ? "bg-slate-950/90 border border-white/10"
                    : "bg-white border border-slate-300"
                )}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
              >
                <img
                  src={currentSrc}
                  alt={currentFigure.alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between shrink-0 font-mono text-[11px]">
              <span>Gunakan kontrol zoom untuk memeriksa label negara dan koordinat sferis secara mendalam.</span>
              <button
                type="button"
                onClick={() => setFullscreenOpen(false)}
                className="font-sans font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Tutup (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ScientificFigureViewer;
