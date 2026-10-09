import { type ReactNode } from "react";
import { ChartNoAxesColumn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

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
export function StatTile({ label, value, unit, subtext, badge, icon, className }: StatTileProps) {
  return <Card className={cn("grain-kpi-card", className)}>
    <div className="grain-kpi-heading">
      <span className="grain-card-symbol" aria-hidden="true">{icon || <ChartNoAxesColumn size={19} strokeWidth={1.7} />}</span>
      <h3>{label}</h3>
    </div>
    <div className="grain-kpi-value"><strong>{value}</strong>{unit && <span>{unit}</span>}</div>
    {subtext && <p className="grain-kpi-description">{subtext}</p>}
    {badge && <span className="grain-kpi-badge">{badge}</span>}
  </Card>;
}
export default StatTile;
