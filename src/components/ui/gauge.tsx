import { useId } from "react";
import { cn } from "@/lib/utils";

export interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  warning?: number;
  critical?: number;
  className?: string;
  label?: string;
  unit?: string;
  precision?: number;
}

const START = Math.PI;
const SWEEP = Math.PI;

export function Gauge({
  value,
  min = 0,
  max = 1,
  warning = 0.5,
  critical = 0.8,
  className,
  label,
  unit = "",
  precision = 2,
}: GaugeProps) {
  const id = useId().replace(/:/g, "");

  const frac = (v: number) => Math.min(1, Math.max(0, (v - min) / (max - min)));

  const cx = 100;
  const cy = 100;
  const r = 74;
  const rb = 90;

  const pt = (f: number, rr = r) =>
    [cx + rr * Math.cos(START + SWEEP * f), cy + rr * Math.sin(START + SWEEP * f)] as const;

  const arc = (a: number, b: number, rr = r) => {
    const [x1, y1] = pt(a, rr);
    const [x2, y2] = pt(b, rr);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${rr} ${rr} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const fv = Math.max(0.015, frac(value));
  const fw = frac(warning);
  const fc = frac(critical);

  const [vx, vy] = pt(fv, r);

  const col =
    value >= critical
      ? "var(--danger)"
      : value >= warning
      ? "var(--caution)"
      : "var(--accent)";

  return (
    <svg
      viewBox="0 0 200 115"
      className={cn("block w-full overflow-visible", className)}
      role="img"
      aria-label={label ?? `Gauge value ${value}${unit}`}
    >
      <defs>
        <linearGradient
          id={`g${id}`}
          gradientUnits="userSpaceOnUse"
          x1="26"
          y1="100"
          x2={vx.toFixed(1)}
          y2={vy.toFixed(1)}
        >
          <stop offset="0" style={{ stopColor: col, stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: col, stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Threshold bands */}
      <path d={arc(0, fw, rb)} fill="none" style={{ stroke: "var(--accent)" }} strokeOpacity="0.45" strokeWidth="2.5" />
      <path d={arc(fw, fc, rb)} fill="none" style={{ stroke: "var(--caution)" }} strokeOpacity="0.65" strokeWidth="2.5" />
      <path d={arc(fc, 1, rb)} fill="none" style={{ stroke: "var(--danger)" }} strokeOpacity="0.75" strokeWidth="2.5" />

      {/* Background track */}
      <path d={arc(0, 1)} fill="none" style={{ stroke: "rgba(255, 255, 255, 0.08)" }} strokeWidth="14" strokeLinecap="round" />

      {/* Value filled arc */}
      <path
        d={arc(0, fv)}
        fill="none"
        stroke={`url(#g${id})`}
        strokeWidth="14"
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />

      {/* Indicator point */}
      <circle cx={vx} cy={vy} r="5" style={{ fill: "var(--ink-hi)", stroke: col }} strokeWidth="2.5" />

      {/* Center value readout */}
      <text
        x="100"
        y="96"
        textAnchor="middle"
        className="fill-slate-100 font-mono text-[24px] font-bold tracking-tight"
      >
        {value.toFixed(precision)}
        <tspan className="text-[12px] font-normal fill-slate-400 font-sans ml-1"> {unit}</tspan>
      </text>
    </svg>
  );
}

export default Gauge;
