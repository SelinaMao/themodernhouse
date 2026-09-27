import { t } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/villas";

export default function CtaBanner({ lang, hc }: { lang: Lang; hc: string }) {
  const tgUrl = `https://t.me/${site.telegram}`;
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 py-12">
      <div className="flex flex-col items-start gap-5 rounded-xl bg-jade p-8 text-jade-ink sm:flex-row sm:items-center sm:justify-between md:p-10">
        <div>
          <h3 className={`text-2xl md:text-3xl ${hc}`}>{t("cta_banner_title", lang)}</h3>
          <p className="mt-2 max-w-[52ch] opacity-90">{t("cta_banner_sub", lang)}</p>
        </div>
        <a href={tgUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-md bg-jade-ink px-5 py-3 font-medium text-jade hover:opacity-90">
          {t("cta_banner_button", lang)}
        </a>
      </div>
    </section>
  );
}
