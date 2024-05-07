import Button from "@/components/Button";
import Input, { InputPrice } from "@/components/Input";
import Label from "@/components/Label";
import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { StoreStockIn } from "./actions";
import Alert from "@/components/Alert";
import ButtonLink from "@/components/ButtonLink";

export default async function StockIn({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  const superbase = createClient();
  const { data: suppliers } = await superbase.from("suppliers").select();
  const { data: products } = await superbase.from("products").select();

  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink variant="light" href="/stock/in/report">
          Laporan
        </ButtonLink>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        {searchParams?.msg && <Alert variant="error">{searchParams.msg}</Alert>}
        <form action={StoreStockIn} className="p-3">
          <div className="mb-6">
            <label
              htmlFor="supplier_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pemasok
            </label>
            <select
              id="supplier_id"
              name="supplier_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""></option>
              {suppliers?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="product_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Barang
            </label>
            <select
              id="product_id"
              name="product_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""></option>
              {products?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <Label htmlFor="unit_price">Harga</Label>
            {/* <Input type="number" id="unit_price" name="unit_price" /> */}
            <InputPrice id="unit_price" name="unit_price" />
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jumlah
            </label>
            <Input type="number" id="quantity" name="quantity" />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
}
