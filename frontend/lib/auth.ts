'use server'

// ============================================================
// Auth Server Actions (login / logout)
// ============================================================

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from "./sanity";
import { createAdminSessionToken } from "./session";

export async function login(formData: FormData) {
  const inputUsername = formData.get('username') as string;
  const inputPassword = formData.get('password') as string;

  try {
    // جلب بيانات الدخول المخزنة في إعدادات قاعدة البيانات
    let settings: { username?: string; password?: string } | null = null;
    try {
      settings = await client.fetch(`*[_type == "settings"][0]{username, password}`);
    } catch {
      // Local default credentials remain usable when the settings service is unavailable.
    }

    // البيانات الصحيحة: قاعدة البيانات أولاً ثم متغيرات البيئة كخيار احتياطي
    const validUsername = process.env.ADMIN_USER || settings?.username || "admin";
    const validPassword = process.env.ADMIN_PASS || settings?.password;

    if (validPassword && inputUsername === validUsername && inputPassword === validPassword) {
      const cookieStore = await cookies();
      
      const sessionToken = await createAdminSessionToken();
      if (!sessionToken) return { success: false, error: "إعداد جلسة الإدارة غير مكتمل" };

      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // أسبوع واحد
        path: '/',
        sameSite: 'lax',
      });
      
      return { success: true };
    } 
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "حدث خطأ فني أثناء تسجيل الدخول" };
  }
  
  return { success: false };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
