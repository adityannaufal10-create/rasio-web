import { Quote } from "lucide-react";
import { EVIDENCE_CARDS, FACTS } from "./facts";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SVG_EVIDENCE = [
  {
    title: "Silhouette Kohesi K-Means",
    src: "/figures/02_silhouette.svg",
    desc: "Evaluasi k=5 menghasilkan skor 0,5336 dengan pemisahan klaster frontier yang tegas.",
  },
  {
    title: "Moran Scatterplot 2024",
    src: "/figures/04_pencar_moran.svg",
    desc: "Distribusi kuadran LISA: 7 negara ASEAN dominan di kuadran High-High Hotspot.",
  },
  {
    title: "Dekomposisi Efek LeSage-Pace",
    src: "/figures/08_dekomposisi_efek.svg",
    desc: "Limpahan tak langsung pupuk nitrogen melampaui efek domestik sebesar 2,20×.",
  },
  {
    title: "Lintasan ASEAN 64 Tahun",
    src: "/figures/07_lintasan_asean.svg",
    desc: "Trajektori emisi historis 10 negara anggota ASEAN dari 1961 hingga 2024.",
  },
];

export default function EvidenceWall() {
  const col1 = EVIDENCE_CARDS.slice(0, 3);
  const col2 = EVIDENCE_CARDS.slice(3, 5);

  return (
    <section
      id="evidence"
      aria-label="Dinding Bukti Ilmiah"
      className="relative overflow-hidden border-t border-white/10 py-28"
    >
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center">
        {/* Left Column: Analytical Argument */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bukti Empiris & Validasi Ekonometrika</span>
          </div>

          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-white leading-tight">
            Data Menjawab. Tidak Ada Asumsi yang Dikarang.
          </h2>

          <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-slate-300">
            Setiap kesimpulan dalam prototype ini berakar dari data panel seimbang 44 negara selama 64 tahun (1961–2024) dengan 2.816 observasi tanpa interpolasi buatan.
          </p>

          <ul className="mt-8 flex flex-col divide-y divide-white/10">
            {EVIDENCE_CARDS.map((item) => (
              <li key={item.id} className="py-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                    <Quote className="size-3" />
                    {item.id} · {item.type}
                  </span>
                </div>
                <h3 className="mt-2 text-[17px] font-bold text-white tracking-tight">{item.title}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-slate-400">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: 3D Tilted Marquee Wall */}
        <div
          className="lp-wall relative hidden h-[700px] items-center justify-center overflow-hidden lg:flex"
          aria-label="Tilted Evidence Wall"
          role="img"
        >
          <div className="lp-wall-plane flex gap-5">
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
              {col1.map((c) => (
                <Card
                  key={c.id}
                  className="w-[260px] p-4 bg-slate-900/95 border-white/10 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{c.id}</span>
                    <span>{c.type}</span>
                  </div>
                  <h4 className="mt-2 text-[14.5px] font-bold text-white">{c.title}</h4>
                  <p className="mt-1 text-[12px] text-slate-400 leading-snug">{c.desc}</p>
                </Card>
              ))}
              {SVG_EVIDENCE.slice(0, 2).map((s) => (
                <Card
                  key={s.title}
                  className="w-[260px] overflow-hidden p-3 bg-slate-900/95 border-white/10 hover:border-emerald-500/30 transition-all"
                >
                  <img src={s.src} alt={s.title} className="h-32 w-full object-contain rounded-xl bg-slate-950/60 p-2" />
                  <h4 className="mt-2 text-[13px] font-bold text-white">{s.title}</h4>
                  <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </Card>
              ))}
            </Marquee>

            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:48s]">
              {col2.map((c) => (
                <Card
                  key={c.id}
                  className="w-[260px] p-4 bg-slate-900/95 border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-400 font-bold">{c.id}</span>
                    <span>{c.type}</span>
                  </div>
                  <h4 className="mt-2 text-[14.5px] font-bold text-white">{c.title}</h4>
                  <p className="mt-1 text-[12px] text-slate-400 leading-snug">{c.desc}</p>
                </Card>
              ))}
              {SVG_EVIDENCE.slice(2, 4).map((s) => (
                <Card
                  key={s.title}
                  className="w-[260px] overflow-hidden p-3 bg-slate-900/95 border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <img src={s.src} alt={s.title} className="h-32 w-full object-contain rounded-xl bg-slate-950/60 p-2" />
                  <h4 className="mt-2 text-[13px] font-bold text-white">{s.title}</h4>
                  <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </Card>
              ))}
            </Marquee>
          </div>

          {/* Fade gradients over top, bottom, left, right */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 lp-fade-t" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 lp-fade-b" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 lp-fade-l" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 lp-fade-r" />
        </div>

        {/* Mobile Horizontal Marquee fallback */}
        <div className="lg:hidden">
          <Marquee pauseOnHover repeat={2} className="[--duration:30s]">
            {EVIDENCE_CARDS.map((c) => (
              <Card
                key={c.id}
                className="w-[240px] shrink-0 p-4 bg-slate-900/95 border-white/10 mr-3"
              >
                <span className="font-mono text-[11px] text-emerald-400 font-bold">{c.id}</span>
                <h4 className="mt-1 text-[14px] font-bold text-white">{c.title}</h4>
                <p className="mt-1 text-[12px] text-slate-400 line-clamp-3">{c.desc}</p>
              </Card>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
