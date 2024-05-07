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
  console.log(rawData);

  const superbase = createClient();
  let message = ''
  try {
    const { data, error } = await superbase.from("stock_in").insert([rawData]);
    if (error) {
      console.error("Error ketika menyimpan data stock in:", error);
      message = 'Gagal menyimpan data'
    } else {
      console.info('Berhasil menyimpan stock in');
      message = 'Berhasil menyimpan data'
    }
  } catch (error) {
    message = 'Terjadi kesalahan, coba lagin nanti'
    console.error("Gagal menyimpan data stock in:", error);
  }
  return redirect(`/stock/in?msg=${message}`);
}