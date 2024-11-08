import { useAuth } from '@/src/hooks';
import { LoginFormValues } from '@/src/types/pages';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Checkbox } from '@/src/components';

export default function Auth(): ReactNode {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();

  const schema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
    rememberMe: z.boolean().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    const value = await auth.login(data);

    value && router.push('/movies');
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-background space-y-10">
      <h1 className="font-semibold text-heading-one text-white">{t('auth.title.login')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-80 flex flex-col">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('auth.form.placeholder.email')}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder={t('auth.form.placeholder.password')}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rememberMe"
          render={({ field }) => (
            <Checkbox
              {...field}
              label={t('auth.form.label.remember_me')}
              className="self-center"
              checked={field.value}
            />
          )}
        />

        <Button text={t('auth.form.button.login')} variant="primary" className="w-full" type="submit"/>
      </form>
    </div>
  );
}
