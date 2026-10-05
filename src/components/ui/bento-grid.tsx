import type { ElementType, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function BentoColumn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex min-w-0 flex-col gap-5 [&>*]:grow", className)}>{children}</div>;
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  visualClassName,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: ElementType;
  description: ReactNode;
  href: string;
  cta: string;
  visualClassName?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-slate-900/70 backdrop-blur-xl shadow-xl",
        "transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-0.5",
        className
      )}
    >
      <div className={cn("relative flex flex-1 items-center justify-center p-5 sm:p-6", visualClassName)} aria-hidden="true">
        {background}
      </div>
      <div className="relative flex flex-col gap-1.5 p-5 sm:p-6 pt-3 border-t border-white/5 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-emerald-400" strokeWidth={1.8} aria-hidden="true" />
          <h3 className="text-[17px] font-bold text-white tracking-tight">{name}</h3>
        </div>
        <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-slate-400">{description}</p>
        <a
          href={href}
          className="mt-2.5 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors after:absolute after:inset-0 after:content-['']"
        >
          {cta}
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function BentoCell({
  children,
  span = 1,
  className,
  title,
  description,
}: {
  children: ReactNode;
  span?: 1 | 2 | 3;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-200 hover:border-slate-700/80",
        span === 2 && "md:col-span-2",
        span === 3 && "lg:col-span-3",
        className
      )}
    >
      {(title || description) && (
        <div className="border-b border-white/5 px-5 py-4 sm:px-6">
          {title && <h3 className="text-sm sm:text-base font-bold text-white">{title}</h3>}
          {description && <p className="mt-0.5 text-xs text-slate-400">{description}</p>}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
