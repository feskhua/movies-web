import {useAuth} from "@/src/hooks";
import {RegisterFormValues} from "@/src/types/pages";
import {useRouter} from "next/navigation";
import type {ReactNode} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input, Button, Checkbox} from "@/src/components";

export default function Register(): ReactNode {
  const auth = useAuth();
  const router = useRouter();
  const {t} = useTranslation();
  
  const schema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    rememberMe: z.boolean().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    const success = await auth.registration(data);
    
    success && router.push("/movies");
  };
  
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-background space-y-10">
      <h1 className="font-semibold text-heading-one text-white">{t('auth.title.register')}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-80 flex flex-col">
        <Controller
          control={control}
          name="email"
          render={({field}) => (
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
          render={({field}) => (
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
          name="confirmPassword"
          render={({field}) => (
            <Input
              {...field}
              type="password"
              placeholder={t('auth.form.placeholder.confirm_password')}
              error={errors.confirmPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="rememberMe"
          render={({field}) => (
            <Checkbox
              {...field}
              label={t('auth.form.label.remember_me')}
              className="self-center"
              checked={field.value}
            />
          )}
        />
        
        <Button text={t('auth.form.button.signup')} variant="primary" className="w-full" type="submit"/>
      </form>
    </div>
  );
}
