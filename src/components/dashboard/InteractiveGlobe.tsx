"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createGlobe, { Marker, Arc } from "cobe";
import { CountryCluster, LisaData } from "@/types/data";
import { CLUSTER_COLORS } from "@/landing/facts";
import {
  Compass,
  RotateCw,
  MapPin,
  Flame,
  Wind,
  Layers,
  Activity,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InteractiveGlobeProps {
  countries: CountryCluster[];
  lisaData: LisaData[];
  selectedCountry: CountryCluster | null;
  onSelectCountry: (country: CountryCluster) => void;
  activeLayer: "cluster" | "lisa" | "luc" | "ch4";
  filterAseanOnly: boolean;
  isVisible?: boolean;
}

// Regional Spillover Stream Arcs (LeSage-Pace SDM Spillover)
const SPILLOVER_ARCS: Array<{ from: [number, number]; to: [number, number] }> = [
  { from: [-0.7893, 113.9213], to: [4.2105, 101.9758] }, // Indonesia -> Malaysia
  { from: [-0.7893, 113.9213], to: [14.0583, 108.2772] }, // Indonesia -> Vietnam
  { from: [-0.7893, 113.9213], to: [15.87, 100.9925] }, // Indonesia -> Thailand
  { from: [-0.7893, 113.9213], to: [12.8797, 121.774] }, // Indonesia -> Filipina
  { from: [-0.7893, 113.9213], to: [1.3521, 103.8198] }, // Indonesia -> Singapura
  { from: [4.2105, 101.9758], to: [15.87, 100.9925] }, // Malaysia -> Thailand
  { from: [15.87, 100.9925], to: [14.0583, 108.2772] }, // Thailand -> Vietnam
  { from: [14.0583, 108.2772], to: [12.5657, 104.991] }, // Vietnam -> Kamboja
  { from: [15.87, 100.9925], to: [19.8563, 102.4955] }, // Thailand -> Laos
];

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  countries,
  lisaData,
  selectedCountry,
  onSelectCountry,
  activeLayer,
  filterAseanOnly,
  isVisible = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [hoveredCountry, setHoveredCountry] = useState<CountryCluster | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Rotation angles: default to facing ASEAN center (lon: 108.5, lat: 6.0)
  const phiRef = useRef((1.5 * Math.PI) - ((108.5 * Math.PI) / 180));
  const thetaRef = useRef((6.0 * Math.PI) / 180);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);
  const isAutoRotateRef = useRef(isAutoRotate);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Precise spherical coordinate focusing: aligns [lon, lat] directly facing viewer
  const focusToCoordinates = useCallback((lon: number, lat: number) => {
    const rawTargetPhi = (1.5 * Math.PI) - ((lon * Math.PI) / 180);
    const rawTargetTheta = Math.max(-0.6, Math.min(0.6, (lat * Math.PI) / 180));

    // Calculate shortest direct rotational path
    const currentPhi = phiRef.current;
    let delta = (rawTargetPhi - (currentPhi % (2 * Math.PI))) % (2 * Math.PI);
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;

    targetPhiRef.current = currentPhi + delta;
    targetThetaRef.current = rawTargetTheta;
    setIsAutoRotate(false);
  }, []);

  // Safe container width resolver (prevents 0 width bugs)
  const getWidth = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 600;
    const w =
      canvas.offsetWidth ||
      canvas.parentElement?.offsetWidth ||
      (canvas.parentElement?.parentElement?.offsetWidth ? canvas.parentElement.parentElement.offsetWidth - 32 : 0);
    return w && w > 80 ? w : 600;
  }, []);

  // Lookup LISA map
  const lisaMap = useMemo(() => {
    const map = new Map<string, LisaData>();
    lisaData.forEach((item) => map.set(item.country, item));
    return map;
  }, [lisaData]);

  // Filter countries
  const displayCountries = useMemo(() => {
    return countries.filter((c) => (filterAseanOnly ? c.is_asean === 1 : true));
  }, [countries, filterAseanOnly]);

  // Compute markers with precise scales
  const markers: Marker[] = useMemo(() => {
    return displayCountries.map((c) => {
      const isSelected = selectedCountry?.country === c.country;
      const isHovered = hoveredCountry?.country === c.country;

      let color: [number, number, number] = [16 / 255, 185 / 255, 129 / 255];
      let size = c.is_asean ? 0.05 : 0.035;

      if (activeLayer === "cluster") {
        if (c.klaster === 2) color = [239 / 255, 68 / 255, 68 / 255]; // Frontier (Red)
        else if (c.klaster === 4) color = [245 / 255, 158 / 255, 11 / 255]; // Padat Penduduk (Amber)
        else if (c.klaster === 0) color = [59 / 255, 130 / 255, 246 / 255]; // Industri Mapan (Blue)
        else if (c.klaster === 1) color = [139 / 255, 92 / 255, 246 / 255]; // Peternakan Ekstensif (Purple)
        else color = [148 / 255, 163 / 255, 184 / 255]; // Petro-Ekonomi (Slate)

        size = c.is_asean ? 0.055 : 0.038;
      } else if (activeLayer === "lisa") {
        const lisa = lisaMap.get(c.country);
        if (lisa?.lisa === "High-High") {
          color = [220 / 255, 38 / 255, 38 / 255]; // Hotspot Red
          size = 0.065;
        } else if (lisa?.lisa === "Low-High") {
          color = [147 / 255, 51 / 255, 234 / 255]; // Spatial Outlier Purple
          size = 0.05;
        } else if (lisa?.lisa === "Low-Low") {
          color = [37 / 255, 99 / 255, 235 / 255]; // Coldspot Blue
          size = 0.04;
        } else {
          color = [100 / 255, 116 / 255, 139 / 255]; // Insignificant
          size = 0.03;
        }
      } else if (activeLayer === "luc") {
        // Safe scaling for CO2 Lahan (LUC), considering min negative to max 4.35
        const val = typeof c.luc_pc === "number" ? c.luc_pc : 0;
        if (val > 3.0) {
          color = [239 / 255, 68 / 255, 68 / 255]; // Episentrum Merah
          size = 0.08;
        } else if (val > 1.5) {
          color = [245 / 255, 158 / 255, 11 / 255]; // Amber
          size = 0.06;
        } else if (val > 0.3) {
          color = [234 / 255, 179 / 255, 8 / 255]; // Kuning
          size = 0.045;
        } else {
          color = [16 / 255, 185 / 255, 129 / 255]; // Emerald
          size = 0.035;
        }
      } else if (activeLayer === "ch4") {
        // Safe scaling for Metana (CH4)
        const val = typeof c.ch4_pc === "number" ? c.ch4_pc : 0;
        if (val > 4.0) {
          color = [168 / 255, 85 / 255, 247 / 255]; // Purple high
          size = 0.085;
        } else if (val > 1.8) {
          color = [59 / 255, 130 / 255, 246 / 255]; // Blue
          size = 0.065;
        } else if (val > 0.8) {
          color = [6 / 255, 182 / 255, 212 / 255]; // Cyan ASEAN
          size = 0.05;
        } else {
          color = [16 / 255, 185 / 255, 129 / 255]; // Emerald
          size = 0.035;
        }
      }

      if (isSelected || isHovered) {
        size *= 1.45;
      }

      return {
        location: [c.lat, c.lon],
        size,
        color,
        id: c.country,
      };
    });
  }, [displayCountries, activeLayer, lisaMap, selectedCountry, hoveredCountry]);

  // Arcs for spatial spillover
  const arcs: Arc[] = useMemo(() => {
    if (activeLayer !== "cluster" && activeLayer !== "lisa") return [];
    return SPILLOVER_ARCS.map((arc, i) => ({
      from: arc.from,
      to: arc.to,
      color: [6 / 255, 182 / 255, 212 / 255],
      id: `arc-${i}`,
    }));
  }, [activeLayer]);

  // Reference for markers & arcs to update without recreating globe
  const markersRef = useRef<Marker[]>(markers);
  const arcsRef = useRef<Arc[]>(arcs);

  useEffect(() => {
    markersRef.current = markers;
    arcsRef.current = arcs;
  }, [markers, arcs]);

  // Smoothly center globe to selected country
  useEffect(() => {
    if (selectedCountry && typeof selectedCountry.lat === "number" && typeof selectedCountry.lon === "number") {
      focusToCoordinates(selectedCountry.lon, selectedCountry.lat);
    }
  }, [selectedCountry, focusToCoordinates]);

  // COBE Initialization — RUNS ONCE ON MOUNT ONLY
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialW = getWidth();

    let animationFrameId: number;

    const globe = createGlobe(canvas, {
      width: initialW * 2,
      height: initialW * 2,
      devicePixelRatio: 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 2.2,
      baseColor: [15 / 255, 23 / 255, 42 / 255],
      markerColor: [16 / 255, 185 / 255, 129 / 255],
      glowColor: [16 / 255, 185 / 255, 129 / 255],
      markers: markersRef.current,
      arcs: arcsRef.current,
      arcWidth: 1.2,
      arcHeight: 0.22,
      arcColor: [6 / 255, 182 / 255, 212 / 255],
      scale: 1.05,
      offset: [0, 0],
    });

    globeRef.current = globe;

    const render = () => {
      if (isVisibleRef.current) {
        if (targetPhiRef.current !== null && targetThetaRef.current !== null) {
          const dPhi = targetPhiRef.current - phiRef.current;
          const dTheta = targetThetaRef.current - thetaRef.current;
          phiRef.current += dPhi * 0.08;
          thetaRef.current += dTheta * 0.08;

          if (Math.abs(dPhi) < 0.005 && Math.abs(dTheta) < 0.005) {
            targetPhiRef.current = null;
            targetThetaRef.current = null;
          }
        } else if (isAutoRotateRef.current && pointerInteracting.current === null) {
          phiRef.current += 0.0035;
        }

        const currentW = getWidth();

        globe.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          width: currentW * 2,
          height: currentW * 2,
          markers: markersRef.current,
          arcs: arcsRef.current,
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    requestAnimationFrame(() => {
      if (canvas) canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      globeRef.current = null;
    };
  }, [getWidth]);

  // Re-awaken globe and force repaint whenever isVisible turns true
  useEffect(() => {
    if (isVisible && globeRef.current) {
      const w = getWidth();
      globeRef.current.update({
        width: w * 2,
        height: w * 2,
        markers: markersRef.current,
        arcs: arcsRef.current,
      });
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }
  }, [isVisible, getWidth]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    pointerInteractionMovement.current = phiRef.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = (e.clientX - pointerInteracting.current) / 180;
      phiRef.current = pointerInteractionMovement.current + deltaX;
      setIsAutoRotate(false);
    }
  };

  // The country to inspect (hovered takes priority, then selected, or default Indonesia)
  const defaultIndonesia = useMemo(() => {
    return countries.find((c) => c.country === "Indonesia") || countries[0] || null;
  }, [countries]);

  const inspectorCountry = hoveredCountry || selectedCountry || defaultIndonesia;
  const inspectorLisa = inspectorCountry ? lisaMap.get(inspectorCountry.country) : null;

  return (
    <div className="relative w-full overflow-hidden bg-[#070b14] min-h-[620px] flex items-center justify-center p-2 sm:p-4">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.06)_40%,transparent_75%)]" />

      {/* 3D Canvas Viewport */}
      <div className="relative aspect-square w-full max-w-[620px] p-2 flex items-center justify-center my-auto">
        <canvas
          ref={canvasRef}
          className="size-full opacity-0 transition-opacity duration-700 cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
        />
      </div>

      {/* LEFT OVERLAY: SCIENTIFIC LEGEND & CONTEXT */}
      <div className="absolute top-4 left-4 z-20 max-w-[270px] space-y-2.5 hidden md:block">
        <Card className="p-3.5 bg-slate-900/90 border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2.5">
            <Layers className="size-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {activeLayer === "cluster" && "Tipologi 5 Klaster"}
              {activeLayer === "lisa" && "LISA Hotspot 2024"}
              {activeLayer === "luc" && "CO₂ Lahan (LUC)"}
              {activeLayer === "ch4" && "Metana Pertanian (CH₄)"}
            </span>
          </div>

          {activeLayer === "cluster" && (
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#ef4444]" />
                <span className="text-white font-medium">Frontier Konversi (7 ASEAN)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#f59e0b]" />
                <span className="text-slate-300">Padat Penduduk (Filipina)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#3b82f6]" />
                <span className="text-slate-300">Industri Mapan (Singapura)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#8b5cf6]" />
                <span className="text-slate-300">Peternakan Ekstensif (Brunei)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#64748b]" />
                <span className="text-slate-300">Petro-Ekonomi Pengimpor</span>
              </div>
              <p className="pt-1.5 text-[10.5px] text-slate-400 border-t border-white/5">
                Busur cyan menandai keterkaitan limpahan ekonometrika antarnegara ASEAN.
              </p>
            </div>
          )}

          {activeLayer === "lisa" && (
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#dc2626]" />
                <span className="text-white font-medium">High-High Hotspot (7 ASEAN)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#9333ea]" />
                <span className="text-slate-300">Low-High: Spatial Outlier</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#2563eb]" />
                <span className="text-slate-300">Low-Low: Coldspot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0 bg-[#64748b]" />
                <span className="text-slate-400">Tidak Signifikan (p &gt; 0,05)</span>
              </div>
              <p className="pt-1.5 text-[10.5px] text-emerald-400 border-t border-white/5 font-mono">
                Moran's I = +0,729 (p &lt; 0,001)
              </p>
            </div>
          )}

          {activeLayer === "luc" && (
            <div className="space-y-2 text-[11.5px]">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Net Konservasi</span>
                <span className="text-red-400 font-bold">&gt; 3,0 t CO₂/kap</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
              <div className="pt-1 text-[11px] text-slate-300 space-y-1">
                <p>
                  Pangsa ASEAN: <strong className="text-red-400 font-mono">22,78% Dunia</strong>
                </p>
                <p>
                  Episentrum: <strong className="text-white">Indonesia (12,57%)</strong>
                </p>
              </div>
            </div>
          )}

          {activeLayer === "ch4" && (
            <div className="space-y-2 text-[11.5px]">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Rendah (&lt; 0,8 t)</span>
                <span className="text-purple-400 font-bold">&gt; 4,0 t (Tinggi)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500" />
              <div className="pt-1 text-[11px] text-slate-300 space-y-1">
                <p>
                  Sumber utama: <strong className="text-cyan-300">Padi sawah & ternak</strong>
                </p>
                <p>
                  ASEAN rata-rata: <strong className="text-white font-mono">~1,02 t CO₂eq</strong>
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Rotation and Focus Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAutoRotate((r) => !r);
              targetPhiRef.current = null;
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl transition-all shadow-lg",
              isAutoRotate
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                : "border-white/10 bg-slate-900/80 text-slate-400 hover:text-white"
            )}
          >
            <RotateCw className={cn("size-3.5", isAutoRotate && "animate-spin")} style={{ animationDuration: "10s" }} />
            <span>{isAutoRotate ? "Rotasi Aktif" : "Rotasi Diam"}</span>
          </button>

          <button
            onClick={() => {
              focusToCoordinates(108.5, 6.0);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-emerald-500/40 hover:text-white backdrop-blur-xl transition-all shadow-lg"
          >
            <Compass className="size-3.5 text-emerald-400" />
            <span>Fokus ASEAN</span>
          </button>
        </div>
      </div>

      {/* RIGHT OVERLAY: LIVE COUNTRY INSPECTOR CARD */}
      {inspectorCountry && (
        <Card className="absolute top-4 right-4 z-20 w-[300px] p-4 bg-slate-900/95 border-emerald-500/40 shadow-2xl backdrop-blur-2xl transition-all duration-300 hidden lg:block">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                {hoveredCountry ? "Sorotan Kursor" : selectedCountry ? "Negara Terpilih" : "Episentrum Kawasan"}
              </span>
              <h4 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                <MapPin className="size-4 text-emerald-400" />
                <span>{inspectorCountry.country}</span>
              </h4>
            </div>
            {inspectorCountry.is_asean === 1 && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                ASEAN-10
              </span>
            )}
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {/* Cluster Tag */}
            <div className="flex justify-between items-center rounded-lg bg-slate-800/60 p-2 border border-white/5">
              <span className="text-slate-400">Tipologi:</span>
              <span
                className="font-bold text-[11.5px] truncate max-w-[150px]"
                style={{ color: CLUSTER_COLORS[inspectorCountry.klaster] }}
              >
                {inspectorCountry.nama_klaster}
              </span>
            </div>

            {/* LISA Status */}
            <div className="flex justify-between items-center px-1">
              <span className="text-slate-400">Signifikansi LISA:</span>
              <span
                className={cn(
                  "font-mono font-bold text-[11.5px]",
                  inspectorLisa?.lisa === "High-High"
                    ? "text-red-400"
                    : inspectorLisa?.lisa === "Low-High"
                    ? "text-purple-400"
                    : "text-slate-300"
                )}
              >
                {inspectorLisa?.lisa || "Tidak signifikan"}
              </span>
            </div>

            {/* 4 Multi-Emission Metrics */}
            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[11.5px] font-mono">
              <div className="rounded-lg bg-slate-800/40 p-2 border border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-sans">
                  <Flame className="size-3 text-red-400" />
                  <span>CO₂ Lahan (LUC)</span>
                </div>
                <p className="font-bold text-white text-sm mt-0.5">
                  {inspectorCountry.luc_pc.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal text-slate-400 font-sans">t/kap</span>
                </p>
              </div>

              <div className="rounded-lg bg-slate-800/40 p-2 border border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-sans">
                  <Wind className="size-3 text-cyan-400" />
                  <span>Metana (CH₄)</span>
                </div>
                <p className="font-bold text-cyan-400 text-sm mt-0.5">
                  {inspectorCountry.ch4_pc.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal text-slate-400 font-sans">t/kap</span>
                </p>
              </div>

              <div className="rounded-lg bg-slate-800/40 p-2 border border-white/5">
                <span className="text-[10px] text-slate-400 font-sans block">N₂O Pupuk</span>
                <p className="font-bold text-amber-300 text-sm mt-0.5">
                  {inspectorCountry.n2o_pc.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal text-slate-400 font-sans">t/kap</span>
                </p>
              </div>

              <div className="rounded-lg bg-slate-800/40 p-2 border border-white/5">
                <span className="text-[10px] text-slate-400 font-sans block">CO₂ Energi</span>
                <p className="font-bold text-slate-200 text-sm mt-0.5">
                  {inspectorCountry.co2_pc.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal text-slate-400 font-sans">t/kap</span>
                </p>
              </div>
            </div>

            {/* Select Button */}
            <button
              onClick={() => onSelectCountry(inspectorCountry)}
              className="w-full mt-2 py-1.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs hover:bg-emerald-500 hover:text-slate-950 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="size-3.5" />
              <span>{selectedCountry?.country === inspectorCountry.country ? "Negara Aktif" : "Pilih Negara Ini"}</span>
            </button>
          </div>
        </Card>
      )}

      {/* BOTTOM COMPACT QUICK-FOCUS DOCK */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl max-w-[94vw]">
        <div className="flex items-center gap-1.5 px-2 text-[11px] font-mono text-slate-400 shrink-0">
          <MapPin className="size-3 text-emerald-400" />
          <span className="font-bold hidden sm:inline">Fokus:</span>
        </div>

        {/* ASEAN Key Focus Chips */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-[55vw] sm:max-w-none">
          {displayCountries
            .filter((c) => ["Indonesia", "Malaysia", "Vietnam", "Thailand", "Philippines", "Singapore"].includes(c.country))
            .map((c) => {
              const isSelected = selectedCountry?.country === c.country;
              const isHovered = hoveredCountry?.country === c.country;
              return (
                <button
                  key={c.country}
                  onClick={() => onSelectCountry(c)}
                  onMouseEnter={() => setHoveredCountry(c)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={cn(
                    "px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5",
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm"
                      : isHovered
                      ? "bg-slate-800 text-white border-emerald-500/50"
                      : "bg-slate-800/80 text-slate-300 border-white/5 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: CLUSTER_COLORS[c.klaster] || "#10b981" }}
                  />
                  <span>{c.country}</span>
                </button>
              );
            })}
        </div>

        {/* Dropdown Selector for All 44 Countries */}
        <div className="relative shrink-0 border-l border-white/10 pl-2">
          <select
            value={selectedCountry?.country || ""}
            onChange={(e) => {
              const found = countries.find((c) => c.country === e.target.value);
              if (found) {
                onSelectCountry(found);
                setHoveredCountry(found);
              }
            }}
            className="bg-slate-800/90 text-slate-200 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-medium outline-none cursor-pointer hover:border-emerald-500/40 focus:border-emerald-500 max-w-[130px] sm:max-w-[170px] truncate"
          >
            <option value="" disabled>
              Semua {countries.length} Negara…
            </option>
            <optgroup label="ASEAN-10">
              {countries
                .filter((c) => c.is_asean === 1)
                .map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country} ({c.nama_klaster.split(" ")[0]})
                  </option>
                ))}
            </optgroup>
            <optgroup label="Asia-Pasifik Non-ASEAN">
              {countries
                .filter((c) => c.is_asean !== 1)
                .map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country} ({c.nama_klaster.split(" ")[0]})
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
