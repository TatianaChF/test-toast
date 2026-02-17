import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App";

describe('toast System', () => {
    describe('toast creation', () => {
        it('should show success toast when success button is clicked', async () => {
            render(<App />);

            const buttonSuccess = screen.getByText('Success Toast');
            await userEvent.click(buttonSuccess);

            expect(screen.getByText('Успех!')).toBeInTheDocument();
            expect(screen.getByText('Успех!').parentElement).toHaveClass('toast-success');
        });

        it('should show error toast when error button is clicked', async () => {
            render(<App />);

            const buttonError = screen.getByText('Error (5s)');
            await userEvent.click(buttonError);

            expect(screen.getByText('Ошибка!')).toBeInTheDocument();
            expect(screen.getByText('Ошибка!').parentElement).toHaveClass('toast-error');
        });

        it('should show warning toast when warning button is clicked', async () => {
            render(<App />);

            const buttonWarning = screen.getByText('Warning');
            await userEvent.click(buttonWarning);

            expect(screen.getByText('Предупрежение')).toBeInTheDocument();
            expect(screen.getByText('Предупрежение').parentElement).toHaveClass('toast-warning');
        });
    })
});