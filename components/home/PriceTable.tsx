"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { t } from "@/lib/i18n";
import { areaStats, n, usd, type Area, type Lang } from "@/lib/villas";

export default function PriceTable({ lang, hc, onSelectArea }: { lang: Lang; hc: string; onSelectArea: (a: Area) => void }) {
  const stats = areaStats();
  const [selected, setSelected] = useState<Area>(stats[0].id);
  const max = Math.max(...stats.map((s) => s.pricePerSqm));
  const current = stats.find((s) => s.id === selected) ?? stats[0];

  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading index={n("03", lang)} eyebrow={t("cost_eyebrow", lang)} title={t("cost_title", lang)} hc={hc} />
        <span className="chip bg-jade text-jade-ink" style={{ borderColor: "var(--jade)" }}>
          {t("cost_toggle", lang)}
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="card-surface p-3.5">
          {stats.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelected(s.id)}
              className={`flex w-full items-center gap-4 rounded-lg px-2 py-2.5 text-left transition-colors ${s.id === selected ? "bg-wall" : "hover:bg-wall/60"}`}
            >
              <span className="w-32 shrink-0 truncate text-sm font-medium sm:w-40">{s.name[lang]}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-line/60">
                <span className="block h-full rounded-full bg-jade" style={{ width: `${Math.max(8, (s.pricePerSqm / max) * 100)}%` }} />
              </span>
              <span className="num w-20 shrink-0 text-right font-mono text-sm">{usd(s.pricePerSqm)}/m²</span>
            </button>
          ))}
        </div>

        <div className="card-surface p-5">
          <h3 className={`text-xl ${hc}`}>{current.name[lang]}</h3>
          <dl className="mt-3 grid gap-3 text-sm">
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-muted">{t("cost_median_price", lang)}</dt>
              <dd className="num font-display text-2xl">{usd(current.medianPrice)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-muted">{t("cost_price_sqm", lang)}</dt>
              <dd className="num font-mono">{usd(current.pricePerSqm)}/m²</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-muted">{t("cost_homes_listed", lang)}</dt>
              <dd className="num font-mono">{n(current.count, lang)}</dd>
            </div>
          </dl>
          <button type="button" onClick={() => onSelectArea(current.id)} className="mt-4 w-full rounded-md bg-jade px-4 py-2.5 text-sm font-medium text-jade-ink hover:opacity-90">
            {t("cost_view_district", lang)}
          </button>
        </div>
      </div>
    </section>
  );
}
