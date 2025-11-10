import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders header", () => {
        render(<App />);
        expect(screen.getByText(/Movie Records/i)).toBeInTheDocument();
    });
});
