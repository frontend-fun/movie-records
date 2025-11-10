import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
    it("renders MovieList with correct props", () => {
        render(<App />);
        // Check for header
        expect(screen.getByText("Movie Records")).toBeInTheDocument();

        // Check for a movie title from ghibli data (assuming one exists)
        // You can replace "My Neighbor Totoro" with a known title from your JSON
        expect(screen.getByText(/totoro/i)).toBeInTheDocument();
    });

    it("renders ApplicationSketch image", () => {
        render(<App />);
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("movie_records_sketch"),
        );
        expect(image).toHaveStyle({
            width: "400px",
            height: "auto",
            margin: "20px 30px",
        });
    });
});
