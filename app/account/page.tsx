import Nav from "@/components/Nav";
import AccountForm from "./account-form";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="w-full max-w-4xl flex flex-col">
        <Nav />
        <div className="flex w-full items-center gap-3 my-6"></div>
        <AccountForm user={user} />
      </div>
    </>
  );
}
