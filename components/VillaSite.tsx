"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FloorPlan from "./FloorPlan";
import PaymentPlan, { monthlyPayment } from "./PaymentPlan";
import HeroSearch from "./home/HeroSearch";
import MarketTicker from "./home/MarketTicker";
import FreshListings from "./home/FreshListings";
import JustLaunched from "./home/JustLaunched";
import PriceTable from "./home/PriceTable";
import ExploreDistricts from "./home/ExploreDistricts";
import NeighborhoodSpotlight from "./home/NeighborhoodSpotlight";
import TourCards from "./home/TourCards";
import MarketNews from "./home/MarketNews";
import CtaBanner from "./home/CtaBanner";
import WelcomeBack from "./home/WelcomeBack";
import LinkDirectory from "./home/LinkDirectory";
import FloatingRail from "./home/FloatingRail";
import { t, type Key } from "@/lib/i18n";
import { site } from "@/lib/site";
import { areas, img, IMG_BASE, n, usd, villas, VILLA_TYPES, type Area, type Lang, type Villa, type VillaType } from "@/lib/villas";

const TYPES = VILLA_TYPES;
const MAX_BUDGET = 450000;
const tgUrl = `https://t.me/${site.telegram}`;
const LAST_VIEWED_KEY = "mho1_last_viewed";

function headingClass(lang: Lang) {
  return lang === "kh" ? "font-moul font-normal leading-[1.75]" : "font-display font-normal leading-[1.05] tracking-[-0.01em]";
}

function StatusPill({ status, lang }: { status: Villa["status"]; lang: Lang }) {
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

function CopyButton({ text, lang, targetId }: { text: string; lang: Lang; targetId?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm hover:border-jade"
      onClick={() => {
        const fallback = () => {
          const el = targetId ? document.getElementById(targetId) : null;
          if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          }
        };
        try {
          navigator.clipboard
            .writeText(text)
            .then(() => {
              setDone(true);
              setTimeout(() => setDone(false), 1800);
            })
            .catch(fallback);
        } catch {
          fallback();
        }
      }}
    >
      {done ? t("copied", lang) : t("copy", lang)}
    </button>
  );
}

