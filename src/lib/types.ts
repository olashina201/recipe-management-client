export interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeFormData {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  image?: File;
}

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

export interface ToastInstance extends ToastProps {
  id: string;
}
