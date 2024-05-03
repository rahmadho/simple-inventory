import { ComponentProps } from "react";

type Props = ComponentProps<"label"> & {};

export default function Label({children, ...props} : Props) {
  return (
    <label
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      {...props}
    >
      {children}
    </label>
  );
}
