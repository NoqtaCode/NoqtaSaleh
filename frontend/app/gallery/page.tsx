import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Compass, Leaf, Sprout } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories } from "../../lib/brand";
import type { CmsProject } from "../../types";
import type { Metadata } from "next";
import CategoryGallery from "../../components/sections/CategoryGallery";
import { localPalmImages } from "../../lib/local-images";

import { safeFetchFresh } from "../../lib/sanity";

export const metadata: Metadata = {
  title: "معرض أعمالنا | صور حية من مشاريع توريد وغرس النخيل",
  description:
    "استعرض لقطات حية وتوثيقاً ميدانياً من مشاريعنا في توريد وغرس مختلف أصناف النخيل الواشنطني والبرحي والصقعي والعربي بالمملكة. تواصل معنا: 0539954915",
  alternates: { canonical: "/gallery" },
};

const steps = [
  { title: "حدد مكان النخيل", description: "وزع النخيل بحسب استخدام الأرض والمساحات التي تريد تظليلها.", Icon: Compass },
  { title: "حدد موقع النخيل", description: "وزع النخيل بحسب استخدام الأرض والمساحات المتاحة.", Icon: Sprout },
  { title: "جهز موقع الغرس", description: "رتب خطوات النقل والغرس بما يناسب طبيعة الأرض.", Icon: Leaf },
];

export const revalidate = 0;

export default async function GalleryPage() {
  const images = await safeFetchFresh<{ _id: string; title: string; imageUrl: string }[]>(
    `*[_type == "gallery" && defined(image.asset)] | order(_createdAt desc){_id, "title": coalesce(title, "نخيل"), "imageUrl": image.asset->url}`,
    [],
  );

  return (
    <div className="min-h-screen bg-[#f3f6f3] text-[#1c261e]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-28 sm:pt-36">
        <section className="site-wrap overflow-hidden rounded-[2rem] bg-[#1b2e23] p-7 text-white shadow-md sm:p-12 lg:p-16">
          <span className="eyebrow !text-[#d49b53]">توثيق ميداني</span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">معرض أعمالنا</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
            لقطات حية ومباشرة من مشاريع توريد وغرس النخيل في مختلف مناطق المملكة بأعلى معايير الجودة والاحترافية.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d49b53] px-6 py-3 text-sm font-black text-[#1b2e23] shadow-md transition hover:bg-white hover:text-[#1b2e23]">
            ناقش مشروعك <ArrowUpLeft size={16} />
          </Link>
        </section>

        <section className="site-wrap mt-14 sm:mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">صور من الميدان</span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl text-[#1b2e23]">معرض أعمالنا</h2>
              <p className="mt-2 text-sm leading-7 text-[#5e6355]">
                استعرض باقة مختارة من صور أعمالنا في تقليع ونقل وتوريد وغرس مختلف أصناف النخيل.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#2d6a4f]">
              خدمات التوريد <ArrowUpLeft size={16} />
            </Link>
          </div>
          {images.length > 0 ? (
            <div className="rounded-[1.75rem] border border-[#d5e2d5] bg-white p-4 shadow-sm sm:p-7">
              <CategoryGallery images={images} categoryTitle="معرض أعمالنا" />
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-[#d5e2d5] bg-white px-6 py-20 text-center shadow-sm">
              <p className="text-lg font-black text-[#1b2e23]">لا توجد صور مضافة حالياً</p>
              <p className="mt-2 text-xs text-[#5e6355]">يمكنك رفع الصور الحديثة من لوحة التحكم لتظهر في المعرض مباشرة.</p>
              <Link href="/admin/palm-varieties" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1b2e23] px-6 py-2.5 text-xs font-black text-white hover:bg-[#2d6a4f]">
                إضافة صور من لوحة التحكم <ArrowUpLeft size={14} />
              </Link>
            </div>
          )}
        </section>

        <section className="site-wrap mt-16 sm:mt-24">
          <div className="max-w-2xl">
            <span className="eyebrow">كيف تبدأ</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl text-[#1b2e23]">ثلاث خطوات لترتيب الفكرة</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map(({ title, description, Icon }, index) => (
              <article key={title} className="relative rounded-[1.25rem] border border-[#d5e2d5] bg-white p-6 shadow-sm sm:p-8">
                <span className="absolute left-6 top-5 text-5xl font-black text-[#e2ebe2]">0{index + 1}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e2ebe2] text-[#2d6a4f]"><Icon size={20} /></span>
                <h3 className="mt-6 text-xl font-black text-[#1b2e23]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#676a5e]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-wrap mt-16 sm:mt-24">
          <div className="flex flex-col gap-5 rounded-[1.75rem] bg-[#e5ede5] border border-[#d5e2d5] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#2d6a4f] shadow-sm"><Check size={22} /></span>
              <div>
                <h2 className="text-xl font-black text-[#1b2e23]">جاهز لبدء مشروعك؟</h2>
                <p className="mt-1 text-sm text-[#676a5e]">أخبرنا عن نوع وكمية النخيل التي تبحث عنها وسنتولى الباقي.</p>
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#1b2e23] px-7 py-3.5 text-sm font-black text-white shadow-md transition hover:bg-[#2d6a4f]">
              تواصل معنا <ArrowUpLeft size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
