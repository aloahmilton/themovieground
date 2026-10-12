"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { INTERFACE_LANGUAGES, Locale } from "@/lib/translations";

export default function InterfaceLanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const current = INTERFACE_LANGUAGES.find((language) => language.code === locale) || INTERFACE_LANGUAGES[0];

  const changeLanguage = async (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale === locale) return;
    const response = await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    if (response.ok) startTransition(() => router.refresh());
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Interface language: ${current.name}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/70"
      >
        <Image src={`https://flagcdn.com/w40/${current.flag}.png`} alt="" width={20} height={15} unoptimized className="h-[15px] w-5 rounded-[2px] object-cover" />
        <span>{locale.toUpperCase()}</span>
        <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="listbox"
        aria-label="Platform language"
        aria-hidden={!open}
        className={`absolute right-0 top-full z-[90] mt-2 w-40 origin-top-right rounded-md border border-white/10 bg-[#111113]/95 p-1 shadow-2xl shadow-black/50 backdrop-blur-2xl transition-all duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {INTERFACE_LANGUAGES.map((language) => (
          <button
            key={language.code}
            type="button"
            role="option"
            aria-selected={locale === language.code}
            onClick={() => changeLanguage(language.code)}
            disabled={pending}
            className={`flex w-full items-center gap-3 rounded px-2.5 py-2 text-left text-sm transition-colors ${
              locale === language.code ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Image src={`https://flagcdn.com/w40/${language.flag}.png`} alt="" width={20} height={15} unoptimized className="h-[15px] w-5 rounded-[2px] object-cover" />
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}