import {useToast} from "../context/ToastContext.tsx";
import {fireEvent, render, screen} from "@testing-library/react";
import {ToastProvider} from "../context/ToastProvider.tsx";

describe('toast provider tests', () => {
    const TestComponent = () => {
        const { addToast } = useToast();
        return (
            <div>
                <button
                    className="btn-success"
                    onClick={() => addToast({ message: "Успех!", type: "success" })}
                >
                    Success Toast
                </button>
                <button
                    className="btn-error"
                    onClick={() =>
                        addToast({ message: "Ошибка!", type: "error", duration: 5000 })
                    }
                >
                    Error 5s
                </button>
            </div>
        );
    };

    const TestApp = () => {
        return (
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        )
    }

    it('add toast when addToast is called', () => {
        render(<TestApp />)

        fireEvent.click(screen.getByText("Success Toast"));
        fireEvent.click(screen.getByText("Error 5s"));

        expect(screen.getAllByText("Успех!")).toHaveLength(1);
        expect(screen.getAllByText("Ошибка!")).toHaveLength(1);
    });

    it('does not create duplicate toast with same message and type', () => {
        render(<TestApp />)

        fireEvent.click(screen.getByText("Success Toast"));
        fireEvent.click(screen.getByText("Error 5s"));
        fireEvent.click(screen.getByText("Success Toast"));
        fireEvent.click(screen.getByText("Error 5s"));

        expect(screen.getAllByText("Успех!")).toHaveLength(1);
        expect(screen.getAllByText("Ошибка!")).toHaveLength(1);
    })
})