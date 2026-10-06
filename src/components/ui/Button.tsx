import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#2E7D32] hover:bg-[#388E3C] text-[#F8F4EC] shadow-md',
    secondary: 'bg-[#D49B42] hover:bg-[#F3B251] text-[#1E1510] shadow-md',
    outline: 'bg-transparent border border-[#3E2C22] text-[#F8F4EC] hover:border-[#D49B42] hover:bg-[#2A1D16]',
    danger: 'bg-red-900/30 border border-red-700/50 text-red-300 hover:bg-red-900/50'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
