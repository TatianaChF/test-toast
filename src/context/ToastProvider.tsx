import { v4 as uuid4 } from 'uuid';
import {type ReactNode, useState} from "react";
import type {Toast} from "../types/types.ts";
import {ToastContext} from "./ToastContext.tsx";
import {ToastItem} from "../components/ToastItem.tsx";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [resetCounts, setResetCounts] = useState<Record<string, number>>({});

    const addToast = (toast: Omit<Toast, 'id'>) => {
        setToasts((prevToasts) => {
            const duplicateToast = prevToasts.find((item) => {
                return item.message === toast.message && item.type === toast.type;
            });

            if (duplicateToast) {
                setResetCounts(prev => ({
                    ...prev,
                    [duplicateToast.id]: (prev[duplicateToast.id] || 0) + 1
                }));
                return prevToasts;
            }

            const id: string = uuid4();
            const newToast: Toast = {...toast, id};

            return [...prevToasts, newToast];
        });
    };

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        setResetCounts(prev => {
            const newCounts = {...prev};
            delete newCounts[id];
            return newCounts;
        });
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="toast-list">
                {toasts.map((toast) => (
                    <ToastItem
                        key={`${toast.id}-${resetCounts[toast.id] || 0}`}
                        toast={toast}
                        onRemove={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};