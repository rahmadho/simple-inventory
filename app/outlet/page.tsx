import Nav from "@/components/Nav";
import { Table, Tbody, Td, Th, Thead, Trow } from "@/components/Table";
import { createClient } from "@/utils/supabase/server";

export default async function Outlet() {
  const superbase = createClient();
  const { data: outlets } = await superbase.from("outlets").select(`id, name, address`);
  
  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Nav />

      <Table>
        <Thead>
          <Trow>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Alamat</Th>
          </Trow>
        </Thead>
        <Tbody>
            {outlets?.map((item, index) => (
              <Trow key={index}>
                <Td>{index += 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.address}</Td>
              </Trow>
            ))}
          </Tbody>
      </Table>
    </div>
  );
}
