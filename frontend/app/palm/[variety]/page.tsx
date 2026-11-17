import { notFound } from "next/navigation";
import { ArrowRight, Images } from "lucide-react";
import Link from "next/link";
import SiteNavbar from "../../../components/layout/SiteNavbar";
import Footer from "../../../components/layout/Footer";
import CategoryGallery from "../../../components/sections/CategoryGallery";
import { safeFetchFresh } from "../../../lib/sanity";
import { palmVarieties } from "../../../lib/brand";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateStaticParams() {
  return palmVarieties.map((v) => ({ variety: v.key }));
}

export async function generateMetadata(props: { params: Promise<{ variety: string }> }): Promise<Metadata> {
  const { variety: key } = await props.params;
  const variety = palmVarieties.find((v) => v.key === key);
  if (!variety) return { title: "صنف النخيل" };
  return {
    title: `توريد وزراعة ${variety.title} | أجود الأصناف والأسعار بالمملكة`,
    description: `استعرض صور ومواصفات توريد ${variety.title} بمختلف الأطوال والكميات مع النقل المجهز والغرس بنسب نجاح عالية لجميع مناطق المملكة. اتصل الآن: 0539954915`,
    alternates: { canonical: `/palm/${key}` },
    openGraph: {
      title: `توريد وزراعة ${variety.title} في السعودية`,
      description: `أجود أصناف ${variety.title} للتوريد الفوري للمشاريع والمزارع والفلل. تواصل: 0539954915`,
    },
  };
}

export default async function PalmVarietyPage(props: { params: Promise<{ variety: string }> }) {
  const { variety: key } = await props.params;
  const variety = palmVarieties.find((v) => v.key === key);
  if (!variety) notFound();

  const images = await safeFetchFresh<{ _id: string; title: string; imageUrl: string }[]>(
    `*[_type == "gallery" && variety == $variety && defined(image.asset)] | order(_createdAt desc) {
      _id,
      "title": coalesce(title, $varTitle),
      "imageUrl": image.asset->url
    }`,
    [],
    { variety: key, varTitle: variety.title },
  );

  return (
    <div className="min-h-screen bg-[#f3f6f3] text-[#1c261e]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-28 sm:pt-36">
        <section className="site-wrap">

          {/* رأس الصفحة */}
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-[#1b2e23] px-6 py-8 text-white shadow-md sm:px-10 sm:py-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-black text-[#d49b53]">
                  <Images size={14} /> أصناف النخيل / {variety.title}
                </span>
                <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{variety.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                  تصفّح صور هذا الصنف وتعرّف على جودته ومواصفاته التوريدية.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white/90">
                {images.length} صورة
              </span>
            </div>
          </div>

          {/* الصور */}
          {images.length > 0 ? (
            <div className="rounded-[1.75rem] border border-[#d5e2d5] bg-white p-4 shadow-sm sm:p-7">
              <CategoryGallery images={images} categoryTitle={variety.title} />
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-[#d5e2d5] bg-white px-6 py-20 text-center shadow-sm sm:py-28">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e2ebe2] text-[#2d6a4f]">
                <Images size={23} />
              </span>
              <h2 className="mt-5 text-xl font-black text-[#1c261e]">لا توجد صور مضافة لهذا الصنف حالياً</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#676a5e]">
                يمكنك إضافة صور لهذا الصنف من لوحة التحكم، أو تواصل معنا للاستفسار عنه مباشرة.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                  href="/contact"
                  className="rounded-full bg-[#1b2e23] px-6 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-[#2d6a4f]"
                >
                  استفسر عن {variety.title}
                </Link>
              </div>
            </div>
          )}

          {/* روابط أصناف أخرى */}
          <div className="mt-12">
            <h2 className="mb-4 text-sm font-black text-[#1b2e23]">أصناف أخرى</h2>
            <div className="flex flex-wrap gap-2">
              {palmVarieties.filter((v) => v.key !== key).map((v) => (
                <Link
                  key={v.key}
                  href={`/palm/${v.key}`}
                  className="rounded-full border border-[#d5e2d5] bg-white px-5 py-2 text-xs font-bold text-[#1c261e] shadow-sm transition hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
                >
                  {v.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2d6a4f] transition hover:text-[#1b2e23]">
            <ArrowRight size={17} /> العودة للرئيسية
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
