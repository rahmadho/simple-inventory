import AuthButton from "./AuthButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Nav() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const auth = {
    email: user?.email
  }
  

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex items-center gap-3">
            <Link className="hover:text-slate-700" href="/" >Home</Link>
            <Link className="hover:text-slate-700" href="/product" >Produk</Link>
            <Link className="hover:text-slate-700" href="/supplier" >Supplier</Link>
            <Link className="hover:text-slate-700" href="/outlet" >Outlet/Agen</Link>
        </div>
        {<AuthButton user={auth} />}
      </div>
    </nav>
  );
}
