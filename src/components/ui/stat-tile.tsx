import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StatTileProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  badge?: string;
  tone?: "emerald" | "cyan" | "amber" | "crimson" | "violet" | "default";
  icon?: ReactNode;
  className?: string;
}

export function StatTile({
  label,
  value,
  unit,
  subtext,
  badge,
  tone = "default",
  icon,
  className,
}: StatTileProps) {
  const toneMap = {
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    crimson: "text-red-400 border-red-500/30 bg-red-500/10",
    violet: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    default: "text-slate-100 border-white/10 bg-slate-800/40",
  };

  const badgeToneMap = {
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    crimson: "bg-red-500/15 text-red-300 border-red-500/30",
    violet: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    default: "bg-slate-800/60 text-slate-300 border-white/10",
  };

  const toneGlowMap = {
    emerald: "hover:border-emerald-500/40 hover:shadow-emerald-950/20",
    cyan: "hover:border-cyan-500/40 hover:shadow-cyan-950/20",
    amber: "hover:border-amber-500/40 hover:shadow-amber-950/20",
    crimson: "hover:border-red-500/40 hover:shadow-red-950/20",
    violet: "hover:border-purple-500/40 hover:shadow-purple-950/20",
    default: "hover:border-slate-700 hover:shadow-slate-900/40",
  };

  return (
    <Card
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-0.5",
        toneGlowMap[tone],
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors">
          {label}
        </CardTitle>
        <div className="flex items-center gap-2">
          {badge && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-tight",
                badgeToneMap[tone]
              )}
            >
              {badge}
            </span>
          )}
          {icon && (
            <div className="text-slate-400 group-hover:text-white transition-colors size-4.5 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-1">
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-[clamp(1.75rem,2.4vw,2.25rem)] font-extrabold tracking-tight font-mono tabular-nums leading-none",
              toneMap[tone].split(" ")[0]
            )}
          >
            {value}
          </span>
          {unit && (
            <span className="text-[13px] font-medium text-slate-400 font-sans">
              {unit}
            </span>
          )}
        </div>
        {subtext && (
          <p className="mt-2 text-[12px] text-slate-400 leading-snug group-hover:text-slate-300 transition-colors">
            {subtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default StatTile;
