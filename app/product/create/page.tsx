import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Nav from "@/components/Nav";
import Link from "next/link";
import { StoreProduct } from "../actions";
import Alert from "@/components/Alert";

export default function ProductCreate({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  return (
    <div className="w-full max-w-4xl flex flex-col">
      <Link
        href="/product"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <Nav />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {searchParams?.msg && <Alert variant="error">{searchParams.msg}</Alert>}
        <form action={StoreProduct} className="p-3">
          <div className="mb-6">
            <Label htmlFor="name">Nama</Label>
            <Input type="text" name="name" id="name" />
          </div>
          <div className="mb-6">
            <Label htmlFor="selling_price">Harga Jual</Label>
            <Input type="number" name="selling_price" id="selling_price" />
          </div>
          <div className="mb-6">
            <Label htmlFor="initial_stock">Stok Awal</Label>
            <Input type="number" name="initial_stock" id="initial_stock" />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
