import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
  reducedMotion?: boolean;
}
const DEFAULT_CONFIG: Partial<COBEOptions> = {
  phi: 1.8, theta: .3, dark: 0, diffuse: 1.4, mapSamples: 16000, mapBrightness: 5,
  baseColor: [.88,.91,.9], markerColor: [.02,.48,.35], glowColor: [.95,.96,.95], markers: [],
};

export function Globe({ className, config = DEFAULT_CONFIG, reducedMotion = false }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<number | null>(null);
  const rotation = useRef(config.phi ?? 1.8);
  const reduced = useRef(reducedMotion);
  reduced.current = reducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.clientWidth;
    let visible = true;
    let frame = 0;
    const options = { ...DEFAULT_CONFIG, ...config };
    const globe = createGlobe(canvas, {
      ...options, width: width * 2, height: width * 2, devicePixelRatio: 2, scale: 1.05,
    } as COBEOptions);
    const resize = new ResizeObserver(() => { width = canvas.clientWidth; });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(canvas);
    let lastTime = 0;
    const render = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, .05);
      lastTime = time;
      if (visible && !document.hidden) {
        if (pointer.current === null && !reduced.current) rotation.current += .09 * deltaTime;
        globe.update({ phi: rotation.current, width: width * 2, height: width * 2 });
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); globe.destroy(); };
  }, [config]);

  return <div className={cn("relative mx-auto aspect-square w-full max-w-[580px]", className)}>
    <canvas ref={canvasRef} className="size-full cursor-grab active:cursor-grabbing"
      role="img" aria-label="Globe showing 44 Asia-Pacific economies, colored by agrifood cluster. Open Cartography for accessible country details."
      onPointerDown={e => { pointer.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => {
        if (pointer.current === null) return;
        rotation.current += (e.clientX - pointer.current) / 220;
        pointer.current = e.clientX;
      }}
      onPointerUp={() => { pointer.current = null; }}
      onPointerCancel={() => { pointer.current = null; }}
      onLostPointerCapture={() => { pointer.current = null; }}
      style={{ touchAction: "pan-y" }}
    />
  </div>;
}
export default Globe;
