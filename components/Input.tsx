'use client'

import { ComponentProps, useState } from "react";
import { NumericFormat } from "react-number-format";

type Props = ComponentProps<"input"> & {};

export default function Input({...props} : Props) {
  return (
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    />
  );
}

export function InputPrice({...props}) {
  const [value, setValue] = useState<number | undefined>(0)
  return (
    <>
      <NumericFormat 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        prefix={'Rp '} thousandSeparator="." decimalSeparator="," 
        onValueChange={(values, sourceInfo) => {
          setValue(values.floatValue);
        }} 
      />
      <input type="hidden" name={props.name} value={value} />
    </>
  )
}