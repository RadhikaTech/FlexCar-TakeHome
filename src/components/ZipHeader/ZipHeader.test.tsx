import { render, screen, fireEvent } from "@testing-library/react";
import ZipHeader from "./ZipHeader";

describe("ZipHeader", () => {
    it("displays the correct ZIP code", () => {
        render(<ZipHeader zip="12345" onChangeZip={jest.fn()} />);
        expect(screen.getByText(/12345/)).toBeInTheDocument();
    });

    it("calls onChangeZip when 'Change ZIP Code' is clicked", () => {
        const mockChangeZip = jest.fn();
        render(<ZipHeader zip="12345" onChangeZip={mockChangeZip} />);
        fireEvent.click(screen.getByText(/Change ZIP Code/i));
        expect(mockChangeZip).toHaveBeenCalledTimes(1);
    });
});
