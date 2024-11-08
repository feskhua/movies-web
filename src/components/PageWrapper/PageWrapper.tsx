import { PageWrapperProps } from '@/src/types';
import { PropsWithChildren, ReactElement } from 'react';

export const PageWrapper = (props: PropsWithChildren<PageWrapperProps>): ReactElement => {
  const { title, children } = props;

  return (
    <div className="flex flex-col md:p-30 px-6 self-start bg-background gap-30 w-full max-w-screen-xl">
      <h2 className="font-semibold md:text-heading-two text-heading-three text-white">{title}</h2>
      {children}
    </div>
  );
};
