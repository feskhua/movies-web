import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, type ReactElement } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

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
          'px-4 py-2 rounded-lg2 w-full transition-all bg-input text-white focus:border-input focus:outline-none focus:bg-transparent focus:ring-input focus:ring-1 h-11.25',
          {
            'border-1 border-input': !error,
            'border-1 border-error': error,
          }
        )}
      />
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
});
