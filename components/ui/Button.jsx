import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-blue-500/30 focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-green-500/30 focus:ring-secondary",
        outline: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
        ghost: "text-foreground hover:bg-gray-100 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/30",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
        icon: "p-2",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
