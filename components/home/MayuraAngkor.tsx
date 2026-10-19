import SectionHeading from "./SectionHeading";
import { t, type Key } from "@/lib/i18n";
import { IMG_BASE, n, typeSummary, usd, type Lang } from "@/lib/avatatr";

const MAYURA_PRICE = 21900;

const MAYURA_IMAGES = [
  "villas/mayura/mayuramode.jpg",

  "villas/mayura/mayura02.jpg",
  "villas/mayura/mayura03.jpg",
  "villas/mayura/shop.jpg",
];

export default function MayuraAngkor({ lang, hc, onOpen, onSeeAll }: { lang: Lang; hc: string; onOpen: (id: string) => void; onSeeAll: () => void }) {
  const lines = typeSummary();
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <SectionHeading
        index={n("02", lang)}
        eyebrow={t("launched_eyebrow", lang)}
        title={t("launched_title", lang)}
        hc={hc}
        action={{ label: t("see_all_types", lang), onClick: onSeeAll }}
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lines.map(({ type, sample }, i) => (
          <li key={type}>
            <button type="button" onClick={() => onOpen(sample.id)} className="card-surface group block w-full overflow-hidden text-left">
              <div className="relative overflow-hidden">
                <img src={IMG_BASE + MAYURA_IMAGES[i % MAYURA_IMAGES.length]} alt={sample.name[lang]} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-jade">
                  {t("launched_badge", lang)}
                </span>
              </div>
              <div className="p-3.5">
                <p className="num font-display text-2xl leading-none">
                  {t("launched_from", lang)} {usd(MAYURA_PRICE)}
                </p>
                <p className="mt-1.5 text-sm font-medium">{t(`type_${type}` as Key, lang)}</p>
                <p className="text-xs text-muted">{sample.location[lang]}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
