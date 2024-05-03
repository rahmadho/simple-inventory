import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const StoreStockOut = async (formData: FormData) => {
    "use server";

    const rawData = {
      supplier_id: formData.get("supplier_id"),
      product_id: formData.get("product_id"),
      outlet_id: formData.get("outlet_id"),
      unit_price: formData.get("unit_price"),
      quantity: formData.get("quantity") ?? 0,
    };

    const superbase = createClient();

    try {
      // cek stok apakah mencukupi
      const { data: product } = await superbase.from("products").select().eq('id', rawData.product_id);
        
      if (product !== undefined && product !== null && product.length > 0 && product[0].stock >= rawData.quantity ) {
        const { data, error } = await superbase.from("stock_out").insert([rawData]);
        if (error) {
            console.error("Error ketika menyimpan stock out:", error);
            return redirect("/stock/out?msg=Gagal menyimpan data");
        } else {
            console.info("Berhasil menyimpan stock out");
            return redirect("/stock/out?msg=Berhasil menyimpan data");
        }
      } else {
        console.info("Stock out tidak cukup");
        return redirect("/stock/out?msg=Tidak ditemukan atau stok tidak cukup");
      }
    } catch (error) {
      console.error("Gagal menyimpan data stock out:", error);
      if (error instanceof Error) {
        return redirect(`/stock/out?msg=${error.message}`);
      } else {
        return redirect(`/stock/out?msg=Terjadi kesalahan`);
      }
    }
  };