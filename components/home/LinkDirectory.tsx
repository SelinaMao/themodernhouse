import { t, type Key } from "@/lib/i18n";
import { areas, VILLA_TYPES, type Area, type Lang, type VillaType } from "@/lib/villas";

type Props = {
  lang: Lang;
  onSelectArea: (a: Area) => void;
  onSelectType: (ty: VillaType) => void;
};

export default function LinkDirectory({ lang, onSelectArea, onSelectType }: Props) {
  const combos = areas.flatMap((a) => VILLA_TYPES.map((ty) => ({ area: a, type: ty })));

  return (
    <section className="mx-auto max-w-6xl border-t border-line py-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{t("directory_eyebrow", lang)}</p>
      <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {combos.map(({ area, type }) => (
          <li key={`${area.id}-${type}`}>
            <button
              type="button"
              onClick={() => {
                onSelectType(type);
                onSelectArea(area.id);
              }}
              className="text-left text-muted hover:text-jade hover:underline"
            >
              {t(`type_${type}` as Key, lang)} {t("directory_sale", lang)} {t("directory_in", lang)} {area.name[lang]}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
