"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/villas";
import { t } from "@/lib/i18n";

export default function FloatingRail({ lang }: { lang: Lang }) {
  const [showTop, setShowTop] = useState(false);
  const tgUrl = `https://t.me/${site.telegram}`;

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const btn = "flex h-11 w-11 items-center justify-center rounded-full bg-jade text-jade-ink shadow-lg hover:opacity-90";

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-2.5 sm:right-6">
      <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className={btn} aria-label={t("phone", lang)}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 5c0 8.5 6.5 15 15 15l2-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5-4 1z" strokeLinejoin="round" />
        </svg>
      </a>
      <a href={tgUrl} target="_blank" rel="noreferrer" className={btn} aria-label="Telegram">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M21.5 4.5 2.7 11.9c-1 .4-1 1.7.1 2l4.6 1.4 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.5 4.8 3.6c.7.5 1.8.1 2-.8l3-16.4c.2-1-.7-1.8-1.7-1.4Zm-3 3.4-7.6 6.9-.3 3.2-1.5-4.5 8.6-6.4c.3-.2.6.2.3.4z" />
        </svg>
      </a>
      {showTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={btn} aria-label="Scroll to top">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
