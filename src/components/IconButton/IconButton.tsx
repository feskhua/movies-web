import { IconButtonProps } from '@/src/types';
import clsx from 'clsx';
import React, { type ReactElement } from 'react';

export const IconButton = (props: IconButtonProps): ReactElement => {
  const { icon, onClick, title, className } = props;

  return (
    <button
      onClick={onClick}
      aria-label={title}
      title={title}
      className={clsx(
        'p-2 rounded-full transition-colors duration-200 ease-in-out',
        className
      )}
    >
      {title && (
        <span className="hidden text-white md:block">
          {title}
        </span>
      )}
      {icon}
    </button>
  );
};
