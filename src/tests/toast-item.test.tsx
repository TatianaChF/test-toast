import { describe, it, expect } from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import type {Toast} from "../types/types.ts";
import {ToastItem} from "../components/ToastItem.tsx";
import {act} from "react";

describe('toast system', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    describe('ToastItem component (unit tests)', () => {
        const mockToast: Toast = {
            id: "1",
            message: "Тестовый тост",
            type: "success",
            duration: 3000,
            resetCount: 0,
        };

        const onRemove = vi.fn();

        beforeEach(() => {
            onRemove.mockClear();
        });

        it("renders correctly", () => {
            render(<ToastItem toast={mockToast} onRemove={onRemove} />);

            expect(screen.getByText("Тестовый тост")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "x" })).toBeInTheDocument();
        });

        it('calls onRemove after duration + animation time', () => {
            render(<ToastItem toast={mockToast} onRemove={onRemove} />);

            act(() => {
                vi.advanceTimersByTime(3300);
            })

            expect(onRemove).toHaveBeenCalledTimes(1);
            expect(onRemove).toHaveBeenCalledWith("1");
        });

        it('pauses timer on mouse enter and resumes on mouse leave', () => {
            render(<ToastItem toast={mockToast} onRemove={onRemove} />);

            const messageElement = screen.getByText("Тестовый тост");
            const toastElement = messageElement.closest(".toast") || messageElement;

            act(() => {
                vi.advanceTimersByTime(1500);
            });

            fireEvent.mouseEnter(toastElement);

            act(() => {
                vi.advanceTimersByTime(2000);
            });

            expect(onRemove).not.toHaveBeenCalled();

            fireEvent.mouseLeave(toastElement);

            act(() => {
                vi.advanceTimersByTime(1800);
            });

            expect(onRemove).toHaveBeenCalledTimes(1);
        });

        it('resets timer when resetCount changes', () => {
            const { rerender } = render(
                <ToastItem toast={mockToast} onRemove={onRemove} />
            );

            act(() => {
                vi.advanceTimersByTime(2000);
            });

            rerender(
                <ToastItem
                    toast={{ ...mockToast, resetCount: 1 }}
                    onRemove={onRemove}
                />
            );

            act(() => {
                vi.advanceTimersByTime(2000);
            });

            expect(onRemove).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1300);
            });

            expect(onRemove).toHaveBeenCalledTimes(1);
        })
    });
});