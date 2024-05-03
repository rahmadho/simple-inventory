import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Nav from "@/components/Nav";
// import InputPriceStockOut from "@/components/stock/out/InputPriceStockOut";
import { createClient } from "@/utils/supabase/server";
import { StoreStockOut } from "./actions";
import ButtonLink from "@/components/ButtonLink";

export default async function StockOut({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  const superbase = createClient();
  const { data: suppliers } = await superbase.from("suppliers").select();
  const { data: products } = await superbase.from("products").select();
  const { data: outlets } = await superbase.from("outlets").select();

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
          <div className="mb-6">
            <Label htmlFor="supplier_id"> Pemasok </Label>
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
            <Label htmlFor="product_id"> Barang </Label>
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
            <Label htmlFor="outlet_id"> Agen / Outlet </Label>
            <select
              id="outlet_id"
              name="outlet_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""></option>
              {outlets?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <Label htmlFor="unit_price"> Harga </Label>
            <Input type="number" id="unit_price" name="unit_price" />
            <span className="font-semibold text-slate-400 cursor-pointer">
              Rp. 20.000
            </span>
          </div>
          {/* <InputPriceStockOut value="" /> */}
          <div className="mb-6">
            <Label htmlFor="quantity"> Jumlah </Label>
            <Input type="number" id="quantity" name="quantity" />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
}
