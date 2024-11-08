import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
};

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: () => void;
}

export interface DragEndDropProps  {
  value?: string | null;
  className?: string;
  onDrop: (file: File) => void;
}

export interface  MovieFormProps {
  isLoading?: boolean;
  mode?: 'edit' | 'add';
  onCancel?: () => void;
  onDelete?: () => void;
}


export interface MovieFormValues {
  title?: string;
  year: number;
  description?: string;
  poster: string;
}

export interface PaginationProps {
  totalPages: number;
  page: number;
  onChange: (page: number) => void;
}

export interface  CardProps {
  title: string;
  year: number;
  path: string;
}
