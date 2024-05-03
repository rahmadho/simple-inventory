'use server' 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function StoreProduct(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    selling_price: formData.get("selling_price"),
    stock: formData.get("initial_stock"),
    initial_stock: formData.get("initial_stock"),
  };

  const superbase = createClient();

  try {
    const { data, error } = await superbase.from("products").insert([rawData]);
    if (error) {
      return redirect("/product/create?msg=Gagal menyimpan data");
    } else {
      return redirect("/product?msg=Berhasil menyimpan data");
    }
  } catch (error) {
    if (error instanceof Error) {
      return redirect(`/product/create?msg=${error.message}`);
    } else {
      return redirect(`/product/create?msg=Terjadi kesalahan`);
    }
  }
};
