"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, Menu, MessageCircle, Phone, X } from "lucide-react";
import { categories, BRAND_NAME } from "../../lib/brand";

const links = [
  ["الرئيسية", "/"], ["من نحن", "/about"], ["معرض أعمالنا", "/gallery"], ["الخدمات", "/services"],
];

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = overlay ? "border-white/20 bg-[#1b2820]/75 text-white shadow-xl" : "border-[#e3ddd0] bg-white/95 text-[#1c261e] shadow-md";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-10" dir="rtl">
      <nav className={`mx-auto flex max-w-[1380px] items-center justify-between rounded-full border px-4 py-2.5 shadow-[0_10px_35px_rgba(27,46,35,.10)] backdrop-blur-xl transition sm:px-6 ${theme}`}>
        <Link href="/" className="flex items-center gap-3" aria-label="الرئيسية">
          <span className="relative block h-10 aspect-[16/10] shrink-0 sm:h-12">
            <Image src="/logo.png" alt="الشعار" fill sizes="120px" priority className="object-contain object-center drop-shadow-sm" />
          </span>
        </Link>
        <div className={`hidden items-center gap-7 text-xs font-bold xl:flex ${overlay ? "text-white/85" : "text-[#5e6355]"}`}>
          {links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-[#d49b53]">{label}</Link>)}
        </div>
        <div className="hidden items-center gap-2.5 xl:flex">
          <a href="tel:+966539954915" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white hover:text-[#1b2e23]">
            <Phone size={13} className="text-[#d49b53]" /> <span>اتصال مباشر</span>
          </a>
          <a href="https://wa.me/966539954915" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-black text-white shadow-md transition hover:bg-[#20ba5a]">
            <MessageCircle size={15} /> واتساب
          </a>
        </div>
        <button type="button" onClick={() => setMenuOpen((open) => !open)} className={`flex h-10 w-10 items-center justify-center rounded-full border xl:hidden ${overlay ? "border-white/25" : "border-[#ded8cb]"}`} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        {menuOpen && createPortal(
          <div id="mobile-navigation" className="fixed inset-x-3 top-[76px] z-[100] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl border border-[#ded8cb] bg-[#faf8f4] p-4 text-[#1c261e] shadow-2xl sm:left-auto sm:right-6 sm:w-[min(calc(100vw-3rem),24rem)] xl:hidden">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-[#ede8dc]">{label}</Link>)}
            <div className="my-2 grid grid-cols-2 gap-1 border-y border-[#e3ddd0] py-2">{categories.map((category) => <Link key={category.slug} href={`/projects/${category.slug}`} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-xs text-[#5e6355] hover:bg-[#ede8dc]">{category.title}</Link>)}</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href="tel:+966539954915" className="flex items-center justify-center gap-2 rounded-full bg-[#1b2e23] px-4 py-3 text-center text-sm font-black text-white shadow-sm">
                <Phone size={16} className="text-[#d49b53]" /> <span>اتصال مباشر</span>
              </a>
              <a href="https://wa.me/966539954915" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-center text-sm font-black text-white shadow-md">
                <MessageCircle size={17} /> تواصل عبر واتساب
              </a>
            </div>
          </div>, document.body,
        )}
      </nav>
    </header>
  );
}
