import { ManageMoviePayload, Movie } from '@/src/types/fetch';
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactElement } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: () => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

export interface DragEndDropProps {
  value?: string | null;
  className?: string;
  onDrop: (file: File) => void;
}

export interface MovieFormProps {
  onCancel?: () => void;
  onSubmit: (data: ManageMoviePayload) => void;
  data?: Movie;
  error?: string;
}

export interface MovieFormValues {
  title?: string;
  year: number;
  base64preview?: string;
  description?: string;
  poster: string;
}

export interface PaginationProps {
  totalPages: number;
  page: number;
  onChange: (page: number) => void;
}

export interface CardProps {
  title: string;
  year: number;
  path: string;
}

export interface PageWrapperProps {
  title: string;
  headerChildren?: ReactElement;
}

export interface IconButtonProps {
  icon: ReactElement;
  className?: string;
  onClick: () => void;
  title?: string;
}
