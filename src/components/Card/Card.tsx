import { useFiles } from '@/src/hooks';
import { CardProps } from '@/src/types';
import Image from 'next/image';
import { ReactElement } from 'react';

export const Card = (props: CardProps): ReactElement => {
  const { title, year, path } = props;

  const { get } = useFiles();

  return (
    <div className="group relative p-2 flex flex-col gap-4 transition-transform rounded-lg bg-card transform hover:bg-opacity-55 hover:bg-hover-color duration-300 ease-in-out">
      <div className="xl:min-h-100 md:min-h-100 min-h-56 relative">
        <Image
          fill
          priority
          src={get(path)}
          alt={title}
          className="object-cover rounded-lg2 aspect-[9/16]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <p className="text-white text-body-large font-sans font-medium">{title}</p>
        <p className="text-white text-body-small font-sans font-medium">{year}</p>
      </div>
    </div>
    );
};
