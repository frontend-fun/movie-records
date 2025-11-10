import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    test("updates release year input when typing", () => {
        const mockMovie: Movie = {
            id: "m1",
            title: "Some Movie",
            rating: 8,
            description: "",
            released: 2020,
            soundtrack: [],
            watched: { seen: false, liked: false, when: null },
        };

        render(
            <MovieEditor
                movie={mockMovie}
                changeEditing={jest.fn()}
                editMovie={jest.fn()}
                deleteMovie={jest.fn()}
            />,
        );

        const releaseYearInput = screen.getByRole<HTMLInputElement>(
            "spinbutton",
            {
                name: /Release Year:/i,
            },
        );
        expect(releaseYearInput.value).toBe("2020");

        userEvent.clear(releaseYearInput);
        userEvent.type(releaseYearInput, "2024");

        expect(releaseYearInput.value).toBe("2024");
    });
});
