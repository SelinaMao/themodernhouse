"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";
import { n, usd, villas, type Lang } from "@/lib/villas";

const DEPOSIT = 5000;

export function monthlyPayment(financed: number, months: number, annualRate: number) {
  if (annualRate <= 0) return financed / months;
  const r = annualRate / 100 / 12;
  return (financed * r) / (1 - Math.pow(1 + r, -months));
}

type Props = { lang: Lang; villaId: string; onVillaChange: (id: string) => void; headingClass: string; index?: string };

export default function PaymentPlan({ lang, villaId, onVillaChange, headingClass, index = "02" }: Props) {
  const villa = villas.find((v) => v.id === villaId) ?? villas[0];
  const [price, setPrice] = useState(villa.price);
  const [lastVilla, setLastVilla] = useState(villa.id);
  const [downPct, setDownPct] = useState(30);
  const [months, setMonths] = useState(36);
  const [mode, setMode] = useState<"inhouse" | "bank">("inhouse");
  const [rate, setRate] = useState(9.5);

  // keep price in sync when a different villa is chosen elsewhere on the page
  if (lastVilla !== villa.id) {
    setLastVilla(villa.id);
    setPrice(villa.price);
  }

  const termOptions = mode === "inhouse" ? [12, 24, 36, 48] : [60, 120, 180, 240];
  const term = termOptions.includes(months) ? months : termOptions[termOptions.length - 1];
  const effRate = mode === "inhouse" ? 0 : rate;

  const down = Math.max(DEPOSIT, (price * downPct) / 100);
  const financed = Math.max(0, price - down);
  const monthly = monthlyPayment(financed, term, effRate);
  const total = down + monthly * term;
  const interest = total - price;

  const segBtn = (active: boolean) =>
    `rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-jade text-jade-ink" : "bg-surface text-ink border border-line hover:border-jade"
    }`;

  return (
    <section id="plan" className="scroll-mt-24 border-t border-line py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{n(index, lang)} · {t("nav_plan", lang)}</p>
          <h2 className={`mt-3 text-3xl md:text-4xl ${headingClass}`}>{t("plan_title", lang)}</h2>
          <p className="mt-4 max-w-[58ch] text-muted">{t("plan_sub", lang)}</p>

          <div className="mt-8 grid gap-6">
            <label className="grid gap-2" htmlFor="plan-villa">
              <span className="text-sm font-medium">{t("plan_villa", lang)}</span>
              <select
                id="plan-villa"
                value={villa.id}
                onChange={(e) => onVillaChange(e.target.value)}
                className="rounded-md border border-line bg-surface px-3 py-2.5"
              >
                {villas.map((v) => (
                  <option key={v.id} value={v.id} disabled={v.status === "sold"}>
                    {v.name[lang]} — {usd(v.price)}
                    {v.status === "sold" ? ` (${t("status_sold", lang)})` : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2" htmlFor="plan-price">
              <span className="text-sm font-medium">{t("plan_price", lang)} (USD)</span>
              <input
                id="plan-price"
                type="number"
                min={20000}
                step={1000}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
                className="num rounded-md border border-line bg-surface px-3 py-2.5 font-mono"
              />
            </label>

            <div className="grid gap-2">
              <label htmlFor="plan-down" className="flex items-baseline justify-between text-sm font-medium">
                <span>{t("plan_down", lang)}</span>
                <span className="num font-mono text-jade">
                  {n(downPct, lang)}% · {usd(down)}
                </span>
              </label>

              <div className="flex items-center gap-3">
                <input
                  id="plan-down"
                  type="number"
                  min={DEPOSIT}
                  max={price}
                  step={1000}
                  value={Math.round(down)}
                  onChange={(e) => {
                    const next = Number.parseFloat(e.target.value);
                    const safe = Number.isFinite(next) ? Math.max(DEPOSIT, Math.min(price, next)) : DEPOSIT;
                    setDownPct(price > 0 ? Math.min(70, Math.max(10, (safe / price) * 100)) : 0);
                  }}
                  className="num w-36 rounded-md border border-line bg-surface px-3 py-2.5 font-mono"
                />
                <span className="text-sm text-muted">USD</span>
              </div>

              <input
                aria-label={t("plan_down", lang)}
                type="range"
                min={10}
                max={70}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
              />
            </div>

            <div className="grid gap-2">
              <span className="text-sm font-medium">{t("plan_mode", lang)}</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={segBtn(mode === "inhouse")} onClick={() => { setMode("inhouse"); setMonths(36); }}>
                  {t("plan_inhouse", lang)}
                </button>
                <button type="button" className={segBtn(mode === "bank")} onClick={() => { setMode("bank"); setMonths(180); }}>
                  {t("plan_bank", lang)}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <span className="text-sm font-medium">{t("plan_months", lang)}</span>
              <div className="flex flex-wrap gap-2">
                {termOptions.map((m) => (
                  <button key={m} type="button" className={`${segBtn(term === m)} num font-mono`} onClick={() => setMonths(m)}>
                    {n(m, lang)} {t("plan_months_u", lang)}
                  </button>
                ))}
              </div>
            </div>

            {mode === "bank" && (
              <div className="grid gap-2">
                <label htmlFor="plan-rate" className="flex items-baseline justify-between text-sm font-medium">
                  <span>{t("plan_rate", lang)}</span>
                  <span className="num font-mono text-jade">{n(rate.toFixed(2), lang)}%</span>
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="plan-rate"
                    type="number"
                    min={5}
                    max={14}
                    step={0.25}
                    value={rate}
                    onChange={(e) => {
                      const next = Number.parseFloat(e.target.value);
                      setRate(Number.isFinite(next) ? Math.min(14, Math.max(5, next)) : 5);
                    }}
                    className="num w-28 rounded-md border border-line bg-surface px-3 py-2.5 font-mono"
                  />
                  <span className="text-sm text-muted">%</span>
                </div>

                <input
                  aria-label={t("plan_rate", lang)}
                  type="range"
                  min={5}
                  max={14}
                  step={0.25}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
            )}
          </div>
        </div>

        {/* result */}
        <div className="self-start rounded-xl border border-line bg-surface p-6 md:p-8">
          <p className="text-sm text-muted">{t("plan_monthly", lang)}</p>
          <p className="num mt-1 font-display text-6xl leading-none text-ink md:text-7xl">
            {usd(monthly)}
            <span className="ml-1 font-sans text-lg text-muted">{t("per_month", lang)}</span>
          </p>
          <p className="mt-2 font-mono text-xs text-muted">
            {n(term, lang)} {t("plan_months_u", lang)} · {n(effRate.toFixed(2), lang)}%
          </p>

          {/* split bar */}
          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-wall" aria-hidden="true">
            <div className="bg-brass" style={{ width: `${(DEPOSIT / (total || 1)) * 100}%` }} />
            <div className="bg-jade" style={{ width: `${((down - DEPOSIT) / (total || 1)) * 100}%` }} />
            <div className="bg-glass" style={{ width: `${(financed / (total || 1)) * 100}%` }} />
            <div className="bg-warn" style={{ width: `${(Math.max(0, interest) / (total || 1)) * 100}%` }} />
          </div>

          <dl className="num mt-6 divide-y divide-line font-mono text-sm">
            {[
              ["bg-brass", t("plan_deposit", lang), DEPOSIT],
              ["bg-jade", `${t("plan_down", lang)} (${n(downPct, lang)}%)`, down],
              ["bg-glass", t("plan_financed", lang), financed],
              ["bg-warn", t("plan_interest", lang), Math.max(0, interest)],
            ].map(([dot, label, val]) => (
              <div key={label as string} className="flex items-center justify-between gap-4 py-2.5">
                <dt className="flex items-center gap-2 font-sans text-ink">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />
                  {label}
                </dt>
                <dd>{usd(val as number)}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-3 text-base font-semibold">
              <dt className="font-sans">{t("plan_total", lang)}</dt>
              <dd>{usd(total)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-muted">
            {mode === "bank" ? t("plan_bank_note", lang) : t("plan_inhouse_note", lang)}
          </p>
        </div>
      </div>
    </section>
  );
}
