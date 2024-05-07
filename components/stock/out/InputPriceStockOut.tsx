'use client'
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
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        </div>
    );
  }