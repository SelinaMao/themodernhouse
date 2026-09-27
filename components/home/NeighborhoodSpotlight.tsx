import { t } from "@/lib/i18n";
import { areaStats, img, n, usd, villas, type Area, type Lang } from "@/lib/villas";

export default function NeighborhoodSpotlight({
  lang,
  hc,
  onExplore,
  onBookVisit,
}: {
  lang: Lang;
  hc: string;
  onExplore: (a: Area) => void;
  onBookVisit: () => void;
}) {
  const stat = areaStats()[0];
  const photo = villas.find((v) => v.area === stat.id) ?? villas[0];

  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <div className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-[1.4fr_1fr]">
        <img src={img(photo)} alt="" className="h-64 w-full object-cover sm:h-auto" />
        <div className="flex flex-col justify-center gap-3.5 bg-roof p-6 text-jade-ink sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-jade">{t("spotlight_eyebrow", lang)}</p>
          <h3 className={`text-3xl ${hc}`}>{stat.name[lang]}</h3>
          <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div>
              <dd className="num font-display text-xl leading-none">{n(stat.count, lang)}</dd>
              <dt className="mt-0.5 opacity-75">{t("spotlight_homes", lang)}</dt>
            </div>
            <div>
              <dd className="num font-display text-xl leading-none">{usd(stat.medianPrice)}</dd>
              <dt className="mt-0.5 opacity-75">{t("spotlight_median_price", lang)}</dt>
            </div>
            <div>
              <dd className="num font-display text-xl leading-none">{usd(stat.pricePerSqm)}</dd>
              <dt className="mt-0.5 opacity-75">{t("spotlight_price_sqm", lang)}</dt>
            </div>
          </dl>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button type="button" onClick={() => onExplore(stat.id)} className="rounded-md bg-jade px-4 py-2 text-sm font-medium text-jade-ink hover:opacity-90">
              {t("spotlight_explore", lang)}
            </button>
            <button type="button" onClick={onBookVisit} className="text-sm font-medium underline-offset-4 hover:underline">
              {t("book_visit", lang)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
