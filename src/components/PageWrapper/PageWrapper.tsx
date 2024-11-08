import { PageWrapperProps } from '@/src/types';
import { PropsWithChildren, ReactElement } from 'react';

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>): ReactElement => {
  const { title, children } = props;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold md:text-heading-two text-heading-three text-white">{title}</h2>
      {children}
    </div>
  );
};
