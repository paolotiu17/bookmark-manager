import { checkWordInSentence } from '@lib/checks';
import clsx from 'clsx';
import React from 'react';

export interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string;
    isSecondary?: boolean;
}

const Button = ({ label, children, className, isSecondary, ...props }: ButtonProps) => {
    clsx({
        'px-3': !className?.includes('px'),
    });
    return (
        <button
            type="button"
            className={clsx(
                { 'px-3': !checkWordInSentence(className, 'px') },
                { 'py-1': !checkWordInSentence(className, 'py') },
                ['flex items-center text-sm font-bold rounded-sm justify-center disabled:opacity-50'],
                isSecondary ? 'text-primary border border-primary' : 'text-white bg-primary',
                className,
            )}
            {...props}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;