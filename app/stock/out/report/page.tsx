"use client";
import ButtonLink from "@/components/ButtonLink";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { formatRupiah } from "@/utils/helpers/format";
import { createClient } from "@/utils/supabase/client";
import { ComponentState, useEffect, useState } from "react";

export default function StockIn() {
  const [stockOut, setStokcOut] = useState<ComponentState[]>([]);

  useEffect(() => {
    const getData = async () => {
      const superbase = createClient();
      const { data, error } = await superbase
        .from("stock_out")
        .select(
          `id, supplier_id, outlet_id, product_id, unit_price, quantity, products(*), outlets(*), suppliers(*), created_at`
        );
      if (error) {
        return; // Exit if error occurs during data fetching
      }
      setStokcOut(data);
    };
    getData();
  }, []);

  return (
    <div className="w-full max-w-4xl flex flex-col">
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink variant="light" href="/stock/out">
          Kembali
        </ButtonLink>
        <ButtonLink href="/stock/out/report">Cetak</ButtonLink>
      </div>

      <Table>
        <Thead>
          <Trow>
            <Th className="px-3">No</Th>
            <Th className="text-nowrap px-3">Nama Barang</Th>
            <Th className="text-nowrap px-3">Toko/Agen</Th>
            <Th className="text-nowrap px-3">Supplier</Th>
            <Th className="px-3">Harga</Th>
            <Th className="px-3">Jumlah</Th>
            <Th className="px-3">Total</Th>
            <Th className="px-3">Tanggal</Th>
          </Trow>
        </Thead>
        <Tbody>
          {stockOut?.map((item, index) => (
            <Trow key={index}>
              <Td>{(index += 1)}</Td>
              <Td className="text-nowrap">{item.products?.name}</Td>
              <Td className="text-nowrap">{item.outlets?.name}</Td>
              <Td className="text-nowrap">{item.suppliers?.name}</Td>
              <Td className="text-nowrap">Rp {formatRupiah(item.unit_price)}</Td>
              <Td>{item.quantity}</Td>
              <Td className="text-nowrap">Rp {formatRupiah(item.unit_price * item.quantity)}</Td>
              <Td className="text-nowrap">
                {new Date(item.created_at).toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Td>
            </Trow>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
