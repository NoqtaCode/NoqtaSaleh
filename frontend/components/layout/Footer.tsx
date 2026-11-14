import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { BRAND_DESCRIPTION, BRAND_NAME, CONTACT, categories } from "../../lib/brand";
import { getSiteSettings } from "../../lib/site-settings";
import FloatingActions from "../ui/FloatingActions";

export default async function Footer() {
  const settings = await getSiteSettings();
  const phone = settings.phone || CONTACT.phoneLink;
  const phoneLabel = settings.phone || CONTACT.phoneDisplay;
  const whatsapp = settings.whatsapp || CONTACT.whatsapp;
  const email = settings.email || CONTACT.email;
  return (
    <>
    <FloatingActions />
    <footer className="bg-[#1b2e23] text-[#f8f6f0] pb-16 sm:pb-0" dir="rtl">
      <div className="site-wrap grid gap-10 py-14 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_.75fr_.75fr_1fr] lg:gap-16">
        <div className="max-w-sm">
          <Link href="/" className="mb-5 inline-flex items-center gap-3">
            <span className="relative h-14 aspect-[16/10] shrink-0">
              <Image src="/logo.png" alt="الشعار" fill sizes="160px" className="object-contain object-right drop-shadow-md" />
            </span>
          </Link>
          <p className="text-sm leading-7 text-white/60">{BRAND_DESCRIPTION}</p>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d49b53]">لنتحدث عن مشروعك <ArrowUpLeft size={16} /></Link>
        </div>
        <div><h2 className="mb-5 text-sm font-black text-[#d49b53]">مجالات العمل</h2><ul className="space-y-3 text-sm text-white/60">{categories.map((category) => <li key={category.slug}><Link href={`/projects/${category.slug}`} className="transition hover:text-[#d49b53]">{category.title}</Link></li>)}</ul></div>
        <div><h2 className="mb-5 text-sm font-black text-[#d49b53]">روابط سريعة</h2><ul className="space-y-3 text-sm text-white/60"><li><Link href="/about" className="transition hover:text-[#d49b53]">من نحن</Link></li><li><Link href="/services" className="transition hover:text-[#d49b53]">الخدمات</Link></li><li><Link href="/gallery" className="transition hover:text-[#d49b53]">معرض أعمالنا</Link></li><li><Link href="/contact" className="transition hover:text-[#d49b53]">تواصل معنا</Link></li></ul></div>
        <div><h2 className="mb-5 text-sm font-black text-[#d49b53]">تواصل معنا</h2><ul className="space-y-4 text-sm text-white/70">
          {phone && <li><a href={`tel:${phone}`} className="inline-flex items-center gap-3"><Phone size={16} /> <span dir="ltr">{phoneLabel}</span></a></li>}
          {email && <li><a href={`mailto:${email}`} className="inline-flex items-center gap-3"><Mail size={16} /> {email}</a></li>}
          {whatsapp && <li><a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#d49b53] px-5 py-3 font-black text-[#1b2e23] shadow-md transition hover:bg-white"><MessageCircle size={16} /> واتساب</a></li>}
        </ul></div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-wrap flex flex-col items-center justify-between gap-4 py-5 text-[11px] text-white/50 sm:flex-row">
          <span>من الأرض... نصنع أثرًا يدوم. © {new Date().getFullYear()}</span>
          
          {/* شعار المطور NoqtaCode */}
          <a
            href="https://wa.me/967737543563"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-[#1a4a39] bg-[#0c2b20]/90 px-4 py-1.5 text-xs transition-all duration-300 hover:border-[#2dd4bf]/60 hover:bg-[#0f3427] hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
            title="تواصل مع المطور عبر واتساب"
          >
            <span className="font-bold text-[#2dd4bf] transition group-hover:text-[#5eead4]">تطوير وتصميم</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#051711] px-3 py-1 font-mono text-xs font-black text-white shadow-inner">
              <span>NoqtaCode</span>
              <span className="font-bold text-[#f59e0b]">&lt;/&gt;</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
    </>
  );
}
