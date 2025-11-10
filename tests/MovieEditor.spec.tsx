import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
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
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });
    describe("Save Button", () => {
        test("calls editMovie and changeEditing on save", () => {
            const saveButton = screen.getByRole("button", { name: /save/i });
            saveButton.click();

            expect(mockEditMovie).toHaveBeenCalledWith(
                mockMovie.id,
                expect.objectContaining({
                    title: "The Test Movie",
                    rating: 8,
                    description: "A movie for testing",
                    released: 2020,
                }),
            );
            expect(mockChangeEditing).toHaveBeenCalled();
        });
    });
    describe("Cancel Button", () => {
        test("calls changeEditing on cancel", () => {
            const cancelButton = screen.getByRole("button", {
                name: /cancel/i,
            });
            cancelButton.click();

            expect(mockChangeEditing).toHaveBeenCalled();
        });
    });
    describe("setTitle", () => {
        test("updates title state on input change", () => {
            const titleInput = screen.getByDisplayValue("The Test Movie");
            titleInput.focus();
            (titleInput as HTMLInputElement).value = "Updated Test Movie";
            titleInput.blur();

            const saveButton = screen.getByRole("button", { name: /save/i });
            saveButton.click();

            expect(mockEditMovie).toHaveBeenCalledWith(
                mockMovie.id,
                expect.objectContaining({
                    title: "Updated Test Movie",
                }),
            );
        });
    });
    describe("setReleaseYear updates release year when called", () => {
        test("updates release year state on input change", () => {
            const releaseYearInput = screen.getByDisplayValue("2020");
            releaseYearInput.focus();
            (releaseYearInput as HTMLInputElement).value = "2021";
            releaseYearInput.blur();

            const saveButton = screen.getByRole("button", { name: /save/i });
            saveButton.click();

            expect(mockEditMovie).toHaveBeenCalledWith(
                mockMovie.id,
                expect.objectContaining({
                    released: 2021,
                }),
            );
        });
    });
    describe("setRating updates rating when called", () => {
        test("updates rating state on input change", () => {
            const ratingInput = screen.getByDisplayValue("8");
            ratingInput.focus();
            (ratingInput as HTMLInputElement).value = "10";
            ratingInput.blur();

            const saveButton = screen.getByRole("button", { name: /save/i });
            saveButton.click();

            expect(mockEditMovie).toHaveBeenCalledWith(
                mockMovie.id,
                expect.objectContaining({
                    rating: 10,
                }),
            );
        });
    });
});
