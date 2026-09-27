import { t, type Key } from "@/lib/i18n";
import { areas, VILLA_TYPES, type Area, type Lang, type VillaType } from "@/lib/villas";

type Props = {
  lang: Lang;
  type: VillaType | "any";
  onTypeChange: (t: VillaType | "any") => void;
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  onAreaSelect: (a: Area) => void;
};

export default function HeroSearch({ lang, type, onTypeChange, query, onQueryChange, onSearch, onAreaSelect }: Props) {
  return (
    <div className="mt-7">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("filter_type", lang)}>
        {(["any", ...VILLA_TYPES] as const).map((ty) => (
          <button
            key={ty}
            type="button"
            role="tab"
            aria-pressed={type === ty}
            onClick={() => onTypeChange(ty)}
            className="chip"
          >
            {ty === "any" ? t("tab_all", lang) : t(`type_${ty}` as Key, lang)}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="mt-3 flex overflow-hidden rounded-md border border-line bg-surface"
      >
        <input
          id="hero-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("search_placeholder", lang)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
          aria-label={t("search_placeholder", lang)}
        />
        <button type="submit" className="bg-jade px-5 text-sm font-medium text-jade-ink hover:opacity-90">
          {t("search_button", lang)}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs text-white/70">{t("active_areas", lang)}:</span>
        {areas.map((a) => (
          <button key={a.id} type="button" onClick={() => onAreaSelect(a.id)} className="chip">
            {a.name[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}
