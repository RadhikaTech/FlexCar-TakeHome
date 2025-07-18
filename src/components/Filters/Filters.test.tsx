import { render, screen, fireEvent, within } from '@testing-library/react';
import Filter from "./Filters";

describe("Filter component", () => {
    const mockOnFilterChange = jest.fn();

    const props = {
        makes: ["Toyota", "Honda"],
        colors: ["Red", "Blue"],
        onFilterChange: mockOnFilterChange,
    };

    beforeEach(() => {
        render(<Filter {...props} />);
        mockOnFilterChange.mockClear();
    });

    it("renders both dropdowns with all options", () => {
        const makeSelect = screen.getByLabelText("Make");
        const colorSelect = screen.getByLabelText("Color");

        expect(makeSelect).toBeInTheDocument();
        expect(colorSelect).toBeInTheDocument();

        expect(within(makeSelect).getByRole("option", { name: "All" })).toBeInTheDocument();
        expect(within(makeSelect).getByRole("option", { name: "Toyota" })).toBeInTheDocument();
        expect(within(makeSelect).getByRole("option", { name: "Honda" })).toBeInTheDocument();

        expect(within(colorSelect).getByRole("option", { name: "All" })).toBeInTheDocument();
        expect(within(colorSelect).getByRole("option", { name: "Red" })).toBeInTheDocument();
        expect(within(colorSelect).getByRole("option", { name: "Blue" })).toBeInTheDocument();
    });


    it("calls onFilterChange when make is selected", () => {
        fireEvent.change(screen.getByLabelText("Make"), { target: { value: "Toyota", name: "make" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith(expect.any(Function));
    });

    it("calls onFilterChange when color is selected", () => {
        fireEvent.change(screen.getByLabelText("Color"), { target: { value: "Blue", name: "color" } });

        expect(mockOnFilterChange).toHaveBeenCalledWith(expect.any(Function));
    });
});
