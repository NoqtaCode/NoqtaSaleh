import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, MoveUpLeft, Phone, MessageCircle } from "lucide-react";
import SiteNavbar from "../components/layout/SiteNavbar";
import Footer from "../components/layout/Footer";
import { BRAND_NAME, categories, palmVarieties, sanityCategoryValues } from "../lib/brand";
import { safeFetchFresh } from "../lib/sanity";
import { getSiteSettings } from "../lib/site-settings";
import { localPalmImages } from "../lib/local-images";
import CategoryGallery from "../components/sections/CategoryGallery";
import type { CmsProject } from "../types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, categoryPhotos, testimonials, projects, varietyImages, galleryPhotos] = await Promise.all([
    getSiteSettings(),
    Promise.all(categories.map(async (category) => {
    const photo = await safeFetchFresh<{ imageUrl?: string }>(
      `*[(_type == "gallery" || (_type == "project" && status == "published")) && category in $values] | order(_createdAt desc)[0]{"imageUrl": coalesce(image.asset->url, mainImage.asset->url)}`,
      {},
      { values: sanityCategoryValues[category.slug] ?? [] },
    );
    return [category.slug, photo?.imageUrl] as const;
    })),
    safeFetchFresh<{ _id: string; clientName: string; feedback: string }[]>(
      `*[_type == "testimonial" && isActive == true] | order(_createdAt desc)[0...3]{_id, clientName, feedback}`,
      [],
    ),
    safeFetchFresh<CmsProject[]>(
      `*[_type == "project" && status == "published" && category in ["palms", "nakheel"] && defined(slug.current) && defined(mainImage.asset)] | order(_createdAt desc)[0...6]{_id, title, category, description, "slug": slug.current, "imageUrl": mainImage.asset->url}`,
      [],
    ),
    safeFetchFresh<{ variety: string; imageUrl: string }[]>(
      `*[_type == "gallery" && defined(variety) && defined(image.asset)] | order(_createdAt desc){variety, "imageUrl": image.asset->url}`,
      [],
    ),
    safeFetchFresh<{ _id: string; title: string; imageUrl: string }[]>(
      `*[_type == "gallery" && defined(image.asset)] | order(_createdAt desc)[0...12]{_id, "title": coalesce(title, "نخيل"), "imageUrl": image.asset->url}`,
      [],
    ),
  ]);
  const photos = Object.fromEntries(categoryPhotos);
  const varietyPhotoMap = Object.fromEntries(varietyImages.map((item) => [item.variety, item.imageUrl]));
  const hero = "/images/home/hero-portrait.jpg";

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#1c261e]" dir="rtl">
      <SiteNavbar overlay />
      <main>
        <section id="home" className="w-full overflow-x-hidden bg-[#1b2820]">
          <div className="relative w-full">
            <Image
              src={hero}
              alt="توريد النخيل وزراعتها"
              width={900}
              height={1200}
              priority
              sizes="100vw"
              className="block h-auto w-full"
            />
          </div>
          <div className="flex justify-center bg-[#1b2820] px-3 py-4 sm:px-6 sm:py-6">
            <div className="flex w-full max-w-lg flex-wrap items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-black/40 p-2 backdrop-blur-md sm:gap-3 sm:p-2.5">
              <a
                href="tel:+966539954915"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1b2e23] border border-white/25 px-5 text-xs font-black text-white shadow-md transition hover:bg-white hover:text-[#1b2e23] sm:min-h-12 sm:text-sm"
              >
                <Phone size={16} className="text-[#d49b53]" />
                <span dir="ltr">053 995 4915</span>
              </a>
              <a
                href="https://wa.me/966539954915"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-black text-white shadow-md transition hover:bg-[#20ba5a] sm:min-h-12 sm:text-sm"
              >
                <MessageCircle size={17} />
                <span>محادثة واتساب</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#1b2e23] py-16 text-[#f8f6f0] sm:py-20">
          <div className="site-wrap grid translate-y-1 gap-7 sm:translate-y-2 lg:translate-y-3 lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:gap-20">
            <div><span className="eyebrow !text-[#d49b53]">فكرتنا</span><h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">المكان الجميل<br />يبدأ بحسن اختياره.</h2></div>
            <p className="max-w-3xl text-sm leading-8 text-white/75 sm:text-base sm:leading-9">نختار أجود أصناف النخيل بعناية فائقة، ونرتب التوريد والنقل والغرس الاحترافي بما يلائم طبيعة أرضك واحتياجك.</p>
          </div>
        </section>

        <section className="site-wrap py-16 sm:py-24">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><span className="eyebrow">خيارات تناسب موقعك</span><h2 className="mt-3 text-3xl font-black sm:text-4xl text-[#1b2e23]">أنواع النخيل المتوفرة لدينا</h2></div><p className="max-w-lg text-sm leading-7 text-[#676a5e]">اختر الصنف الذي يناسب احتياجك، ثم تواصل معنا لمعرفة التوفر والكميات.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{palmVarieties.map(({ key, title }) => <article key={key} className="group overflow-hidden rounded-2xl border border-[#e3ddd0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b56a45] hover:shadow-xl"><Link href={`/palm/${key}`} className="block"><div className="photo-card relative aspect-[4/3] bg-[#ede8dc]">{varietyPhotoMap[key] ? <Image src={varietyPhotoMap[key]} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#e5dfd1] to-[#d5c8a8]"><span className="text-5xl text-[#1b2e23]">♧</span></div>}</div><div className="flex items-center justify-between gap-2 p-4"><h3 className="text-sm font-black text-[#1b2e23]">{title}</h3><span className="shrink-0 rounded-full bg-[#1b2e23] px-3.5 py-2 text-[10px] font-black text-white transition group-hover:bg-[#b56a45]">استعرض الصور</span></div></Link></article>)}</div>
        </section>

        <section className="bg-[#1b2e23] py-12 text-[#f8f6f0] sm:py-16"><div className="site-wrap grid grid-cols-2 gap-6 text-center lg:grid-cols-4">{[["+3,500", "نخلة تم توريدها"], ["100%", "نسبة نجاح الغرس"], ["كل المناطق", "توريد لجميع أنحاء المملكة"], ["نقل مجهز", "أسطول نقل مخصص"]].map(([value, label]) => <div key={label} className="py-3"><p className="text-2xl font-black text-[#d49b53] sm:text-4xl">{value}</p><p className="mt-2 text-xs text-white/70 sm:text-sm">{label}</p></div>)}</div></section>

        <section className="site-wrap py-16 sm:py-24"><div className="mb-8"><span className="eyebrow">من المزرعة إلى أرضك</span><h2 className="mt-3 text-3xl font-black sm:text-4xl text-[#1b2e23]">مراحل التوريد والخدمة</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["اختيار النخيل وفرزه", "التجهيز والتقليع الاحترافي", "النقل المؤمّن", "الغرس والمتابعة"].map((step, index) => <article key={step} className="rounded-2xl border border-[#e3ddd0] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b56a45] hover:shadow-lg"><span className="text-xs font-black text-[#b56a45]">المرحلة 0{index + 1}</span><h3 className="mt-4 text-lg font-black text-[#1b2e23]">{step}</h3><div className="mt-5 h-1 w-12 rounded-full bg-[#b56a45]" /></article>)}</div></section>

        <section id="projects" className="bg-[#ede8dc] py-20 sm:py-28">
          <div className="site-wrap">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow">توثيق ميداني</span>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl text-[#1b2e23]">معرض أعمالنا</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5e6355]">لقطات حية ومباشرة من مشاريع توريد وغرس النخيل في مختلف المواقع.</p>
              </div>
              <Link href="/gallery" className="quiet-link inline-flex w-fit items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#b56a45]">
                مشاهدة كافة الصور <ArrowLeft size={16} />
              </Link>
            </div>
            {galleryPhotos.length > 0 ? (
              <div className="rounded-[1.75rem] border border-[#d8d1c0] bg-white p-3 shadow-sm sm:p-6">
                <CategoryGallery images={galleryPhotos} categoryTitle="معرض أعمالنا" />
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-[#d8d1c0] bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-base font-black text-[#1b2e23]">معرض الأعمال قيد التحديث</p>
                <p className="mt-2 text-xs text-[#5e6355]">سيتم عرض الصور الجديدة فور إضافتها من لوحة التحكم</p>
              </div>
            )}
          </div>
        </section>

        <section className="site-wrap pb-20 sm:pb-28">
          <div className="grid overflow-hidden rounded-[2rem] border border-[#e3ddd0] bg-[#ede8dc] shadow-sm lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <span className="eyebrow">طريقة العمل</span>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl text-[#1b2e23]">فكرة واضحة.<br /><span className="text-[#b56a45]">خطوات مرتبة.</span></h2>
              <p className="mt-5 max-w-xl text-sm leading-8 text-[#5e6355] sm:text-base">نحدد احتياج الموقع، ثم ننسق بين النخيل بما يلائم الأرض وطريقة استخدامها.</p>
              <Link href="/about" className="quiet-link mt-8 inline-flex w-fit items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#b56a45]">تعرّف على طريقتنا <ArrowUpLeft size={17} /></Link>
            </div>
            <div className="relative w-full self-center overflow-hidden">
              <Image src="/images/home/hero-main.jpg" alt="خدمات توريد النخيل وزراعتها" width={1920} height={1080} sizes="(max-width: 1024px) 100vw, 50vw" className="block h-auto w-full object-cover" />
            </div>
          </div>
        </section>

        {testimonials.length > 0 && <section className="site-wrap py-12 sm:py-20">
          <div className="mb-8"><span className="eyebrow">آراء العملاء</span><h2 className="mt-4 text-3xl font-black sm:text-4xl text-[#1b2e23]">تجارب من أرض الواقع.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">{testimonials.map((testimonial) => <article key={testimonial._id} className="rounded-[1.25rem] border border-[#e3ddd0] bg-white p-6 shadow-sm sm:p-8"><p className="text-sm leading-8 text-[#55594d]">“{testimonial.feedback}”</p><p className="mt-6 border-t border-[#e3ddd0] pt-4 text-sm font-black text-[#1b2e23]">{testimonial.clientName}</p></article>)}</div>
        </section>}

        <section className="site-wrap py-16 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div><span className="eyebrow">تميز واحترافية</span><h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl text-[#1b2e23]">لماذا تختارنا؟</h2><p className="mt-4 text-sm leading-8 text-[#676a5e]">نحن متخصصون حصرياً في توريد وزراعة أجود أصناف النخيل العربي والواشنطني بمواصفات عالية ونسب نجاح مضمونة. نوفر لك خدمة متكاملة تشمل الفرز، القلع، النقل بأحدث المعدات، والغرس تحت إشراف زراعي متخصص.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#b56a45]">تواصل معنا الآن <ArrowUpLeft size={16} /></Link></div>
            <div><span className="eyebrow">أسئلة شائعة</span><div className="mt-4 divide-y divide-[#e3ddd0] rounded-[1.25rem] border border-[#e3ddd0] bg-white px-5 shadow-sm sm:px-7">
              <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black"><span>كيف أبدأ بطلب خدمة؟</span><span className="text-xl text-[#b56a45] transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-7 text-[#676a5e]">تواصل معنا من صفحة التواصل، وحدد أصناف النخيل والكمية وموقع التوريد.</p></details>
              <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black"><span>ما المعلومات التي تساعد في مناقشة المشروع؟</span><span className="text-xl text-[#b56a45] transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-7 text-[#676a5e]">نوع الخدمة، مساحة الأرض التقريبية، المدينة، وأي صور أو تفاصيل توضح الاحتياج.</p></details>
              <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black"><span>هل أستطيع استعراض المشاريع حسب المجال؟</span><span className="text-xl text-[#b56a45] transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-7 text-[#676a5e]">نعم، اختر النخيل من بطاقات الخدمات لعرض الصور والمشاريع المنشورة في ذلك المجال.</p></details>
            </div></div>
          </div>
        </section>

        <section className="bg-[#1b2e23] px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="site-wrap flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-black tracking-[.16em] text-[#d49b53]">الخطوة التالية</span>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">هل لديك أرض تريد أن تبدأ بها؟</h2>
              <p className="mt-4 text-sm leading-7 text-white/75">تواصل معنا مباشرة عبر الاتصال أو الواتساب ونرتب معك الكميات والأسعار المناسبة فوراً.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+966539954915" className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#d49b53] px-7 text-sm font-black text-[#1b2e23] shadow-lg transition hover:bg-white">
                <Phone size={18} />
                <span>اتصال مباشر</span>
              </a>
              <a href="https://wa.me/966539954915" target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 text-sm font-black text-white shadow-lg transition hover:bg-[#20ba5a]">
                <MessageCircle size={18} />
                <span>واتساب</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
