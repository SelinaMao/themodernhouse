import SectionHeading from "./SectionHeading";
import { t } from "@/lib/i18n";
import { areaStats, n, usd, type Area, type Lang } from "@/lib/villas";

export default function ExploreDistricts({ lang, hc, onSelectArea }: { lang: Lang; hc: string; onSelectArea: (a: Area) => void }) {
  const stats = areaStats();
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <SectionHeading index={n("04", lang)} eyebrow={t("explore_eyebrow", lang)} title={t("explore_title", lang)} hc={hc} />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.id}>
            <button type="button" onClick={() => onSelectArea(s.id)} className="card-surface w-full p-5 text-left hover:border-jade">
              <p className="font-medium">{s.name[lang]}</p>
              <p className="mt-1 text-sm text-muted">
                {n(s.count, lang)} {t("explore_homes", lang)}
              </p>
              <p className="num mt-3 font-display text-2xl leading-none">{usd(s.medianPrice)}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
