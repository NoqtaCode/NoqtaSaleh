'use server'

// ============================================================
// Gallery Server Actions
// ============================================================

import { client } from "../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { palmVarieties } from "../lib/brand";

export async function uploadImages(formData: FormData) {
  const variety = formData.get('variety') as string;
  const files = formData.getAll('images') as File[];

  if (!variety || files.length === 0) {
    throw new Error("الرجاء اختيار صنف النخيل والصور");
  }

  if (!palmVarieties.some((item) => item.key === variety)) {
    redirect('/admin/gallery/new?error=variety');
  }

  const validFiles = files.filter((file) => file.size > 0);
  if (validFiles.length > 10 || validFiles.some((file) => !file.type.startsWith('image/'))) {
    redirect('/admin/gallery/new?error=files');
  }

  try {
    for (const file of validFiles) {
      const asset = await client.assets.upload('image', file);
      const title = palmVarieties.find((item) => item.key === variety)?.title || "النخيل";
      await client.create({
        _type: 'gallery',
        category: 'palms',
        variety,
        title,
        image: {
          _type: 'image',
          asset: { _type: "reference", _ref: asset._id }
        }
      });
    }
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath(`/projects/palms`);
    revalidatePath('/admin/palm-varieties');
    revalidatePath('/admin/gallery/new');
    // إعادة تحديث صفحة الصنف المحدد
    revalidatePath(`/palm/${variety}`);
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    redirect('/admin/gallery/new?error=upload');
  }

  redirect(`/admin/gallery?uploaded=${validFiles.length}`);
}

export async function deleteGalleryImage(id: string) {
  await client.delete(id);
  revalidatePath('/admin/gallery');
}
