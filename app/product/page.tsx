import Alert from "@/components/Alert";
import ButtonLink from "@/components/ButtonLink";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { createClient } from "@/utils/supabase/server";

export default async function Product({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  const superbase = createClient();
  const { data: products } = await superbase.from("products").select(`id, name, selling_price, stock`);
  
  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />
      <div className="animate-in flex-1 flex flex-col opacity-0 max-w-4xl px-3">
      {searchParams?.msg && <Alert variant="error">{searchParams.msg}</Alert>}
        <div className="flex w-full items-center gap-3 my-6">
          <ButtonLink href="/product/create">Tambah</ButtonLink>
          <ButtonLink variant="light" href="/stock/in">Stok Masuk</ButtonLink>
          <ButtonLink variant="light" href="/stock/out">Stok Keluar</ButtonLink>
        </div>
        <Table>
          <Thead>
            <Trow>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Harga Jual</Th>
              <Th>Stok</Th>
            </Trow>
          </Thead>
          <Tbody>
              {products?.map((item, index) => (
                <Trow key={index}>
                  <Td>{index += 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.selling_price}</Td>
                  <Td>{item.stock}</Td>
                </Trow>
              ))}
            </Tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
}
