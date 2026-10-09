import { useRef, useState } from "react";
import { Download, Maximize2, Moon, Sun, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDialogFocus } from "@/lib/useDialogFocus";
import { useTheme } from "@/components/ThemeProvider";

export interface FigureItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  darkSrc: string;
  lightSrc: string;
  alt: string;
  metrics: { label: string; value: string; tone?: "emerald" | "cyan" | "amber" | "violet" }[];
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
export function ScientificFigureViewer({ title, subtitle, figures, defaultTabId, className }: ScientificFigureViewerProps) {
  const [activeId, setActiveId] = useState(defaultTabId || figures[0]?.id || "");
  const { isDark } = useTheme();
  const [canvasMode, setViewMode] = useState<"dark" | "light" | null>(null);
  const viewMode = canvasMode || (isDark ? "dark" : "light");
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const modal = useRef<HTMLDivElement>(null);
  useDialogFocus(fullscreenOpen, modal, () => setFullscreenOpen(false));
  const figure = figures.find(f => f.id === activeId) || figures[0];
  if (!figure) return null;
  const src = viewMode === "dark" ? figure.darkSrc : figure.lightSrc;
  const inspect = () => { setZoomLevel(1); setFullscreenOpen(true); };
  return <>
    <div className={cn("grain-figure-viewer overflow-hidden", className)}>
      <div className="p-5 sm:p-7">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-[75ch] text-xs leading-relaxed text-neutral-600">{subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Scientific figures">
          {figures.map(item => <button key={item.id} type="button" aria-pressed={item.id === activeId}
            onClick={() => { setActiveId(item.id); setZoomLevel(1); }}
            className={cn("rounded-full px-3.5 py-2 text-[11px] font-medium transition-colors",
              item.id === activeId ? "bg-grain-blue text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}
            title={item.badge ? item.tabLabel + " · " + item.badge : item.tabLabel}>{item.tabLabel}{item.badge && <span className="ml-1.5 text-[9px] opacity-80">{item.badge}</span>}</button>)}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-black/5 bg-neutral-50 px-5 py-3 sm:px-7">
        <div className="min-w-0"><h4 className="text-[13px] font-semibold">{figure.title}</h4><p className="mt-1 text-[11px] text-neutral-500">{figure.subtitle}</p></div>
        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-2 flex rounded-lg bg-neutral-200/60 p-0.5">
            <button type="button" onClick={() => setViewMode("light")} aria-pressed={viewMode === "light"} aria-label="Light figure canvas" title="Kertas cetak"
              className={cn("flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px]", viewMode === "light" && "bg-surface shadow-sm")}><Sun size={13} /><span>Paper</span></button>
            <button type="button" onClick={() => setViewMode("dark")} aria-pressed={viewMode === "dark"} aria-label="Dark figure canvas" title="Kanvas gelap"
              className={cn("flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px]", viewMode === "dark" && "bg-surface shadow-sm")}><Moon size={13} /><span>Dark</span></button>
          </div>
          <button type="button" className="icon-button" onClick={inspect} aria-label="Perbesar grafik" title="Fullscreen"><Maximize2 size={17} /></button>
          <a href={src} download={figure.id + ".svg"} className="icon-button" aria-label="Unduh SVG" title="Download original SVG"><Download size={17} /></a>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <button type="button" onClick={inspect} data-figure-canvas={viewMode} aria-label={"Enlarge " + figure.title}
          className="flex min-h-[280px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-xl p-3 sm:min-h-[420px] sm:p-6">
          <img src={src} alt={figure.alt} className="max-h-[540px] w-full object-contain" loading="lazy" />
        </button>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <dl className="grid grid-cols-2 gap-4 rounded-xl bg-neutral-50 p-4">
            {figure.metrics.map(metric => <div key={metric.label}><dt className="text-[10px] text-neutral-500">{metric.label}</dt>
              <dd className={cn("mt-1 text-[13px] font-semibold tabular-nums", metric.tone === "cyan" ? "text-neutral-800" : metric.tone === "amber" ? "text-amber-800" : metric.tone === "violet" ? "text-neutral-800" : "text-neutral-800")}>{metric.value}</dd></div>)}
          </dl>
          <div className="rounded-xl bg-neutral-50 p-4"><h4 className="text-[12px] font-semibold">Temuan empiris & interpretasi</h4><p className="mt-2 text-[12px] leading-relaxed text-neutral-600">{figure.insight}</p></div>
        </div>
      </div>
    </div>
    {fullscreenOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#000000]/30 p-3 backdrop-blur-sm sm:p-6"
      onClick={() => setFullscreenOpen(false)}>
      <div ref={modal} role="dialog" aria-modal="true" aria-label={figure.title} tabIndex={-1}
        className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-surface shadow-sm" onClick={e => e.stopPropagation()}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 p-4">
          <h4 className="min-w-0 text-sm font-semibold">{figure.title}</h4>
          <div className="flex items-center gap-1">
            <button type="button" className="icon-button" onClick={() => setZoomLevel(z => Math.min(2.5, z + .25))} disabled={zoomLevel >= 2.5} aria-label="Zoom in"><ZoomIn size={17} /></button>
            <span className="w-10 text-center text-[11px] tabular-nums" aria-live="polite">{Math.round(zoomLevel * 100)}%</span>
            <button type="button" className="icon-button" onClick={() => setZoomLevel(z => Math.max(.75, z - .25))} disabled={zoomLevel <= .75} aria-label="Zoom out"><ZoomOut size={17} /></button>
            <button type="button" className="icon-button" onClick={() => setZoomLevel(1)} aria-label="Reset zoom"><RotateCcw size={16} /></button>
            <a href={src} download={figure.id + ".svg"} className="icon-button" aria-label="Download figure SVG"><Download size={17} /></a>
            <button type="button" className="icon-button" onClick={() => setFullscreenOpen(false)} aria-label="Close enlarged figure"><X size={19} /></button>
          </div>
        </div>
        <div className="overflow-auto p-4 sm:p-7" data-figure-canvas={viewMode}>
          <img src={src} alt={figure.alt} style={{ width: zoomLevel * 100 + "%", maxWidth: "none" }} className="mx-auto" />
        </div>
        <p className="border-t border-black/5 p-3 text-center text-[11px] text-neutral-600">{figure.subtitle}</p>
      </div>
    </div>}
  </>;
}
