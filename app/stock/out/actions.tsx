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
    let message = 'Flash Message';

    try {
      // cek stok apakah mencukupi
      const { data: product } = await superbase.from("products").select().eq('id', rawData.product_id);
        
      if (product !== undefined && product !== null && product.length > 0 && product[0].stock >= rawData.quantity ) {
        const { data, error } = await superbase.from("stock_out").insert([rawData]);
        if (error) {
            console.error("Error ketika menyimpan stock out:", error);
            message = 'Gagal menyimpan data'
        } else {
            console.info("Berhasil menyimpan stock out");
            message = `Berhasil menyimpan data. Stok barang diupdate [-${rawData.quantity}]`
        }
      } else {
        console.info("Stock out tidak cukup");
        message = 'Tidak ditemukan atau stok tidak cukup'
      }
    } catch (error) {
      console.error("Gagal menyimpan data stock out:", error);
      if (error instanceof Error) {
        message = error.message
      } else {
        message = 'Terjadi kesalahan, coba lagi nanti'
      }
    }
    return redirect(`/stock/out?msg=${message}`);
  };