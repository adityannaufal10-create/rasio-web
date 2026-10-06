"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  subtitle?: string;
  badge?: string;
  alt?: string;
  content: string | React.ReactNode;
  actionText?: string;
  actionHref?: string;
}

export function FeatureMedia({
  content,
  alt,
  actionText,
  actionHref,
}: {
  content: string | React.ReactNode;
  alt?: string;
  actionText?: string;
  actionHref?: string;
}) {
  if (typeof content !== "string") {
    return (
      <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
        <div className="flex flex-1 items-center justify-center">
          {content}
        </div>
        {actionHref && actionText && (
          <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-4">
            <a
              href={actionHref}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <span>{actionText}</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        )}
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|ogg)$/i.test(content);
  const isImage =
    /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(content) ||
    /unsplash|images\./i.test(content);

  if (isVideo) {
    return (
      <video
        src={content}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  if (isImage) {
    return (
      <img src={content} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-center">
      <p className="text-sm leading-relaxed text-slate-400">{content}</p>
    </div>
  );
}

export interface FeaturesWithPanelProps {
  badge?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  items: FeatureItem[];
  defaultActive?: number;
  className?: string;
  panelClassName?: string;
  aspectRatio?: string;
}

export default function FeaturesWithPanel({
  badge,
  heading,
  description,
  items,
  defaultActive = 0,
  className,
  panelClassName,
  aspectRatio = "aspect-4/3",
}: FeaturesWithPanelProps) {
  const [active, setActive] = React.useState(defaultActive);

  return (
    <section className={cn("relative w-full py-20 sm:py-24", className)}>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        {(badge || heading || description) && (
          <div className="mb-12 max-w-3xl">
            {badge && (
              <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            {heading && (
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-white leading-tight">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-400">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left Column: Interactive List */}
          <div>
            <ul className="flex flex-col gap-2.5">
              {items.map((item, index) => {
                const isActive = active === index;
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    onClick={() => setActive(index)}
                    className={cn(
                      "group flex flex-col rounded-2xl p-4 cursor-pointer transition-all duration-300 border",
                      isActive
                        ? "border-emerald-500/50 bg-slate-900/90 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/30"
                        : "border-white/5 bg-slate-900/40 hover:border-white/10 hover:bg-slate-900/70",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Number Indicator */}
                      <span
                        className={cn(
                          "size-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-300 border",
                          isActive
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                            : "bg-slate-800/80 text-slate-400 border-white/5 group-hover:text-slate-200 group-hover:border-white/10",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Title & Subtitle */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={cn(
                              "text-[15px] sm:text-[15.5px] font-bold tracking-tight transition-colors duration-200",
                              isActive
                                ? "text-white"
                                : "text-slate-300 group-hover:text-white",
                            )}
                          >
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10.5px] font-mono font-semibold border",
                                isActive
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : "bg-slate-800 text-slate-400 border-white/5",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {item.subtitle && (
                          <p
                            className={cn(
                              "mt-1 text-[13px] leading-relaxed transition-colors duration-200",
                              isActive
                                ? "text-slate-300"
                                : "text-slate-400 group-hover:text-slate-300",
                            )}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mobile Accordion Panel */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="w-full overflow-hidden lg:hidden"
                        >
                          <Card
                            className={cn(
                              "w-full mt-4 overflow-hidden p-0 gap-0 border-emerald-500/30 bg-slate-950/90 shadow-2xl backdrop-blur-2xl",
                              aspectRatio,
                            )}
                          >
                            <div className="h-full w-full">
                              <FeatureMedia
                                content={item.content}
                                alt={item.alt}
                                actionText={item.actionText}
                                actionHref={item.actionHref}
                              />
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Desktop Sticky Panel */}
          <div className="hidden lg:block sticky top-24">
            <Card
              className={cn(
                "relative w-full overflow-hidden p-0 gap-0 border-emerald-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-2xl ring-1 ring-emerald-500/20",
                aspectRatio,
                panelClassName,
              )}
            >
              {/* Subtle Ambient Radial Glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full w-full"
                >
                  <FeatureMedia
                    content={items[active].content}
                    alt={items[active].alt}
                    actionText={items[active].actionText}
                    actionHref={items[active].actionHref}
                  />
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
