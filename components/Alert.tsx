import { ComponentProps, DetailsHTMLAttributes } from "react";
type AlertProps = {
    children: React.ReactNode,
    variant?: 'info' | 'error' | 'success'
}
export default function Alert({
    children, 
    variant = 'info'
} : AlertProps) {
    const baseClasses = 'p-4 mb-4 text-sm rounded-lg';

    const variantClasses = {
        info: `${baseClasses} text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400`,
        error: `${baseClasses} text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400`,
        success: `${baseClasses} text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400`,
    };
  return (
    <div
      className={`${variantClasses[variant]}`}
      role="alert"
    >
      {children}
    </div>
  );
}
