import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { EVIDENCE_CARDS } from "./facts";

const FIGURES = [
  { title: "K-Means silhouette cohesion", src: "/figures/02_silhouette_light.svg", desc: "Evaluation at k=5 yields a score of 0.5336 with distinct cluster partitioning.", path: "/clustering" },
  { title: "Moran scatterplot 2024", src: "/figures/04_pencar_moran_light.svg", desc: "LISA quadrant distribution: 7 ASEAN economies dominate the High-High Hotspot quadrant.", path: "/spasial" },
  { title: "LeSage–Pace effect decomposition", src: "/figures/08_dekomposisi_efek_light.svg", desc: "Indirect nitrogen fertilizer spillovers exceed domestic direct impacts by 2.20-fold.", path: "/spasial" },
  { title: "64-Year ASEAN trajectory", src: "/figures/07_lintasan_asean_light.svg", desc: "Historical emission trajectories across 10 ASEAN member states from 1961 through 2024.", path: "/clustering" },
];
export default function EvidenceWall() {
  return <section id="evidence" aria-label="Empirical Evidence Wall" className="border-t border-black/5 py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1320px] gap-12 px-6 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <div>
        <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-semibold tracking-[-0.035em] leading-[1.12]">The data answers.<br /><span className="text-neutral-500">Explore the evidence.</span></h2>
        <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-neutral-600">Every conclusion in this prototype is grounded in a balanced panel of 44 economies across 64 consecutive years (1961–2024) spanning 2,816 observations with zero artificial interpolation.</p>
        <ul className="mt-7 divide-y divide-black/10">{EVIDENCE_CARDS.map(item => <li key={item.id} className="py-5">
          <h3 className="text-[16px] font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{item.desc}</p>
          <span className="mt-2 inline-block text-[10px] text-neutral-500">{item.id} · {item.type}</span>
        </li>)}</ul>
      </div>
      <div className="grain-evidence-gallery">
        {FIGURES.map(figure => <figure key={figure.src}>
          <Link to={figure.path} aria-label={"Inspect " + figure.title}><img src={figure.src} alt={figure.title} loading="lazy" /></Link>
          <figcaption>{figure.title}</figcaption><p>{figure.desc}</p>
          <Link to={figure.path} className="grain-text-link mt-4 text-xs">Inspect the analysis<ChevronRight size={14} /></Link>
        </figure>)}
      </div>
    </div>
  </section>;
}
