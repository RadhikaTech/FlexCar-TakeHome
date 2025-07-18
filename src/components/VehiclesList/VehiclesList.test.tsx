import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VehicleList from "./VehiclesList";

// Mock vehicles data
jest.mock("@/data/vehicles", () => ({
    vehicles: [
        {
            id: 1,
            make: "Toyota",
            model: "Camry",
            trim: "XSE",
            year: 2023,
            color: "Red",
            mileage: 15000,
            price: 25,
            zip: 12345,
            image: "",
        },
        {
            id: 2,
            make: "Honda",
            model: "Civic",
            trim: "Sport",
            year: 2022,
            color: "Blue",
            mileage: 10000,
            price: 20,
            zip: 12345,
            image: "",
        },
    ],
}));

describe("VehicleList", () => {
    it("renders ZIP modal on initial load", () => {
        render(<VehicleList />);
        expect(screen.getByText(/Enter ZIP code/i)).toBeInTheDocument();
    });

    it("shows error for invalid ZIP", () => {
        render(<VehicleList />);
        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "12" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(screen.getByText(/Please enter a valid 5-digit ZIP code/i)).toBeInTheDocument();
    });

    it("shows error when no vehicles found for ZIP", () => {
        render(<VehicleList />);
        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "99999" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(screen.getByText(/No vehicles found for ZIP code/i)).toBeInTheDocument();
    });

    it("shows vehicle cards for valid ZIP", async () => {
        render(<VehicleList />);
        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "12345" } });
        fireEvent.keyDown(input, { key: "Enter" });

        await waitFor(() => {
            expect(
                screen.getByText((_, element) => element?.textContent === "Vehicles near 12345")
            ).toBeInTheDocument();
        });

        expect(screen.getAllByTestId("vehicle-card").length).toBeGreaterThan(0);
    });

    it("filters vehicles by make and color", async () => {
        render(<VehicleList />);
        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "12345" } });
        fireEvent.keyDown(input, { key: "Enter" });

        await waitFor(() => screen.getByText(/Toyota Camry/i));

        fireEvent.change(screen.getByLabelText(/Make/i), {
            target: { value: "Toyota" },
        });
        fireEvent.change(screen.getByLabelText(/Color/i), {
            target: { value: "Red" },
        });

        expect(screen.queryByText(/Honda Civic/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
    });

    it("sorts vehicles by price", async () => {
        render(<VehicleList />);
        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "12345" } });
        fireEvent.keyDown(input, { key: "Enter" });

        await waitFor(() => screen.getByText(/Toyota Camry/i));

        fireEvent.change(screen.getByLabelText(/Sort By/i), {
            target: { value: "priceLow" },
        });

        const cards = screen.getAllByText(/₹/i);
        expect(cards[0].textContent).toContain("₹20");
        expect(cards[1].textContent).toContain("₹25");
    });

    it("resets and reopens ZIP modal", async () => {
        render(<VehicleList />);

        const input = screen.getByPlaceholderText(/ZIP code/i);
        fireEvent.change(input, { target: { value: "12345" } });
        fireEvent.keyDown(input, { key: "Enter" });

        await waitFor(() =>
            expect(
                screen.getByText((_, el) => el?.textContent === "Vehicles near 12345")
            ).toBeInTheDocument()
        );

        fireEvent.click(screen.getByText(/Change ZIP Code/i));

        expect(screen.getByText(/Enter ZIP Code/i)).toBeInTheDocument();
    });

    it("sorts vehicles by price high to low", async () => {
        render(<VehicleList />);
        fireEvent.change(screen.getByPlaceholderText(/ZIP code/i), {
            target: { value: "12345" },
        });
        fireEvent.keyDown(screen.getByPlaceholderText(/ZIP code/i), {
            key: "Enter",
        });

        await waitFor(() => screen.getByText(/Change ZIP Code/i));

        fireEvent.change(screen.getByLabelText(/Sort By/i), {
            target: { value: "priceHigh" },
        });

        const prices = screen.getAllByTestId("vehicle-price").map((el) =>
            parseInt(el.textContent?.replace(/[^0-9]/g, "") || "0", 10)
        );

        expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
});
