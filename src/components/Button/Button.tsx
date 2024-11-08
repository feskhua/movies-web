import { ButtonProps } from '@/src/types/components';
import { type ReactElement } from 'react';
import clsx from 'clsx';

export const Button = (props: ButtonProps): ReactElement => {
  const { text, variant = 'primary', className } = props;

  return (
    <button
      {...props}
      className={clsx(
        className,
        'px-6 py-2 rounded-lg font-semibold focus:outline-none h-13.5',
        {
          'bg-primary hover:bg-green-600 text-white': variant === 'primary',
          'bg-card hover:bg-teal-900 text-white': variant === 'secondary',
          'bg-error hover:bg-red-600 text-white': variant === 'danger',
          'border border-white bg-transparent text-white hover:bg-white hover:text-card': variant === 'outline'
        }
      )}>
      {text}
    </button>
  );
};
