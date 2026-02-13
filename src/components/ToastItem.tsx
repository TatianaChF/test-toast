import React, {useEffect} from 'react';
import type {Toast} from '../types/types';

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({toast, onRemove}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            onRemove(toast.id);
        }, toast.duration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={() => onRemove(toast.id)}>x</button>
        </div>
    );
};