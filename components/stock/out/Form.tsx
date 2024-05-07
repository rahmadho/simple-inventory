'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import InputPriceStockOut from "./InputPriceStockOut";
import React from "react";
import Image from "next/image";
export default function FormStockOut({suppliers, products, outlets}: {suppliers: any[]|null, products: any[]|null, outlets: any[]|null}) {

    const [hargaProduct, setHargaProduct] = React.useState(0);
    const onChangeProduct = (idProduct: any) => {
        const product = products?.find((item, index) => item.id == idProduct)
        if (product !== undefined) setHargaProduct(product.selling_price)
    }

    return (
        <>
        <div className="flex gap-3">
          <Image src="/3.png" alt="Ukuran 3 Kg" width={200} height={200} className="p-3 cursor-pointer rounded shadow-md object-cover" />
          <Image src="/5.png" alt="Ukuran 3 Kg" width={200} height={200} className="p-3 cursor-pointer rounded shadow-md object-cover" />
          <Image src="/12.png" alt="Ukuran 3 Kg" width={200} height={200} className="p-3 cursor-pointer rounded shadow-md object-cover" />
        </div>
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
              onChange={(e) => onChangeProduct(e.target.value)}
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
          <InputPriceStockOut value={hargaProduct} />
          <div className="mb-6">
            <Label htmlFor="quantity"> Jumlah </Label>
            <Input type="number" id="quantity" name="quantity" />
          </div>
          <Button type="submit">Simpan</Button>
        </>
    )
}