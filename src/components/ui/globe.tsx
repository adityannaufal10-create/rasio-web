"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: Partial<COBEOptions> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 2,
  baseColor: [15 / 255, 23 / 255, 42 / 255],
  markerColor: [16 / 255, 185 / 255, 129 / 255],
  glowColor: [16 / 255, 185 / 255, 129 / 255],
  markers: [
    { location: [-0.7893, 113.9213], size: 0.08, color: [239 / 255, 68 / 255, 68 / 255] }, // Indonesia
    { location: [4.2105, 101.9758], size: 0.05, color: [239 / 255, 68 / 255, 68 / 255] }, // Malaysia
    { location: [14.0583, 108.2772], size: 0.05, color: [239 / 255, 68 / 255, 68 / 255] }, // Vietnam
    { location: [15.87, 100.9925], size: 0.05, color: [239 / 255, 68 / 255, 68 / 255] }, // Thailand
    { location: [12.8797, 121.774], size: 0.04, color: [245 / 255, 158 / 255, 11 / 255] }, // Philippines
    { location: [1.3521, 103.8198], size: 0.04, color: [59 / 255, 130 / 255, 246 / 255] }, // Singapore
    { location: [35.8617, 104.1954], size: 0.06, color: [59 / 255, 130 / 255, 246 / 255] }, // China
    { location: [20.5937, 78.9629], size: 0.06, color: [245 / 255, 158 / 255, 11 / 255] }, // India
    { location: [-35.2809, 149.13], size: 0.05, color: [139 / 255, 92 / 255, 246 / 255] }, // Australia
    { location: [36.2048, 138.2529], size: 0.04, color: [59 / 255, 130 / 255, 246 / 255] }, // Japan
  ],
};

export interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

export function Globe({ className, config = {} }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const phiRef = useRef(1.8);

  const mergedConfig = {
    ...GLOBE_CONFIG,
    ...config,
  };

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let animationId: number;

    const globe = createGlobe(canvas, {
      width: width * 2,
      height: width * 2,
      devicePixelRatio: mergedConfig.devicePixelRatio || 2,
      phi: mergedConfig.phi || 0,
      theta: mergedConfig.theta || 0.25,
      dark: mergedConfig.dark ?? 1,
      diffuse: mergedConfig.diffuse ?? 1.2,
      mapSamples: mergedConfig.mapSamples || 16000,
      mapBrightness: mergedConfig.mapBrightness || 2,
      baseColor: mergedConfig.baseColor || [15 / 255, 23 / 255, 42 / 255],
      markerColor: mergedConfig.markerColor || [16 / 255, 185 / 255, 129 / 255],
      glowColor: mergedConfig.glowColor || [16 / 255, 185 / 255, 129 / 255],
      markers: mergedConfig.markers || [],
      arcs: mergedConfig.arcs,
      arcColor: mergedConfig.arcColor,
      arcWidth: mergedConfig.arcWidth,
      scale: mergedConfig.scale || 1.05,
    });

    const loop = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.004;
      }
      globe.update({
        phi: phiRef.current + r,
        width: width * 2,
        height: width * 2,
      });
      animationId = requestAnimationFrame(loop);
    };

    loop();

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 50);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, [r]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export default Globe;
