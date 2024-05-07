'use server'

import Alert from "@/components/Alert";
import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { StoreStockOut } from "./actions";
import ButtonLink from "@/components/ButtonLink";
import FormStockOut from "@/components/stock/out/Form";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  const superbase = createClient();
  const { data: suppliers } = await superbase.from("suppliers").select();
  const { data: products } = await superbase.from("products").select();
  const { data: outlets } = await superbase.from("outlets").select();

  const tesSubmit = async () => {
    'use server'
    redirect('/stock/out?msg=Tes Flash')
  }

  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink variant="light" href="/stock/out/report">
          Laporan
        </ButtonLink>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        {searchParams?.msg && <Alert variant="error">{searchParams.msg}</Alert>}
        <form action={StoreStockOut} className="p-3">
          <FormStockOut suppliers={suppliers} products={products} outlets={outlets} />
        </form>
      </div>
    </div>
  );
}
