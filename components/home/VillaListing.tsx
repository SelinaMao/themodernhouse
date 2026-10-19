import { t, type Key } from "@/lib/i18n";
import { monthlyPayment } from "../PaymentPlan";
import { areas, img, n, usd, AVATAR_EXTERIOR, VILLA_TYPES, type Area, type Lang, type Villa, type VillaType } from "@/lib/avatatr";

const TYPES = VILLA_TYPES;

export function StatusPill({ status, lang }: { status: Villa["status"]; lang: Lang }) {
  const cls = {
    available: "text-ok border-ok",
    reserved: "text-warn border-warn",
    sold: "text-sold border-sold",
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border bg-surface px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(`status_${status}` as Key, lang)}
    </span>
  );
}

export default function VillaListing({
  lang,
  hc,
  list,
  area,
  onAreaChange,
  type,
  onTypeChange,
  beds,
  onBedsChange,
  budget,
  onBudgetChange,
  maxBudget,
  availableOnly,
  onAvailableOnlyChange,
  onReset,
  onOpen,
}: {
  lang: Lang;
  hc: string;
  list: Villa[];
  area: Area | "any";
  onAreaChange: (v: Area | "any") => void;
  type: VillaType | "any";
  onTypeChange: (v: VillaType | "any") => void;
  beds: number;
  onBedsChange: (v: number) => void;
  budget: number;
  onBudgetChange: (v: number) => void;
  maxBudget: number;
  availableOnly: boolean;
  onAvailableOnlyChange: (v: boolean) => void;
  onReset: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <section id="villas" className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{n("07", lang)} · {t("nav_villas", lang)}</p>
          <h2 className={`mt-3 text-3xl md:text-4xl ${hc}`}>{t("list_title", lang)}</h2>
        </div>
        <p className="num font-mono text-sm text-muted">
          {n(list.length, lang)} / {n(AVATAR_EXTERIOR.length, lang)} {t("results", lang)}
        </p>
      </div>

      {/* filters */}
      <div className="mt-8 grid gap-4 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr_auto] lg:items-end">
        <label className="grid gap-1.5" htmlFor="f-area">
          <span className="text-xs font-medium text-muted">{t("filter_area", lang)}</span>
          <select id="f-area" value={area} onChange={(e) => onAreaChange(e.target.value as Area | "any")} className="rounded-md border border-line bg-bg px-3 py-2">
            <option value="any">{t("any", lang)}</option>
            {areas.map((c) => (
              <option key={c.id} value={c.id}>{c.name[lang]}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5" htmlFor="f-type">
          <span className="text-xs font-medium text-muted">{t("filter_type", lang)}</span>
          <select id="f-type" value={type} onChange={(e) => onTypeChange(e.target.value as VillaType | "any")} className="rounded-md border border-line bg-bg px-3 py-2">
            <option value="any">{t("any", lang)}</option>
            {TYPES.map((ty) => (
              <option key={ty} value={ty}>{t(`type_${ty}` as Key, lang)}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5" htmlFor="f-beds">
          <span className="text-xs font-medium text-muted">{t("filter_beds", lang)}</span>
          <select id="f-beds" value={beds} onChange={(e) => onBedsChange(Number(e.target.value))} className="rounded-md border border-line bg-bg px-3 py-2">
            <option value={0}>{t("any", lang)}</option>
            {[2, 3, 4, 6].map((b) => (
              <option key={b} value={b}>{n(b, lang)}{t("beds_plus", lang)}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5" htmlFor="f-budget">
          <span className="flex justify-between text-xs font-medium text-muted">
            <span>{t("filter_budget", lang)}</span>
            <span className="num font-mono text-ink">{usd(budget)}</span>
          </span>
          <input id="f-budget" type="range" min={90000} max={maxBudget} step={10000} value={budget} onChange={(e) => onBudgetChange(Number(e.target.value))} className="py-2" />
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm lg:pb-2" htmlFor="f-avail">
          <input id="f-avail" type="checkbox" checked={availableOnly} onChange={(e) => onAvailableOnlyChange(e.target.checked)} className="h-4 w-4 accent-[var(--jade)]" />
          {t("available_only", lang)}
        </label>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center">
          <p className="text-muted">{t("no_results", lang)}</p>
          <button type="button" onClick={onReset} className="mt-4 rounded-md border border-ink px-4 py-2 text-sm">
            {t("reset", lang)}
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => {
            const est = monthlyPayment(v.price * 0.7, 48, 0);
            return (
              <li key={v.id}>
                <article className="card-surface group flex h-full flex-col overflow-hidden transition-colors hover:border-jade">
                  <div className="relative overflow-hidden border-b border-line bg-wall">
                    <img
                      src={img(v)}
                      alt={v.name[lang]}
                      loading="lazy"
                      className={`aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${v.status === "sold" ? "opacity-60 grayscale" : ""}`}
                    />
                    <div className="absolute left-3 top-3">
                      <StatusPill status={v.status} lang={lang} />
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink">
                      {t(`type_${v.type}` as Key, lang)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className={lang === "kh" ? "text-lg font-semibold" : "font-display text-2xl leading-tight"}>{v.name[lang]}</h3>
                    <p className="text-sm text-muted">{v.location[lang]}</p>
                    <div className="mt-4">
                      <p className="num font-display text-3xl leading-none">{usd(v.price)}</p>
                      {v.status !== "sold" && (
                        <p className="num mt-1.5 text-xs text-muted">
                          {t("from_mo", lang)} <span className="font-mono text-ink">{usd(est)}</span>
                          {t("per_month", lang)}
                        </p>
                      )}
                    </div>
                    <dl className="num mt-4 grid grid-cols-4 gap-2 border-t border-line pt-4 text-center">
                      {[
                        [t("beds", lang), n(v.beds, lang)],
                        [t("baths", lang), n(v.baths, lang)],
                        [t("land", lang), `${n(v.landW, lang)}×${n(v.landL, lang)}`],
                        ["m²", n(v.built, lang)],
                      ].map(([k, val]) => (
                        <div key={k}>
                          <dd className="font-mono text-sm">{val}</dd>
                          <dt className="mt-0.5 text-[11px] leading-tight text-muted">{k}</dt>
                        </div>
                      ))}
                    </dl>
                    <button
                      type="button"
                      onClick={() => onOpen(v.id)}
                      className="mt-5 w-full rounded-md border border-ink px-4 py-2.5 text-sm font-medium transition-colors group-hover:bg-ink group-hover:text-bg"
                    >
                      {t("view", lang)}
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
