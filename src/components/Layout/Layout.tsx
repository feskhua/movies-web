import { Waves } from '@/src/components';
import { PropsWithChildren, ReactElement } from 'react';

export const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <div className="bg-background">
      <div className="bg-background h-full w-full justify-center flex min-h-svh">
        <div className="flex w-full max-w-screen-xl">
          <div className="md:p-30 pt-20 grid p-4 z-20 flex-auto -mt">
        {children}
          </div>
        </div>
      </div>
      <Waves/>
    </div>
  );
};
