import React, {useEffect, useState} from 'react';
import type {Toast} from '../types/types';

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({toast, onRemove}) => {
    const [isExiting, setIsExiting] = useState<boolean>(false);

    const startTimer = () => {
        const interval = setInterval(() => {
            handleRemove();
        }, toast.duration);

        return () => clearInterval(interval);
    }

    const handleRemove = () => {
        setIsExiting(true);

        setTimeout(() => {
            onRemove(toast.id);
        }, 300);
    }

    useEffect(() => {
        if (toast.duration) {
            startTimer();
        }
    }, [toast.duration]);

    return (
        <div className={`toast toast-${toast.type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}>
            <span>{toast.message}</span>
            <button onClick={handleRemove}>x</button>
        </div>
    );
};