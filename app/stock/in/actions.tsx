import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const StoreStockIn = async (formData: FormData) => {
  "use server";

  const rawData = {
    supplier_id: formData.get("supplier_id"),
    product_id: formData.get("product_id"),
    unit_price: formData.get("unit_price"),
    quantity: formData.get("quantity"),
  };

  const superbase = createClient();
  
  try {
    const { data, error } = await superbase.from("stock_in").insert([rawData]);
    if (error) {
      console.error("Error ketika menyimpan data stock in:", error);
      return redirect("/stock/in?msg=Gagal menyimpan data");
    } else {
      console.info('Berhasil menyimpan stock in');
      return redirect("/stock/in?msg=Berhasil menyimpan data");
    }
  } catch (error) {
    console.error("Gagal menyimpan data stock in:", error);
    if (error instanceof Error) {
      return redirect(`/stock/in?msg=${error.message}`);
    } else {
      return redirect(`/stock/in?msg=Terjadi kesalahan`);
    }
  }
};
