"use client";
import ButtonLink from "@/components/ButtonLink";
// import Nav from "@/components/Nav";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { createClient } from "@/utils/supabase/client";
import { ComponentState, useEffect, useState } from "react";

export default function StockIn() {
  // const [stockIn, setStokcIn] = useState([]);
  const [stockIn, setStokcIn] = useState<ComponentState[]>([]);

  useEffect(() => {
    const getData = async () => {
      const superbase = createClient();

      const { data, error } = await superbase
        .from("stock_in")
        .select(
          `id, supplier_id, product_id, unit_price, quantity, products(*), suppliers(*), created_at`
        );
      if (error) {
        return; // Exit if error occurs during data fetching
      }
      setStokcIn(data);
    };
    getData();
  }, []);

  return (
    <div className="w-full max-w-4xl flex flex-col">
      {/* <Nav /> */}
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink variant="light" href="/stock/in">Kembali</ButtonLink>
        <ButtonLink href="/stock/in/report">Cetak</ButtonLink>
      </div>
      <Table>
        <Thead>
          <Trow>
            <Th>No</Th>
            <Th>Nama Barang</Th>
            <Th>Supplier</Th>
            <Th>Harga</Th>
            <Th>Jumlah</Th>
            <Th>Total</Th>
            <Th>Tanggal</Th>
          </Trow>
        </Thead>
        <Tbody>
          {stockIn?.map((item, index) => (
            <Trow key={index}>
              <Td>{(index += 1)}</Td>
              <Td>{item.products?.name}</Td>
              <Td>{item.suppliers?.name}</Td>
              <Td>{item.unit_price}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.unit_price * item.quantity}</Td>
              <Td>{item.created_at}</Td>
            </Trow>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
