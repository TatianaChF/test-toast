import React, {useEffect, useRef, useState} from 'react';
import type {ToastItemProps} from "../types/types.ts";

export const ToastItem: React.FC<ToastItemProps> = ({toast, onRemove}) => {
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const remainingTimeRef = useRef<number>(toast.duration || 0);
    const onRemoveRef = useRef(onRemove);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleRemove = () => {
        setIsExiting(true);
        clearTimer();

        setTimeout(() => {
            onRemoveRef.current(toast.id);
        }, 300);
    };

    const startTimer = (time: number) => {
        clearTimer();

        if (time <= 0) {
            handleRemove();
            return;
        }

        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
            handleRemove();
        }, time);
    };

    const handlePause = () => {
        if (!toast.duration || isExiting) return;

        if (!isPaused) {
            if (startTimeRef.current) {
                const elapsed = Date.now() - startTimeRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
            }

            clearTimer();
        } else {
            startTimer(remainingTimeRef.current);
        }

        setIsPaused(!isPaused);
    };

    useEffect(() => {
        onRemoveRef.current = onRemove;
    }, [onRemove]);

    useEffect(() => {
        if (!toast.duration || isExiting) return;

        remainingTimeRef.current = toast.duration;
        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            handleRemove();
        }, toast.duration);

        return () => {
            clearTimer();
        };
    }, [toast.duration, isExiting]);

    return (
        <div
            className={`toast toast-${toast.type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}
            onMouseLeave={handlePause}
            onMouseEnter={handlePause}
        >
            <span>{toast.message}</span>
            <button onClick={handleRemove}>x</button>
        </div>
    );
};