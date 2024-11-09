import { PaginationProps } from '@/src/types';
import clsx from 'clsx';
import { range } from 'lodash';
import Link from 'next/link';
import { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Pagination = (props: PaginationProps): ReactElement => {
  const {
    totalPages,
    page,
    onChange,
  } = props;

  const { t } = useTranslation();
  const pages = useMemo(() => range(1, totalPages + 1), [totalPages]);

  const handleChangePage = useCallback((value: number) => {
    onChange && onChange(value);
  }, [onChange]);

  return (
    <div className="text-white space-x-4 flex justify-center items-center">
      {page > 1 && (
        <Link
          className="font-bold cursor-pointer"
          href={`?page=${page - 1}`}
          onClick={() => handleChangePage(page - 1)}
        >
          {t('components.pagination.previous')}
        </Link>
      )}
      <div className="space-x-2 flex justify-center items-center">
        {pages.length > 1 && pages.map((item) => (
          <Link
            key={item}
            className={clsx(
              'flex justify-center items-center font-bold w-8 h-8 rounded ',
              {
                'text-white bg-card cursor-pointer': item !== page,
                'text-white pointer-events-none bg-primary': item === page,
              }
            )}
            href={item === 1 ? '?' : `?page=${item}`}
            onClick={() => handleChangePage(item)}
          >
            {item}
          </Link>
        ))}
      </div>
      {page < totalPages && (
        <Link
          className="text-white font-bold cursor-pointer"
          href={`?page=${page + 1}`}
          onClick={() => handleChangePage(page + 1)}
        >
          {t('components.pagination.next')}
        </Link>
      )}
    </div>
  );
};
