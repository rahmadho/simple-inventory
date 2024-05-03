import Input from "@/components/Input";
import Label from "@/components/Label";
import { useEffect, useState } from "react";

export default function InputPriceStockOut({value}: {value: any}) {

    const [price, setPrice] = useState('');

    useEffect(() => {
        setPrice(value)
    }, [value]);
  
    return (
        <div className="mb-6">
            <Label htmlFor="unit_price"> Harga </Label>
            <Input
            type="number"
            id="unit_price"
            name="unit_price"
            onChange={(e) => setPrice(e.target.value)} />
            <span className="font-semibold text-slate-400 cursor-pointer" onClick={() => setPrice('20000')}>
            Rp. 20.000
            </span>
        </div>
    );
  }