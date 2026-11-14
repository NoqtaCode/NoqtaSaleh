import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpLeft, Images } from "lucide-react";
import { safeFetchFresh } from "../../../lib/sanity";
import { categories, getCategory, sanityCategoryValues } from "../../../lib/brand";
import SiteNavbar from "../../../components/layout/SiteNavbar";
import Footer from "../../../components/layout/Footer";
import CategoryGallery from "../../../components/sections/CategoryGallery";
import type { Metadata } from "next";
import { localPalmImages } from "../../../lib/local-images";

export const revalidate = 0;

function resolveCategory(slug: string) {
  return getCategory(slug);
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = resolveCategory(slug);
  return category ? {
    title: `أعمال ${category.title}`,
    description: `${category.description} استعرض نماذج من مشاريع توريد النخيل.`,
    alternates: { canonical: `/projects/${category.slug}` },
  } : { title: "معرض الأعمال" };
}

export default async function FullGalleryPage(props: { params: Promise<{ category: string }> }) {
  const { category: slug } = await props.params;
  const category = resolveCategory(slug);
  if (!category) notFound();

  const values = sanityCategoryValues[category.slug] ?? [];
  const cmsImages = await safeFetchFresh<{ _id: string; title: string; imageUrl: string }[]>(`
    *[(_type == "gallery" || (_type == "project" && status == "published")) && category in $values] | order(_createdAt desc) {
      _id, "title": coalesce(title, ""), "imageUrl": coalesce(image.asset->url, mainImage.asset->url)
    }
  `, [], { values });
  const images = cmsImages;

  return (
    <div className="min-h-screen bg-[#f3f0e7] text-[#25291f]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-28 sm:pt-36">
        <section className="site-wrap">
          <div className="mb-8 overflow-hidden rounded-[1.5rem] bg-[#28392d] px-6 py-8 text-white sm:px-10 sm:py-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-black text-[#e4a483]"><Images size={14} /> معرض / {category.title}</span>
                <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">صور ومشاريع {category.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">تصفّح الصور والأفكار في هذا المجال، واختر ما يناسب مشروعك.</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white/80">{images.length} صورة</span>
            </div>
          </div>

          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-black sm:text-2xl">صور من {category.title}</h2>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-[#657354]">كل المجالات <ArrowUpLeft size={17} /></Link>
          </div>

          {images.length > 0 ? (
            <div className="rounded-[1.5rem] border border-[#ded8cb] bg-[#f8f6f0] p-3 sm:p-6 lg:p-8">
              <CategoryGallery images={images} categoryTitle={category.title} />
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-[#c9c2b3] bg-[#f8f6f0] px-6 py-20 text-center sm:py-28">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5dfd1] text-[#b65f3b]"><Images size={23} /></span>
              <h2 className="mt-5 text-xl font-black">لا توجد صور متاحة حالياً</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#677386]">لا توجد صور منشورة في معرض {category.title} حتى الآن.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {categories.filter((item) => item.slug !== category.slug).map((item) => <Link key={item.slug} href={`/projects/${item.slug}`} className="rounded-full border border-[#ded8cb] px-4 py-2 text-xs font-bold text-[#28392d] hover:bg-[#e5dfd1]">{item.title}</Link>)}
              </div>
            </div>
          )}

          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#657354]"><ArrowRight size={17} /> العودة للرئيسية</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
