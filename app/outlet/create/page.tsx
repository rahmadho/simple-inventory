import Input from "@/components/Input";
import Label from "@/components/Label";
import { createClient } from "@/utils/supabase/server";

export default function OutletCreate() {
  const doStore = async (formData: FormData) => {
    "use server";

    const rawData = {
      name: formData.get("name"),
      address: formData.get("address"),
    };

    const superbase = createClient();

    try {
      const { data, error } = await superbase
        .from("products")
        .insert([rawData]);
      if (error) {
        console.error("Store error:", error);
      } else {
        console.log("Store successfully!");
      }
    } finally {
      // set loading = false
    }
  };

  return (
    <div className="w-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
      <form action={doStore} className="p-3">
        <div className="mb-6">
          <Label htmlFor="name">Nama</Label>
          <Input type="text" name="name" id="name" />
        </div>
        <div className="mb-6">
          <Label htmlFor="address">Alamat</Label>
          <textarea
            id="address"
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
