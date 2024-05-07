"use server";

import { createClient } from "@/utils/supabase/server";

export async function AuthUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? false;
}
