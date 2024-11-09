import { InputProps } from '@/src/types';
import clsx from 'clsx';
import { forwardRef, type ReactElement } from 'react';

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref): ReactElement => {
  const { error, className, ...rest } = props;

  return (
    <div className="space-y-1 w-full">
      <input
        ref={ref}
        {...rest}
        className={clsx(
          className,
          // eslint-disable-next-line max-len
          'px-4 py-2 rounded-lg2 w-full transition-all bg-input text-white focus:outline-none focus:bg-transparent focus:ring-input focus:ring-1 h-11.25',
          {
            'border border-input focus:border-input': !error,
            'border border-error focus:border-error': error,
          }
        )}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
});
