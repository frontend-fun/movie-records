// tests/MovieEditor.simple.spec.tsx
import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Minimal, robust tests:
 * 1) Render form with initial values (title + description)
 * 2) Update title using userEvent
 * 3) Change rating using select (combobox)
 */

const sampleMovie: Movie = {
    id: "test-movie-123",
    title: "The Test Movie",
    rating: 8,
    description: "A movie for testing",
    released: 2020,
    soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
    watched: { seen: true, liked: true, when: "2023-01-01" },
};

const renderEditor = (overrides?: Partial<Movie>) => {
    const movie = { ...sampleMovie, ...(overrides || {}) } as Movie;
    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    render(
        <MovieEditor
            changeEditing={mockChangeEditing}
            movie={movie}
            editMovie={mockEditMovie}
            deleteMovie={mockDeleteMovie}
        />,
    );

    return { movie, mockChangeEditing, mockEditMovie, mockDeleteMovie };
};

describe("MovieEditor — simple smoke tests", () => {
    test("renders form with initial values (title + description)", () => {
        renderEditor();
        // Title: prefer accessible query by role+name, fallback to display value
        const titleByRole = screen.queryByRole("textbox", { name: /title/i });
        const title =
            titleByRole ?? screen.getByDisplayValue(sampleMovie.title);
        expect(title).toBeInTheDocument();

        // Description: try label first, fallback to display value
        const descByLabel = screen.queryByLabelText(/description/i);
        const desc =
            descByLabel ?? screen.getByDisplayValue(sampleMovie.description);
        expect(desc).toBeInTheDocument();
    });

    test("update title with userEvent.type() updates input value", () => {
        const { mockEditMovie } = renderEditor();
        const user = userEvent;

        const titleInput =
            screen.queryByRole("textbox", { name: /title/i }) ??
            screen.getByDisplayValue(sampleMovie.title);
        user.clear(titleInput);
        user.type(titleInput, "New Movie Title");

        // assert input has new value
        expect((titleInput as HTMLInputElement).value).toBe("New Movie Title");

        // if there is a save button, click it and assert callback called
        const saveBtn = screen.queryByRole("button", { name: /save/i });
        if (saveBtn) {
            user.click(saveBtn);
            expect(mockEditMovie).toHaveBeenCalledTimes(1);
            // basic check: editMovie was called with an object containing updated title
            expect(mockEditMovie).toHaveBeenCalledWith(
                expect.objectContaining({ title: "New Movie Title" }),
            );
        }
    });

    test("change rating using select (combobox) updates value", () => {
        const { mockEditMovie } = renderEditor();
        const user = userEvent;

        const combo = screen.getByRole("combobox");
        // verify initial rating present (string or number)
        expect(String((combo as HTMLSelectElement).value)).toBe(
            String(sampleMovie.rating),
        );

        // select a different rating
        user.selectOptions(combo, "10");

        // assert changed in the select element
        expect(String((combo as HTMLSelectElement).value)).toBe("10");

        // if save exists, click and assert editMovie receives rating=10
        const saveBtn = screen.queryByRole("button", { name: /save/i });
        if (saveBtn) {
            user.click(saveBtn);
            expect(mockEditMovie).toHaveBeenCalledTimes(1);
            expect(mockEditMovie).toHaveBeenCalledWith(
                expect.objectContaining({ rating: 10 }),
            );
        }
    });
});
