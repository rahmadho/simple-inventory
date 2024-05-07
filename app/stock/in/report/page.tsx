import ButtonLink from "@/components/ButtonLink";
import Nav from "@/components/Nav";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { formatRupiah, formatTanggal } from "@/utils/helpers/format";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/types";

export default async function Page() {
  const supabase = createClient()
  
  type StockInType = Database["public"]["Tables"]["stock_in"]["Row"];
  type ProductType = Database["public"]["Tables"]["products"]["Row"];
  type SupplierType = Database["public"]["Tables"]["suppliers"]["Row"];
  type CollectType = StockInType & {products: ProductType} & {suppliers: SupplierType}

  const {data: stockIn, error} = await supabase.from("stock_in").select( `*, products(*), suppliers(*)` )
    .returns<CollectType[]>();
  if (error) throw error

  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />
      <div className="flex w-full items-center gap-3 my-6">
        <ButtonLink variant="light" href="/stock/in">Kembali</ButtonLink>
        <ButtonLink href="/stock/in/report">Cetak</ButtonLink>
      </div>
      <Table>
        <Thead>
          <Trow>
            <Th>No</Th>
            <Th className="text-nowrap">Nama Barang</Th>
            <Th className="text-nowrap">Supplier</Th>
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
              <Td className="text-nowrap">{item.products?.name}</Td>
              <Td className="text-nowrap">{item.suppliers?.name}</Td>
              <Td className="text-nowrap">Rp {formatRupiah(item.unit_price)}</Td>
              <Td>{item.quantity}</Td>
              <Td className="text-nowrap">Rp {formatRupiah((item.unit_price ?? 0) * (item.quantity ?? 0))}</Td>
              <Td className="text-nowrap">{formatTanggal(item.created_at)}</Td>
            </Trow>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
