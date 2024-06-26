'use client'

// import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { SignOut } from "./AuthButtonAction";
import { redirect } from "next/navigation";


export default function AuthButton({user} : {user: any}) {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return user && user.email ? (
    <div className="flex items-center gap-4">
      <Link href="/account">Hey, {user.email}!</Link>
      <form action={SignOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
