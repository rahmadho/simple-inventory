import { ComponentProps } from 'react';

type TableProps = ComponentProps<"table"> & {};

const Table = ({children, ...props}: TableProps) => {
  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...props}>
        {children}
      </table>
    </div>
  );
};

const Thead = ({ children, ...props }: ComponentProps<"thead"> & {}) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" {...props}>
          {children}
        </thead>
    );
}

const Tbody = ({ children, ...props }: ComponentProps<"tbody"> & {}) => {
    return (
        <tbody {...props}>
          {children}
        </tbody>
    );
}

const Trow = ({ children, ...props }: ComponentProps<"tr"> & {}) => {
    return (
        <tr {...props}>
          {children}
        </tr>
    );
}
const Th = ({ children, ...props }: ComponentProps<"th"> & {}) => {
    const baseClassName = 'px-6 py-3'; // Internal class name
    const mergedClassName = `${baseClassName} ${props.className || ''}`;
    return (
        <th {...props} className={mergedClassName}>
          {children}
        </th>
    );
}
const Td = ({ children, ...props }: ComponentProps<"td"> & {}) => {
    const baseClassName = 'px-6 py-3'; // Internal class name
    const mergedClassName = `${baseClassName} ${props.className || ''}`;
    return (
        <td className={mergedClassName}>
          {children}
        </td>
    );
}

export {Table, Thead, Tbody, Trow, Th, Td};