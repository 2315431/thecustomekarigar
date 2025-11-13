"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  cookies().set("sb-access-token", data.session!.access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookies().set("sb-refresh-token", data.session!.refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return { success: true };
}
