import Link from "next/link";
import { ArrowUpLeft, ImagePlus, Sprout } from "lucide-react";
import { safeFetchFresh } from "../../../lib/sanity";
import { palmVarieties } from "../../../lib/brand";

export const revalidate = 0;

export default async function PalmVarietiesAdmin() {
  const counts = await Promise.all(palmVarieties.map(async ({ key }) =>
    safeFetchFresh<number>(`count(*[_type == "gallery" && variety == $variety])`, 0, { variety: key }),
  ));

  return <div className="pb-16" dir="rtl">
    <header className="mb-8 rounded-3xl bg-slate-900 p-7 text-white sm:p-10">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300"><Sprout size={24} /></span>
      <h1 className="mt-5 text-2xl font-black sm:text-3xl">صور أصناف النخيل</h1>
      <p className="mt-2 text-sm leading-7 text-slate-300">ارفع صوراً لكل صنف لتظهر في بطاقته على الموقع.</p>
    </header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {palmVarieties.map((variety, index) => <article key={variety.key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between"><span className="text-xs font-black text-amber-700">الصنف 0{index + 1}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{counts[index]} صورة</span></div>
        <h2 className="mt-5 text-lg font-black text-slate-900">{variety.title}</h2>
        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/admin/gallery/new?variety=${variety.key}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-800"><ImagePlus size={17} />أضف صوراً<ArrowUpLeft size={15} /></Link>
          <Link href={`/palm/${variety.key}`} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"><ArrowUpLeft size={15} />عرض الصفحة</Link>
        </div>
      </article>)}
    </div>
  </div>;
}
