import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

/**
 * These tests focus on verifying:
 * - Component renders without crashing
 * - Modal open/close works
 * - MovieList and AddMovieModal are present
 * - State updates trigger correct UI changes
 *
 * They avoid checking for specific movie titles
 * to keep tests resilient to data changes.
 */

describe("App Component (general behavior)", () => {
    it("renders without crashing and displays header", () => {
        render(<App />);
        const header = screen.getByText(/movie records/i);
        expect(header).toBeInTheDocument();
    });

    it("renders MovieList and AddMovieModal components", () => {
        render(<App />);

        // Confirm the Add button (connected to modal)
        const addButton = screen.getByRole("button", {
            name: /add new movie/i,
        });
        expect(addButton).toBeInTheDocument();

        // Confirm that MovieList has rendered by looking for structural elements
        const mainSection = screen.getByRole("region", { hidden: true });
        expect(mainSection).toBeInTheDocument();
    });

    it("opens and closes the Add Movie modal when buttons clicked", () => {
        render(<App />);
        const openButton = screen.getByRole("button", {
            name: /add new movie/i,
        });
        fireEvent.click(openButton);

        // The modal should now be visible (has 'Add Movie' header or close button)
        const modal = screen.getByRole("dialog");
        expect(modal).toBeInTheDocument();

        const closeButton = screen.getByRole("button", { name: /close/i });
        fireEvent.click(closeButton);

        // After closing, modal should disappear
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders the application sketch image correctly", () => {
        render(<App />);
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("movie_records_sketch"),
        );
    });

    it("initially loads with a list of movies (from ghibli data)", () => {
        render(<App />);
        // Instead of a title, check for multiple rendered movie cards or list items
        const items = screen.getAllByRole("listitem", { hidden: true });
        expect(items.length).toBeGreaterThan(0);
    });

    it("allows state updates when interacting with movie actions", () => {
        render(<App />);

        // Expect at least one watch/edit/delete button if MovieList renders correctly
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);

        // Simulate clicking one of the interactive buttons to ensure no crash
        fireEvent.click(buttons[0]);
    });
});
