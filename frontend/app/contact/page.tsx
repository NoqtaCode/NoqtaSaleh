import Link from "next/link";
import { ArrowUpLeft, Mail, MessageCircle, Phone } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { BRAND_NAME, CONTACT } from "../../lib/brand";
import { getSiteSettings } from "../../lib/site-settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا | طلب واستفسار عن توريد وزراعة النخيل",
  description:
    "تواصل معنا لمناقشة احتياجك من مختلف أصناف النخيل بالكميات والمقاسات المطلوبة. اتصال مباشر: 0539954915 أو عبر محادثة الواتساب الفورية.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const settingsPromise = getSiteSettings();
  return <ContactContent settingsPromise={settingsPromise} />;
}

async function ContactContent({ settingsPromise }: { settingsPromise: ReturnType<typeof getSiteSettings> }) {
  const settings = await settingsPromise;
  const phone = settings.phone || CONTACT.phoneLink;
  const phoneDisplay = settings.phone || CONTACT.phoneDisplay;
  const whatsapp = (settings.whatsapp || CONTACT.whatsapp).replace(/\D/g, "");
  const email = settings.email || CONTACT.email;
  return (
    <div className="min-h-screen bg-[#f3f6f3] text-[#1c261e]" dir="rtl">
      <SiteNavbar />
      <main className="site-wrap pb-24 pt-32 sm:pt-40">
        <section className="grid overflow-hidden rounded-[2rem] bg-[#1b2e23] text-white shadow-xl lg:grid-cols-[1fr_.85fr]">
          <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden p-7 sm:min-h-[500px] sm:p-12">
            <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -left-3 -top-12 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative">
              <span className="eyebrow !text-[#d49b53]">تواصل معنا</span>
              <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight sm:text-6xl">
                لكل فكرة بداية.<br />
                <span className="text-[#d49b53]">خلّنا نسمع فكرتك.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-8 text-white/75 sm:text-base">
                صف لنا موقعك أو الكميات والأصناف المطلوبة، وسنرتب معك كافة التفاصيل والأسعار مباشرة.
              </p>
            </div>
            <Link href="/services" className="relative mt-8 inline-flex w-fit items-center gap-2 text-sm font-black text-[#d49b53] transition hover:text-white">
              تعرّف على الخدمات <ArrowUpLeft size={16} />
            </Link>
          </div>
          <div className="bg-white p-6 text-[#1c261e] sm:p-10 lg:p-12">
            <span className="eyebrow">قنوات التواصل المباشر</span>
            <h2 className="mt-4 text-2xl font-black text-[#1b2e23]">نحن في خدمتك دائماً.</h2>
            <p className="mt-2 text-sm leading-7 text-[#676a5e]">اختر وسيلة التواصل الأنسب لك وسنرد عليك بأسرع وقت.</p>
            <div className="mt-7 space-y-3">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-[#f0f5ee] border border-[#d8e4d3] p-4 transition hover:bg-[#e4ede1]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b2e23] text-white"><MessageCircle size={19} /></span>
                  <span><span className="block text-xs font-bold text-[#556950]">واتساب</span><span className="mt-1 block font-black" dir="ltr">{phoneDisplay}</span></span>
                  <ArrowUpLeft size={16} className="mr-auto text-[#556950]" />
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-4 rounded-2xl bg-[#f4f7f4] border border-[#d5e2d5] p-4 transition hover:bg-[#ebf2eb]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b2e23] text-white"><Phone size={18} /></span>
                  <span><span className="block text-xs font-bold text-[#556950]">اتصال مباشر</span><span className="mt-1 block font-black" dir="ltr">{phoneDisplay}</span></span>
                  <ArrowUpLeft size={16} className="mr-auto text-[#2d6a4f]" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-4 rounded-2xl bg-[#f4f7f4] border border-[#d5e2d5] p-4 transition hover:bg-[#ebf2eb]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b2e23] text-white"><Mail size={18} /></span>
                  <span><span className="block text-xs font-bold text-[#556950]">البريد الإلكتروني</span><span className="mt-1 block break-all font-black">{email}</span></span>
                </a>
              )}
              {!phone && !email && !whatsapp && <p className="mt-7 rounded-2xl bg-[#f4f7f4] p-4 text-sm leading-7 text-[#676a5e]">لا تتوفر بيانات تواصل حالياً.</p>}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
