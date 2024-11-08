import { CheckboxProps } from '@/src/types';
import clsx from 'clsx';
import { ReactElement } from 'react';

export const Checkbox = (props: CheckboxProps): ReactElement => {
  const { label, className, ...rest } = props;

  return (
    <div className={clsx('inline-flex items-center', className)}>
      <label className="flex items-center cursor-pointer relative" htmlFor="check">
        <input
          type="checkbox"
          // eslint-disable-next-line max-len
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none bg-input rounded shadow hover:shadow-md checked:ring-1 checked:ring-input checked:bg-transparent"
          id="check"
          {...rest}
        />
        <span
          className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
    </span>
      </label>
      <label className="cursor-pointer ml-2 text-white text-body-small font-sans" htmlFor="check">
        {label}
      </label>
    </div>
  );
};
