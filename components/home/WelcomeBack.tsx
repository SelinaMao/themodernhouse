import { t } from "@/lib/i18n";
import { img, usd, type Lang, type Villa } from "@/lib/villas";

export default function WelcomeBack({ lang, villa, onOpen }: { lang: Lang; villa: Villa | null; onOpen: (id: string) => void }) {
  if (!villa) return null;
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 py-8">
      <p className="text-sm font-medium">{t("welcome_back_title", lang)}</p>
      <p className="text-xs text-muted">{t("welcome_back_sub", lang)}</p>
      <button
        type="button"
        onClick={() => onOpen(villa.id)}
        className="card-surface mt-4 flex w-full max-w-md items-center gap-4 p-3 text-left hover:border-jade"
      >
        <img src={img(villa)} alt="" className="h-16 w-24 shrink-0 rounded-md object-cover" />
        <span>
          <span className="block text-sm font-medium">{villa.name[lang]}</span>
          <span className="block text-xs text-muted">{villa.location[lang]}</span>
          <span className="num mt-1 block font-mono text-sm">{usd(villa.price)}</span>
        </span>
      </button>
    </section>
  );
}
