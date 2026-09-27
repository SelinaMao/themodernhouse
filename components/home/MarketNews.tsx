import SectionHeading from "./SectionHeading";
import { t } from "@/lib/i18n";
import { IMG_BASE, n, type Lang } from "@/lib/villas";

const POSTS = [
  { title: "news1_title", body: "news1_body", date: "news1_date", image: "villas/queen.jpg" },
  { title: "news2_title", body: "news2_body", date: "news2_date", image: "villas/king.jpg" },
  { title: "news3_title", body: "news3_body", date: "news3_date", image: "villas/single.jpg" },
] as const;

export default function MarketNews({ lang, hc, onSeeAll }: { lang: Lang; hc: string; onSeeAll: () => void }) {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 border-t border-line py-12">
      <SectionHeading
        index={n("06", lang)}
        eyebrow={t("news_eyebrow", lang)}
        title={t("news_title", lang)}
        hc={hc}
        action={{ label: t("see_all_news", lang), onClick: onSeeAll }}
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {POSTS.map((post) => (
          <li key={post.title} className="card-surface overflow-hidden">
            <div className="relative">
              <img src={IMG_BASE + post.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-0 p-4 text-base font-semibold leading-snug text-white">{t(post.title, lang)}</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted">{t(post.body, lang)}</p>
              <p className="mt-3 text-xs text-muted">{t(post.date, lang)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
