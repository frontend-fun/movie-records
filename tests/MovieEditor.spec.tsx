import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MovieEditor } from "../src/components/MovieEditor";
import type { Movie } from "../src/interfaces/movie";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "movie-001",
        title: "Original Title",
        rating: 6,
        description: "Original description",
        released: 2001,
        soundtrack: [{ id: "song1", name: "My Song", by: "Composer" }],
        watched: { seen: false, liked: false, when: null },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );
    });

    test("renders all form fields with initial values", () => {
        expect(screen.getByDisplayValue("Original Title")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2001")).toBeInTheDocument();
        expect(screen.getByDisplayValue("6")).toBeInTheDocument();
        expect(
            screen.getByDisplayValue("Original description"),
        ).toBeInTheDocument();
    });

    test("allows editing of title, release year, and description", () => {
        const titleInput = screen.getByDisplayValue("Original Title");
        const yearInput = screen.getByDisplayValue("2001");
        const descriptionBox = screen.getByDisplayValue("Original description");

        fireEvent.change(titleInput, { target: { value: "Updated Title" } });
        fireEvent.change(yearInput, { target: { value: "2022" } });
        fireEvent.change(descriptionBox, {
            target: { value: "New description" },
        });

        expect(titleInput).toHaveValue("Updated Title");
        expect(yearInput).toHaveValue(2022);
        expect(descriptionBox).toHaveValue("New description");
    });

    test("calls editMovie and changeEditing on Save", () => {
        const titleInput = screen.getByDisplayValue("Original Title");
        fireEvent.change(titleInput, { target: { value: "Changed Title" } });

        const saveButton = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveButton);

        // editMovie should be called with updated movie
        expect(mockEditMovie).toHaveBeenCalledTimes(1);
        const [[id, updatedMovie]] = mockEditMovie.mock.calls as [
            [string, Movie],
        ];
        expect(id).toBe("movie-001");
        expect(updatedMovie.title).toBe("Changed Title");

        // changeEditing should also be called once
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("calls changeEditing when Cancel button is clicked", () => {
        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("calls deleteMovie when Delete button is clicked", () => {
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);
        expect(mockDeleteMovie).toHaveBeenCalledWith("movie-001");
    });

    test("updates rating dropdown selection", () => {
        const ratingSelect = screen.getByDisplayValue("6");
        fireEvent.change(ratingSelect, { target: { value: "10" } });
        expect(ratingSelect).toHaveValue("10");
    });

    test("renders the SoundtrackEditor section", () => {
        // The SoundtrackEditor should render existing song info
        expect(screen.getByText(/my song/i)).toBeInTheDocument();
    });
});
