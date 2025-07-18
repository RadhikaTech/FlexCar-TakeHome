import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import '@testing-library/jest-dom';

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

describe("Header component", () => {
    it("renders the FlexCar title", () => {
        render(<Header />);
        expect(screen.getByText("FlexCar")).toBeInTheDocument();
    });

    it("renders the logo image with alt text", () => {
        render(<Header />);
        const image = screen.getByAltText("LOGO");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/flexcar_icon.png");
    });
});
