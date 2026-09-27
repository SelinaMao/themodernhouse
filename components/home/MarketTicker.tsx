import { t } from "@/lib/i18n";
import { marketStats, n, usd, type Lang } from "@/lib/villas";

export default function MarketTicker({ lang }: { lang: Lang }) {
  const stats = marketStats();
  const items: [string, string][] = [
    [t("ticker_available", lang), n(stats.available, lang)],
    [t("ticker_range", lang), `${usd(stats.minPrice)}–${usd(stats.maxPrice)}`],
    [t("ticker_districts", lang), n(stats.districts, lang)],
    [t("ticker_handover", lang), stats.soonest[lang]],
  ];
  return (
    <div className="border-y border-line bg-jade text-jade-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm md:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-ink/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {t("ticker_pulse", lang)}
        </span>
        {items.map(([k, v]) => (
          <p key={k} className="whitespace-nowrap">
            <span className="num font-semibold">{v}</span> <span className="opacity-85">{k}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
