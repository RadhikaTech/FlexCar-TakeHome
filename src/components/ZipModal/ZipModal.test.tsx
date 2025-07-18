import { render, screen, fireEvent } from "@testing-library/react";
import ZipModal from "./ZipModal";

describe("ZipModal", () => {
    const props = {
        zip: "12345",
        modalMessage: "",
        onChange: jest.fn(),
        onKeyDown: jest.fn(),
        onSubmit: jest.fn(),
    };

    it("renders the modal title and input", () => {
        render(<ZipModal {...props} />);
        expect(screen.getByText(/Enter ZIP Code/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter ZIP code/i)).toHaveValue("12345");
    });

    it("renders modal error message if provided", () => {
        render(<ZipModal {...props} modalMessage="Invalid ZIP" />);
        expect(screen.getByText(/Invalid ZIP/i)).toBeInTheDocument();
    });

    it("calls onChange when typing in input", () => {
        render(<ZipModal {...props} />);
        const input = screen.getByPlaceholderText(/Enter ZIP code/i);
        fireEvent.change(input, { target: { value: "54321" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("calls onKeyDown when pressing a key in input", () => {
        render(<ZipModal {...props} />);
        const input = screen.getByPlaceholderText(/Enter ZIP code/i);
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        expect(props.onKeyDown).toHaveBeenCalled();
    });

    it("calls onSubmit when 'Search Vehicles' button is clicked", () => {
        render(<ZipModal {...props} />);
        fireEvent.click(screen.getByText(/Search Vehicles/i));
        expect(props.onSubmit).toHaveBeenCalled();
    });
});
