import {PaginationProps} from "@/src/types";
import clsx from "clsx";
import {isEmpty, range} from "lodash";
import Link from "next/link";
import {ReactElement, useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";

export const Pagination = (props: PaginationProps): ReactElement => {
  const {
    totalPages,
    page,
    onChange,
  } = props;
  
  const {t} = useTranslation();
  const pages = useMemo(() => range(1, totalPages + 1), [totalPages]);
  
  const handleChange = useCallback((value: number) => {
    if (!isEmpty(onChange)) {
      onChange(value);
    }
  }, [onChange]);
  
  return (
    <div className="flex justify-center items-center space-x-4">
      {page > 1 && (
        <Link
          className="cursor-pointer font-bold hover:animate-pulse"
          href={`?page=${page - 1}`}
          onClick={() => handleChange(page - 1)}
        >
          {t('components.pagination.previous')}
        </Link>
      )}
      <div className="flex justify-center items-center space-x-2">
        {pages.map((p) => (
          <Link
            key={p}
            className={clsx(
              'font-bold hover:animate-pulse w-8 h-8 rounded flex justify-center items-center',
              {
                'bg-primary text-white pointer-events-none': p === page,
                'text-white bg-card cursor-pointer': p !== page,
              }
            )}
            href={p === 1 ? '?' : `?page=${p}`}
            onClick={() => handleChange(p)}
          >
            {p}
          </Link>
        ))}
      </div>
      {page < totalPages && (
        <Link
          className="cursor-pointer font-bold hover:animate-pulse"
          href={`?page=${page + 1}`}
          onClick={() => handleChange(page + 1)}
        >
          {t('components.pagination.next')}
        </Link>
      )}
    </div>
  );
}
