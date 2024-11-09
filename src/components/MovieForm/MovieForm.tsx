import { Button, DragEndDrop, Input } from '@/src/components';
import { useFiles } from '@/src/hooks';
import { MovieFormProps, MovieFormValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const MovieForm = (props: MovieFormProps): ReactElement => {
  const {
    mode,
    data,
    error,
    onSubmit,
    onDelete,
    onCancel,
  } = props;

  const [base64image, setBase64image] = useState<string | null>();
  const [file, setFile] = useState<File | null>(null);
  const { get } = useFiles();
  const { t } = useTranslation();

  const movieSchema = z.object({
    title: z
      .string()
      .min(1, 'Name is required'),
    year: z
      .number()
      .min(1900, 'Year must be at least 1900')
      .max(new Date().getFullYear(), 'Year can\'t be in the future'),
    base64preview: z
      .string()
      .optional(),
  });

  const handleDrop = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setBase64image(e.target?.result as string);
    };

    reader.readAsDataURL(file);
    setFile(file);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: data?.title ?? '',
      year: data?.year,
      base64preview: ''
    }
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const submit = async (data: any) => {
    onSubmit({
      ...data,
      file,
    });
  };

  const preview = useMemo(() => {
    if (data?.poster) {
      return get(data.poster);
    }

    return base64image ? base64image : '';
  }, [base64image, data, get]);

  return (
    <div className="grid grid-cols-12 md:gap-6 gap-2">
      <div className="hidden md:block md:col-span-6 col-span-12">
        <DragEndDrop onDrop={handleDrop} value={preview}/>
      </div>
      <form onSubmit={handleSubmit(submit)} className="md:col-start-7 md:col-span-4 col-span-12">
        <div className="flex flex-col h-full gap-6 w-full">
          <div className="flex flex-col gap-6">
            <Controller
              control={control}
              name="title"
              defaultValue={control._defaultValues.title ?? ''}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('movies.form.placeholder.title')}
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              defaultValue={control._defaultValues.year}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('movies.form.placeholder.year') ?? 1900}

                  error={errors.year?.message}
                  className="md:w-3/5 sm:w-full"
                  onChange={(e) => {
                    const { value } = e.target;

                    if (value.length > 4) {
                      return;
                    }

                    field.onChange(isNaN(Number(e.target.value)) ? 1900 : Number(e.target.value));
                  }}
                />
              )}
            />
          </div>
          <div className="md:hidden block">
            <DragEndDrop onDrop={handleDrop} value={preview}/>
          </div>
          <div className={clsx('grid gap-4 mt-6', {
            'md:grid-cols-3': mode === 'edit',
            'md:grid-cols-2': mode === 'add',
          })}>
            <Button
              variant="outline"
              text={t('movies.form.button.cancel')}
              type="button"
              onClick={() => onCancel && onCancel()}
            />
            {mode === 'edit' && (
              <Button
                variant="danger"
                text={t('movies.form.button.delete')}
                onClick={() => onDelete && onDelete()}
              />
            )}
            <Button
              text={t('movies.form.button.submit')}
              variant="primary"
              type="submit"
            />
          </div>
          {error && <p className="my-3 text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
};
