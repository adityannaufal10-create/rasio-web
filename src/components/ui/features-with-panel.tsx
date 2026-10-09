import { useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  subtitle?: string;
  badge?: string;
  alt?: string;
  content: string | ReactNode;
  actionText?: string;
  actionHref?: string;
}
export function FeatureMedia({ content, alt, actionText, actionHref }: Pick<FeatureItem, "content" | "alt" | "actionText" | "actionHref">) {
  const isVideo = typeof content === "string" && /\.(mp4|webm|ogg)$/i.test(content);
  const isImage = typeof content === "string" && (/\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(content) || /unsplash|images\./i.test(content));
  return <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
    <div className="flex flex-1 items-center justify-center">
      {isVideo ? <video src={content as string} controls muted playsInline className="w-full rounded-xl" /> :
        isImage ? <img src={content as string} alt={alt || ""} className="w-full object-contain" /> :
          typeof content === "string" ? <p className="text-sm leading-relaxed text-neutral-600">{content}</p> : content}
    </div>
    {actionHref && actionText && <div className="mt-6 border-t border-black/5 pt-5"><a href={actionHref} className="grain-text-link">{actionText}<ChevronRight size={16} /></a></div>}
  </div>;
}
export interface FeaturesWithPanelProps {
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  items: FeatureItem[];
  defaultActive?: number;
  className?: string;
  panelClassName?: string;
  aspectRatio?: string;
}
export default function FeaturesWithPanel({ badge, heading, description, items, defaultActive = 0, className, panelClassName, aspectRatio }: FeaturesWithPanelProps) {
  const [active, setActive] = useState(defaultActive);
  const id = useId();
  const reduced = useReducedMotion();
  if (!items.length) return null;
  const selected = items[active] || items[0];
  return <section className={cn("relative w-full py-16 sm:py-24", className)}>
    <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
      {(heading || description) && <div className="mb-10 max-w-3xl">
        {heading && <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-semibold tracking-[-0.035em] text-neutral-950 leading-[1.12]">{heading}</h2>}
        {description && <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-neutral-600">{description}</p>}
      </div>}
      <div className="grid items-start gap-9 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <ul className="grain-feature-list">
          {items.map((item, index) => <li key={item.title}>
            <button type="button" id={id + "-choice-" + index} className="grain-feature-choice" onClick={() => setActive(index)}
              aria-expanded={active === index} aria-controls={id + "-panel-" + index}>
              <span className="min-w-0 flex-1"><h3>{item.title}</h3>
                {item.subtitle && <p>{item.subtitle}</p>}
                {item.badge && <span className="mt-2 inline-block text-[11px] font-medium text-neutral-800">{item.badge}</span>}
              </span><ChevronRight size={18} />
            </button>
            <div id={id + "-panel-" + index} role="region" aria-labelledby={id + "-choice-" + index} hidden={active !== index}>
              <div className="grain-feature-panel my-4 lg:hidden"><FeatureMedia {...item} /></div>
            </div>
          </li>)}
        </ul>
        <div className={cn("grain-feature-panel hidden lg:block sticky top-24 min-h-[360px]", panelClassName)} role="region" aria-label={selected.title}>
          <motion.div key={active} initial={{ opacity: .7, y: reduced ? 0 : 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .28, ease: [.16, 1, .3, 1] }}>
            <FeatureMedia {...selected} />
          </motion.div>
        </div>
      </div>
      {badge && <p className="mt-8 text-[11px] text-neutral-500">{badge}</p>}
    </div>
  </section>;
}