export default function VillaSite() {
  const [lang, setLang] = useState<Lang>("en");
  const [area, setArea] = useState<Area | "any">("any");
  const [type, setType] = useState<VillaType | "any">("any");
  const [beds, setBeds] = useState(0);
  const [budget, setBudget] = useState(MAX_BUDGET);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [planVilla, setPlanVilla] = useState("single");
  const [lastViewedId, setLastViewedId] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const hc = headingClass(lang);

  useEffect(() => {
    if (!langOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    document.documentElement.lang = lang === "kh" ? "km" : "en";
  }, [lang]);

  useEffect(() => {
    setLastViewedId(window.localStorage.getItem(LAST_VIEWED_KEY));
  }, []);

  useEffect(() => {
    if (openId) window.localStorage.setItem(LAST_VIEWED_KEY, openId);
  }, [openId]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return villas
      .filter((v) => (area === "any" || v.area === area) && (type === "any" || v.type === type))
      .filter((v) => v.beds >= beds && v.price <= budget)
      .filter((v) => !availableOnly || v.status === "available")
      .filter((v) => !q || `${v.name.kh} ${v.name.en} ${v.location.kh} ${v.location.en}`.toLowerCase().includes(q))
      .sort((a, b) => Number(a.status === "sold") - Number(b.status === "sold") || a.price - b.price);
  }, [area, type, beds, budget, availableOnly, query]);

  const openVilla = villas.find((v) => v.id === openId) ?? null;
  const lastViewedVilla = villas.find((v) => v.id === lastViewedId) ?? null;

  const resetFilters = () => {
    setArea("any");
    setType("any");
    setBeds(0);
    setBudget(MAX_BUDGET);
    setAvailableOnly(false);
  };

  const goToPlan = (id: string) => {
    setPlanVilla(id);
    setOpenId(null);
    requestAnimationFrame(() => document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" }));
  };

  const scrollToVillas = () => {
    requestAnimationFrame(() => document.getElementById("villas")?.scrollIntoView({ behavior: "smooth" }));
  };

  const selectAreaAndBrowse = (a: Area) => {
    setArea(a);
    scrollToVillas();
  };

  const selectTypeAndBrowse = (ty: VillaType) => {
    setType(ty);
    scrollToVillas();
  };

  return (
    <div className="min-h-full bg-bg text-ink">
      {/* ---------- Header ---------- */}
      <header
        className="sticky z-30 border-b border-line bg-surface px-4 md:px-8"
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-5">
          <a href="#top" className="flex shrink-0 items-center rounded-md bg-white px-1.5 py-1" aria-label={site.brand[lang]}>
            <img src={`${IMG_BASE}logo.png`} alt={site.brand[lang]} className="h-11 w-auto" />
          </a>
          <nav className="hidden shrink-0 items-center gap-6 text-sm font-medium text-ink lg:flex" aria-label="Main">
            {[
              ["#villas", t("nav_villas", lang)],
              ["#plan", t("nav_plan", lang)],
              ["#contact", t("nav_contact", lang)],
            ].map(([href, label]) => (
              <a key={href} href={href} className="flex items-center gap-1 hover:text-jade">
                {label}
                <svg viewBox="0 0 24 24" className="h-3 w-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </nav>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              scrollToVillas();
            }}
            className="hidden flex-1 items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm focus-within:border-jade md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder", lang)}
              aria-label={t("search_placeholder", lang)}
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-jade"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9s1.3-6.5 3.8-9z" />
                </svg>
                {lang === "kh" ? "ខ្មែរ" : "EN"}
                <svg viewBox="0 0 24 24" className="h-3 w-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <ul role="listbox" className="absolute right-0 top-full z-10 mt-1.5 w-28 overflow-hidden rounded-md border border-line bg-surface py-1 text-sm shadow-lg">
                  {(["kh", "en"] as Lang[]).map((l) => (
                    <li key={l} role="option" aria-selected={lang === l}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`block w-full px-3 py-1.5 text-left hover:bg-wall ${lang === l ? "font-medium text-jade" : ""}`}
                      >
                        {l === "kh" ? "ខ្មែរ" : "English"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a href="#contact" className="hidden rounded-full bg-jade px-4 py-2 text-sm font-medium text-jade-ink hover:opacity-90 sm:inline-block">
              {t("book_visit", lang)}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="px-4 md:px-8">
        {/* ---------- Hero ---------- */}
        <div className="-mx-4 bg-roof text-jade-ink md:-mx-8">
          <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-jade-ink/70">{t("hero_eyebrow", lang)}</p>
              <h1 className={`mt-3 ${lang === "kh" ? "text-[26px] md:text-[36px]" : "text-[38px] md:text-[52px]"} ${hc}`}>
                {t("hero_title", lang)}
              </h1>
              <p className="mt-3 max-w-[56ch] text-[16px] text-jade-ink/85">{t("hero_sub", lang)}</p>
              <HeroSearch
                lang={lang}
                type={type}
                onTypeChange={setType}
                query={query}
                onQueryChange={setQuery}
                onSearch={scrollToVillas}
                onAreaSelect={selectAreaAndBrowse}
              />
            </div>
          </section>
        </div>

        <div className="-mx-4 md:-mx-8">
          <MarketTicker lang={lang} />
        </div>

        <FreshListings lang={lang} hc={hc} onOpen={setOpenId} onSeeAll={scrollToVillas} />
        <JustLaunched lang={lang} hc={hc} onOpen={setOpenId} onSeeAll={scrollToVillas} />
        <PriceTable lang={lang} hc={hc} onSelectArea={selectAreaAndBrowse} />
        <ExploreDistricts lang={lang} hc={hc} onSelectArea={selectAreaAndBrowse} />
        <NeighborhoodSpotlight
          lang={lang}
          hc={hc}
          onExplore={selectAreaAndBrowse}
          onBookVisit={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        />
        <TourCards lang={lang} hc={hc} onOpen={setOpenId} />
        <MarketNews lang={lang} hc={hc} onSeeAll={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />

        {/* ---------- Listings ---------- */}
        <section id="villas" className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{n("07", lang)} · {t("nav_villas", lang)}</p>
              <h2 className={`mt-3 text-3xl md:text-4xl ${hc}`}>{t("list_title", lang)}</h2>
            </div>
            <p className="num font-mono text-sm text-muted">
              {n(list.length, lang)} / {n(villas.length, lang)} {t("results", lang)}
            </p>
          </div>

          {/* filters */}
          <div className="mt-8 grid gap-4 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr_auto] lg:items-end">
            <label className="grid gap-1.5" htmlFor="f-area">
              <span className="text-xs font-medium text-muted">{t("filter_area", lang)}</span>
              <select id="f-area" value={area} onChange={(e) => setArea(e.target.value as Area | "any")} className="rounded-md border border-line bg-bg px-3 py-2">
                <option value="any">{t("any", lang)}</option>
                {areas.map((c) => (
                  <option key={c.id} value={c.id}>{c.name[lang]}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5" htmlFor="f-type">
              <span className="text-xs font-medium text-muted">{t("filter_type", lang)}</span>
              <select id="f-type" value={type} onChange={(e) => setType(e.target.value as VillaType | "any")} className="rounded-md border border-line bg-bg px-3 py-2">
                <option value="any">{t("any", lang)}</option>
                {TYPES.map((ty) => (
                  <option key={ty} value={ty}>{t(`type_${ty}` as Key, lang)}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5" htmlFor="f-beds">
              <span className="text-xs font-medium text-muted">{t("filter_beds", lang)}</span>
              <select id="f-beds" value={beds} onChange={(e) => setBeds(Number(e.target.value))} className="rounded-md border border-line bg-bg px-3 py-2">
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
              <input id="f-budget" type="range" min={90000} max={MAX_BUDGET} step={10000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="py-2" />
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm lg:pb-2" htmlFor="f-avail">
              <input id="f-avail" type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="h-4 w-4 accent-[var(--jade)]" />
              {t("available_only", lang)}
            </label>
          </div>

          {list.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center">
              <p className="text-muted">{t("no_results", lang)}</p>
              <button type="button" onClick={resetFilters} className="mt-4 rounded-md border border-ink px-4 py-2 text-sm">
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
                          onClick={() => setOpenId(v.id)}
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

        <CtaBanner lang={lang} hc={hc} />
        <WelcomeBack lang={lang} villa={lastViewedVilla} onOpen={setOpenId} />

        <PaymentPlan lang={lang} villaId={planVilla} onVillaChange={setPlanVilla} headingClass={hc} index="08" />
        <Contact lang={lang} hc={hc} />
        <LinkDirectory lang={lang} onSelectArea={selectAreaAndBrowse} onSelectType={selectTypeAndBrowse} />
      </main>

      <footer className="mt-8 bg-roof px-4 py-8 text-jade-ink md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-jade-ink/15 pb-6">
            <a href="#top" className="flex items-center rounded-md bg-white px-1.5 py-1">
              <img src={`${IMG_BASE}logo.png`} alt={site.brand[lang]} className="h-10 w-auto" />
            </a>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm opacity-90" aria-label="Footer">
              <a href="#villas" className="hover:underline">{t("nav_villas", lang)}</a>
              <a href="#plan" className="hover:underline">{t("nav_plan", lang)}</a>
              <a href="#contact" className="hover:underline">{t("nav_contact", lang)}</a>
              <span className="num">{site.phone}</span>
              <a href={tgUrl} target="_blank" rel="noreferrer" className="hover:underline">@{site.telegram}</a>
            </nav>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm opacity-80">
            <span>{site.office[lang]} · {site.hours[lang]}</span>
            <span>© 2026 {site.brand[lang]} · {t("footer_rights", lang)}</span>
          </div>
          <p className="mt-2 text-xs opacity-60">{t("footer", lang)}</p>
        </div>
      </footer>

      <FloatingRail lang={lang} />

      {openVilla && <VillaDetail villa={openVilla} lang={lang} hc={hc} onClose={() => setOpenId(null)} onPlan={goToPlan} />}
    </div>
  );
}

/* ---------------- Detail dialog ---------------- */

function VillaDetail({
  villa: v,
  lang,
  hc,
  onClose,
  onPlan,
}: {
  villa: Villa;
  lang: Lang;
  hc: string;
  onClose: () => void;
  onPlan: (id: string) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const specs: [string, string][] = [
    [t("land", lang), `${n(v.landW, lang)} × ${n(v.landL, lang)} m (${n(v.landW * v.landL, lang)} m²)`],
    [t("built", lang), `${n(v.built, lang)} m²`],
    [t("floors", lang), n(v.floors, lang)],
    [t("beds", lang), n(v.beds, lang)],
    [t("baths", lang), n(v.baths, lang)],
    [t("parking", lang), n(v.parking, lang)],
    [t("title", lang), t(v.title === "hard" ? "title_hard" : "title_strata", lang)],
    [t("handover", lang), v.handover[lang]],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="villa-title"
        className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-line bg-bg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-bg/95 px-5 py-3 backdrop-blur">
          <StatusPill status={v.status} lang={lang} />
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-md border border-line px-3 py-1.5 text-sm hover:border-ink">
            {t("close", lang)} ✕
          </button>
        </div>

        <div className="border-b border-line bg-wall">
          <img src={img(v)} alt={v.name[lang]} className="max-h-[62vh] w-full object-cover" />
        </div>

        <div className="grid gap-8 p-5 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brass">{t(`type_${v.type}` as Key, lang)}</p>
            <h2 id="villa-title" className={`mt-2 text-3xl ${hc}`}>{v.name[lang]}</h2>
            <p className="text-muted">{v.location[lang]}</p>
            <p className="mt-4 max-w-[60ch]">{v.blurb[lang]}</p>
            <h3 className="mt-6 text-sm font-semibold">{t("features", lang)}</h3>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {v.features[lang].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-jade" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-xl border border-line bg-surface p-5">
            <p className="num font-display text-5xl leading-none">{usd(v.price)}</p>
            <dl className="num mt-5 divide-y divide-line text-sm">
              {specs.map(([k, val]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium">{val}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid gap-2">
              {v.status !== "sold" && (
                <button type="button" onClick={() => onPlan(v.id)} className="rounded-md bg-jade px-4 py-2.5 font-medium text-jade-ink hover:opacity-90">
                  {t("calc_this", lang)}
                </button>
              )}
              <a href={tgUrl} target="_blank" rel="noreferrer" className="rounded-md border border-ink px-4 py-2.5 text-center font-medium hover:bg-ink hover:text-bg">
                {t("ask_telegram", lang)}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-5 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{t("floorplan", lang)}</h3>
            <p className="text-xs text-muted">{t("plan_note", lang)}</p>
          </div>
          <div className="mt-4">
            <FloorPlan villa={v} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Contact ---------------- */

function Contact({ lang, hc }: { lang: Lang; hc: string }) {
  const [form, setForm] = useState({ name: "", phone: "", villa: "single", date: "", msg: "" });
  const [ready, setReady] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const villa = villas.find((v) => v.id === form.villa)!;
    const lines = [
      `${t("f_name", lang)}: ${form.name}`,
      `${t("f_phone", lang)}: ${form.phone}`,
      `${t("f_villa", lang)}: ${villa.name[lang]} (${usd(villa.price)})`,
      form.date && `${t("f_date", lang)}: ${form.date}`,
      form.msg && `${t("f_msg", lang)}: ${form.msg}`,
    ].filter(Boolean);
    setReady(lines.join("\n"));
  };

  const field = "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] placeholder:text-muted";

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{n("09", lang)} · {t("nav_contact", lang)}</p>
          <h2 className={`mt-3 text-3xl md:text-4xl ${hc}`}>{t("contact_title", lang)}</h2>
          <p className="mt-4 max-w-[52ch] text-muted">{t("contact_sub", lang)}</p>
          <dl className="mt-8 grid gap-5 text-sm">
            <div>
              <dt className="text-muted">{t("phone", lang)}</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-3">
                <span id="office-phone" className="num select-all font-mono text-lg">{site.phone}</span>
                <CopyButton text={site.phone} lang={lang} targetId="office-phone" />
              </dd>
            </div>
            <div>
              <dt className="text-muted">Telegram</dt>
              <dd className="mt-1">
                <a href={tgUrl} target="_blank" rel="noreferrer" className="font-mono text-lg text-jade underline-offset-4 hover:underline">
                  @{site.telegram}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">{t("office", lang)}</dt>
              <dd className="mt-1">{site.office[lang]}</dd>
            </div>
            <div>
              <dt className="text-muted">{t("hours", lang)}</dt>
              <dd className="mt-1">{site.hours[lang]}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 md:p-7">
          {ready ? (
            <div>
              <h3 className="text-lg font-semibold">{t("f_ready", lang)}</h3>
              <p className="mt-1 text-sm text-muted">{t("f_ready_sub", lang)}</p>
              <pre id="visit-message" className="mt-4 whitespace-pre-wrap rounded-md border border-line bg-bg p-4 font-sans text-sm">
                {ready}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <CopyButton text={ready} lang={lang} targetId="visit-message" />
                <a href={tgUrl} target="_blank" rel="noreferrer" className="rounded-md bg-jade px-4 py-1.5 text-sm font-medium text-jade-ink">
                  {t("open_tg", lang)}
                </a>
                <button type="button" onClick={() => setReady(null)} className="px-3 py-1.5 text-sm text-muted underline-offset-4 hover:underline">
                  ← {t("f_submit", lang)}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3" noValidate>
              <label className="sr-only" htmlFor="c-name">{t("f_name", lang)}</label>
              <input
                id="c-name"
                value={form.name}
                onChange={set("name")}
                className={field}
                placeholder={`${t("f_name", lang)} *`}
                autoComplete="name"
              />

              <div className="flex gap-2">
                <span aria-hidden className="flex shrink-0 items-center gap-1.5 rounded-xl border border-line bg-bg px-3 text-sm text-muted">
                  🇰🇭 +855
                </span>
                <label className="sr-only" htmlFor="c-phone">{t("f_phone", lang)}</label>
                <input
                  id="c-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={`${field} font-mono`}
                  placeholder={`${t("f_phone", lang)} * — 0XX XXX XXX`}
                  autoComplete="tel"
                />
              </div>

              <label className="grid gap-1.5" htmlFor="c-villa">
                <span className="text-xs font-medium text-muted">{t("f_villa", lang)}</span>
                <select id="c-villa" value={form.villa} onChange={set("villa")} className={field}>
                  {villas.filter((v) => v.status !== "sold").map((v) => (
                    <option key={v.id} value={v.id}>{v.name[lang]}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5" htmlFor="c-date">
                <span className="text-xs font-medium text-muted">{t("f_date", lang)}</span>
                <input id="c-date" type="date" value={form.date} onChange={set("date")} className={field} />
              </label>

              <label className="sr-only" htmlFor="c-msg">{t("f_msg", lang)}</label>
              <textarea
                id="c-msg"
                rows={3}
                value={form.msg}
                onChange={set("msg")}
                className={field}
                placeholder={t("f_msg", lang)}
              />

              {error && <p className="text-sm text-sold">{t("f_need", lang)}</p>}

              <button type="submit" className="mt-1 rounded-xl bg-jade py-4 text-base font-semibold text-jade-ink hover:opacity-90">
                {t("f_submit", lang)}
              </button>

              <div className="my-1 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
                <span className="h-px flex-1 bg-line" />
                {t("contact_via", lang)}
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-medium hover:border-jade"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 5c0 8.5 6.5 15 15 15l2-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5-4 1z" strokeLinejoin="round" />
                  </svg>
                  {t("phone", lang)}
                </a>
                <a
                  href={tgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-medium hover:border-jade"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M21.5 4.5 2.7 11.9c-1 .4-1 1.7.1 2l4.6 1.4 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.5 4.8 3.6c.7.5 1.8.1 2-.8l3-16.4c.2-1-.7-1.8-1.7-1.4Zm-3 3.4-7.6 6.9-.3 3.2-1.5-4.5 8.6-6.4c.3-.2.6.2.3.4z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
