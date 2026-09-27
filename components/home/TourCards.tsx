import SectionHeading from "./SectionHeading";
import { t } from "@/lib/i18n";
import { img, n, usd, villas, type Lang } from "@/lib/villas";

export default function TourCards({ lang, hc, onOpen }: { lang: Lang; hc: string; onOpen: (id: string) => void }) {
  const list = villas.filter((v) => v.status !== "sold").slice(0, 4);
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <SectionHeading index={n("05", lang)} eyebrow={t("tour_eyebrow", lang)} title={t("tour_title", lang)} hc={hc} />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => (
          <li key={v.id}>
            <button type="button" onClick={() => onOpen(v.id)} className="card-surface group block w-full overflow-hidden text-left">
              <div className="relative overflow-hidden">
                <img src={img(v)} alt={v.name[lang]} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-jade shadow">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="p-3.5">
                <p className="num font-display text-2xl leading-none">{usd(v.price)}</p>
                <p className="mt-1.5 text-sm font-medium">{v.name[lang]}</p>
                <p className="text-xs text-muted">{v.location[lang]}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
