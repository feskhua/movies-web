import { useFiles } from '@/src/hooks';
import { CardProps } from '@/src/types';
import { ReactElement } from 'react';

export const Card = (props: CardProps): ReactElement => {
  const { title, year, path } = props;

  const { get } = useFiles();

  return (
    <div className="group relative p-2 flex flex-col gap-4 transition-transform rounded-lg bg-card transform hover:bg-opacity-55 hover:bg-hover-color duration-300 ease-in-out">
          <img className="w-full rounded-xl h-full group-hover:opacity-90 object-cover rounded-t-lg" src={get(path)} alt="Movie Image"/>
            <div>
              <p className="text-white text-body-large font-sans font-medium">{title}</p>
              <p className="text-white text-body-small font-sans font-medium">{year}</p>
            </div>
    </div>
    );
};
