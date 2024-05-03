import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
  children: React.ReactNode; // Can be text, other components, etc.
  href: string,
  variant?: 'none' | 'slate' | 'blue' | 'light'; // Optional variant for styling
}

const ButtonLink: React.FC<LinkButtonProps> = ({
  children,
  href = '#',
  variant = 'slate',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none';

  const variantClasses = {
    'none': '',
    blue: `${baseClasses} text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700 dark:border-blue-700`,
    slate: `${baseClasses} text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`,
    light: `py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`,
  };

  return (
    <Link href={href}
      className={`${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;