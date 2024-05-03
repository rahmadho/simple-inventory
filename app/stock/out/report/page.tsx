import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import Nav from "@/components/Nav";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { createClient } from "@/utils/supabase/server";

export default async function StockIn() {
  const superbase = createClient();
  const { data: stock_out, error } = await superbase
    .from("stock_out")
    .select(
      `id, supplier_id, outlet_id, product_id, unit_price, quantity, products(*), outlets(*), suppliers(*), created_at`
    );
  // return JSON.stringify(stock_out);
  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink href="/stock/out/report">
          Cetak
        </ButtonLink>
      </div>
      
      <Table>
        <Thead>
          <Trow>
            <Th>No</Th>
            <Th>Nama Barang</Th>
            <Th>Toko/Agen</Th>
            <Th>Supplier</Th>
            <Th>Harga</Th>
            <Th>Jumlah</Th>
            <Th>Total</Th>
            <Th>Tanggal</Th>
          </Trow>
        </Thead>
        <Tbody>
          {stock_out?.map((item, index) => (
            <Trow key={index}>
              <Td>{(index += 1)}</Td>
              <Td>{item.products?.name}</Td>
              <Td>{item.outlets?.name}</Td>
              <Td>{item.suppliers?.name}</Td>
              <Td>{item.unit_price}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.unit_price * item.quantity}</Td>
              <Td>
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
