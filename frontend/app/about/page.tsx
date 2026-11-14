import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Compass, Leaf, Sprout } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { BRAND_NAME, categories } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | خبرة وريادة في توريد وزراعة النخيل بالمملكة",
  description:
    "تعرف على خبرتنا في توريد وغرس مختلف أصناف النخيل العربي والواشنطني والبرحي والصقعي بنسب نجاح مضمونة في جميع مناطق المملكة. تواصل معنا: 0539954915",
  alternates: { canonical: "/about" },
};

const principles = [
  ["نبدأ بالاستماع", "نفهم طبيعة المكان وكيف تريد استخدامه واختيار النخيل الأنسب له."],
  ["نرتب الصورة", "نجمع احتياجاتك في خطة واضحة ومترابطة للتوريد والنقل والغرس."],
  ["نهتم بالتفاصيل", "نتابع كل خطوة بالميدان حتى تكتمل المساحة وتثمر كما خُطط لها."],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1c261e]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-28 sm:pt-36">
        <section className="site-wrap grid overflow-hidden rounded-[2rem] border border-[#e3ddd0] bg-[#ede8dc] shadow-sm lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <span className="eyebrow">الحكاية / من نحن</span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl text-[#1b2e23]">
              النخيل يثمر جمالاً،<br />
              <span className="text-[#b56a45]">والاختيار يبدأ من هنا.</span>
            </h1>
            <p className="mt-6 text-sm leading-8 text-[#5e6355] sm:text-base sm:leading-9">
              متخصصون في توريد وزراعة أجود أصناف النخيل العربي والواشنطني، مع عناية متكاملة تبدأ من اختيار النخلة وفرزها وتمتد إلى النقل والغرس بإشراف احترافي.
            </p>
            <div className="mt-6 space-y-3">
              {["أصناف نخيل مختارة بعناية", "توريد ونقل مجهز ومؤمّن", "غرس ومتابعة بنسب نجاح مضمونة"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#1b2e23]">
                  <Check size={17} className="text-[#b56a45]" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1b2e23] px-7 py-3.5 text-sm font-black text-white shadow-md transition hover:bg-[#b56a45]"
            >
              ابدأ الحديث <ArrowUpLeft size={16} />
            </Link>
          </div>
          <div className="w-full self-center overflow-hidden">
            <Image
              src="/images/home/hero-main.jpg"
              alt="توريد النخيل وزراعتها"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="block h-auto w-full object-cover"
            />
          </div>
        </section>

        <section className="site-wrap mt-16 sm:mt-24">
          <div className="max-w-2xl">
            <span className="eyebrow">كيف نعمل</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl text-[#1b2e23]">من الفكرة إلى المكان.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {principles.map(([title, description], index) => (
              <article key={title} className="rounded-[1.25rem] border border-[#e3ddd0] bg-white p-6 shadow-sm sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ede8dc] text-[#b56a45]">
                  {index === 0 ? <Compass size={20} /> : index === 1 ? <Sprout size={20} /> : <Leaf size={20} />}
                </span>
                <span className="mt-6 block text-[10px] font-black tracking-[.18em] text-[#b56a45]">0{index + 1}</span>
                <h3 className="mt-2 text-xl font-black text-[#1b2e23]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#676a5e]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-wrap mt-16 sm:mt-24">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">خبرات متكاملة</span>
              <h2 className="mt-4 text-3xl font-black text-[#1b2e23]">مجال تخصصنا: النخيل</h2>
            </div>
            <Link href="/services" className="inline-flex w-fit items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#b56a45]">
              خدماتنا المتكاملة في النخيل <ArrowUpLeft size={16} />
            </Link>
          </div>
          <div className="grid justify-items-center">
            {categories.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`} className="group w-full max-w-2xl overflow-hidden rounded-2xl bg-[#1b2e23] text-white shadow-md">
                <div className="photo-card aspect-[4/3] bg-[#ede8dc] sm:aspect-[16/10]">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover object-center" />
                </div>
                <div className="flex items-center justify-between p-4 text-sm font-black">
                  <span>{item.title}</span>
                  <ArrowUpLeft size={15} className="text-[#d49b53] transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
