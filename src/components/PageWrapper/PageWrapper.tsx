import { PageWrapperProps } from '@/src/types';
import { PropsWithChildren, ReactElement } from 'react';

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>): ReactElement => {
  const { title, children, headerChildren } = props;

  return (
    <div className="flex flex-col md:gap-30 gap-6">
      <div className="flex gap-6 items center">
        <h2 className="font-semibold md:text-heading-two text-heading-three text-white">{title}</h2>
        {headerChildren}
      </div>
      {children}
    </div>
  );
};
