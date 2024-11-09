import { useAuth } from '@/src/hooks';
import { LoginFormValues } from '@/src/types/pages';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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

  const onSubmit = (data: LoginFormValues) => {
    auth.login(data)
      .catch(() => {
        toast(t('notifications.login.error'), { type: 'error' });
      })
      .then((value) => {
        if (value) {
          toast(t('notifications.login.success'), { type: 'success' });
          value && router.push('/movies');
        }
      });
  };

  return (
    <div className="grid grid-cols-12 md:gap-6 gap-2 self-center">
      <div className="max-h-fit md:col-start-5 md:col-span-4 col-span-12 flex flex-col gap-14 items-center">
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
          <Button text={t('auth.form.button.register')} variant="outline" type="button" className="w-full" onClick={() => router.push('/register')}/>
        </form>
      </div>
    </div>
  );
}
