import { DragEndDropProps } from '@/src/types';
import clsx from 'clsx';
import Image from 'next/image';
import { type ChangeEvent, type ReactElement, useEffect, useRef, useState, type DragEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const DragEndDrop = (props: DragEndDropProps): ReactElement => {
  const {
    value = null,
    className,
    onDrop,
  } = props;

  const { t } = useTranslation();

  const [preview, setPreview] = useState<string | null>(value);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createPreview = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      createPreview(file);
      onDrop(file);
    } catch (e) {
      console.error(e);
    }
  }, [onDrop]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const file = files?.[0];

      if (!file) {
        return;
      }

      createPreview(file);
      onDrop(file);
    } catch (e) {
      console.error(e);
    }
  }, [onDrop]);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current && fileInputRef.current?.click()}
      className={clsx(
        'aspect-24/25 bg-input flex justify-center items-center flex-col rounded-lg2 cursor-pointer max-h-126',
        className,
        {
          'border-white border-2 border-dashed': !preview,
        }
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleClick}
      />
      {preview && (
        <div className="w-full h-full relative overflow-hidden">
          <Image
            fill
            priority
            src={preview}
            alt="preview"
            className="object-cover rounded-lg2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {!preview && (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_407)">
              <path
                // eslint-disable-next-line max-len
                d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_407">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span className="text-white">{t('components.dragAndDrop.title')}</span>
        </>
      )}
    </div>
  );
};
