import { safeFetch } from "../../../../../lib/sanity";
import { updateProject } from "../../../../../actions/projects";
import SaveSubmitButton from "../../../../../components/admin/SaveSubmitButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import type { CmsProject } from "../../../../../types";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await safeFetch<CmsProject | null>(`*[_id == $id][0]{ ..., "imageUrl": mainImage.asset->url }`, null, { id: params.id });

  if (!project) return <div>المشروع غير موجود</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/projects" className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">تعديل مشروع: {project.title}</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <form action={async (formData) => {
            'use server';
            await updateProject(params.id, formData);
            redirect('/admin/projects');
        }} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان العمل *</label>
            <input name="title" defaultValue={project.title} required type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-gray-50/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">القسم المخصص *</label>
              <select name="category" defaultValue={project.category} required className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 focus:border-blue-500 outline-none">
                <option value="fences">الشبوك</option>
                <option value="palms">النخيل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">حالة النشر</label>
              <select name="status" defaultValue={project.status} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 focus:border-blue-500 outline-none">
                <option value="published">✅ منشور</option>
                <option value="draft">⏳ مسودة</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الصورة (اتركها فارغة إذا لا تريد التغيير)</label>
            <input type="file" name="image" accept="image/*" className="w-full border-2 border-gray-100 rounded-2xl p-3 bg-gray-50/50" />
            {project.imageUrl && <Image src={project.imageUrl} alt={`الصورة الحالية لمشروع ${project.title}`} width={256} height={128} className="mt-4 h-32 w-64 rounded-xl border border-slate-200 object-cover" />}
          </div>

          <SaveSubmitButton />
        </form>
      </div>
    </div>
  );
}
