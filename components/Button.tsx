import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // Can be text, other components, etc.
  type: 'button' | 'submit',
  onClick?: () => void; // Optional click handler function
  variant?: 'slate' | 'blue' | 'light'; // Optional variant for styling
  disabled?: boolean; // Optional flag to disable the button
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'slate',
  ...props
}) => {
    const disabled = props.disabled;
  const baseClasses = 'font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none';

  const variantClasses = {
    blue: `${baseClasses} text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700 dark:border-blue-700`,
    slate: `${baseClasses} text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`,
    light: `py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`,
  };

  return (
    <button
      className={`${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;