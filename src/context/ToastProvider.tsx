import { v4 as uuid4 } from 'uuid';
import {type ReactNode, useState} from "react";
import type {Toast} from "../types/types.ts";
import {ToastContext} from "./ToastContext.tsx";
import {ToastItem} from "../components/ToastItem.tsx";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const duplicateToast = toasts.find((item) => {
            return item.message === toast.message && item.type === toast.type;
        });

        if (duplicateToast) return;

        const id: string = uuid4();
        const newToast: Toast = {...toast, id};

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="toast-list">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onRemove={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};