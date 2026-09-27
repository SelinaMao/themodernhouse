import SectionHeading from "./SectionHeading";
import { t } from "@/lib/i18n";
import { freshListings, img, n, usd, type Lang } from "@/lib/villas";

export default function FreshListings({ lang, hc, onOpen, onSeeAll }: { lang: Lang; hc: string; onOpen: (id: string) => void; onSeeAll: () => void }) {
  const list = freshListings(4);
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <SectionHeading
        index={n("01", lang)}
        eyebrow={t("fresh_eyebrow", lang)}
        title={t("fresh_title", lang)}
        sub={t("fresh_sub", lang)}
        hc={hc}
        action={{ label: t("see_all_listings", lang), onClick: onSeeAll }}
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => (
          <li key={v.id}>
            <button type="button" onClick={() => onOpen(v.id)} className="card-surface group block w-full overflow-hidden text-left">
              <div className="relative overflow-hidden">
                <img src={img(v)} alt={v.name[lang]} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-jade px-2.5 py-0.5 text-xs font-medium text-jade-ink">
                  {t("new_badge", lang)}
                </span>
                <span className="absolute bottom-2.5 left-2.5 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
                  {v.listedDaysAgo === 1 ? t("day_ago_one", lang) : `${n(v.listedDaysAgo, lang)} ${t("days_ago", lang)}`}
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
