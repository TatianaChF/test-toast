import React, { useState, type ReactNode } from 'react';
import type { Toast } from '../types/types';
import { v4 as uuid4 } from 'uuid';


export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id: string = uuid4();
    const newToast: Toast = {...toast, id};

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id: string) => {
    
  };

  return (
   <>

   </>
  );
};

export const useToast = () => {
  
};