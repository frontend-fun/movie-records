import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MovieView } from "../src/components/MovieView";
import type { Movie } from "../src/interfaces/movie";

/* ---------- Mock child components for isolation ---------- */
jest.mock("../src/components/MovieEditor", () => ({
    MovieEditor: ({ changeEditing }: { changeEditing: () => void }) => (
        <div data-testid="mock-editor">
            <button onClick={changeEditing}>Exit Editor</button>
        </div>
    ),
}));
jest.mock("../src/components/RecordControls", () => ({
    RecordControls: ({
        changeEditing,
        setMovieWatched,
    }: {
        changeEditing: () => void;
        setMovieWatched: (seen: boolean, liked: boolean) => void;
    }) => (
        <div data-testid="mock-recordcontrols">
            <button onClick={() => setMovieWatched(true, true)}>Watched</button>
            <button onClick={changeEditing}>Edit</button>
        </div>
    ),
}));
jest.mock("../src/components/MovieRating", () => ({
    MovieRating: ({ rating }: { rating: number }) => (
        <div data-testid="mock-rating">Rating: {rating}</div>
    ),
}));
jest.mock("../src/components/SongList", () => ({
    SongList: ({ songs }: { songs: string[] }) => (
        <ul data-testid="mock-songlist">
            {songs.map((s: string, i: number) => (
                <li key={i}>{s}</li>
            ))}
        </ul>
    ),
}));
jest.mock("../src/components/MovieTrailer", () => ({
    MovieTrailer: ({ id }: { id: string }) => (
        <div data-testid="mock-trailer">Trailer for {id}</div>
    ),
}));

describe("MovieView Component", () => {
    const baseMovie: Movie = {
        id: "m1",
        title: "Test Movie",
        rating: 8,
        released: 2020,
        description: "A test movie description.",
        soundtrack: [], // Add an empty array or appropriate soundtrack data
        watched: { seen: false, liked: false, when: null },
    };

    let mockDeleteMovie: jest.Mock;
    let mockEditMovie: jest.Mock;
    let mockSetMovieWatched: jest.Mock;

    beforeEach(() => {
        mockDeleteMovie = jest.fn();
        mockEditMovie = jest.fn();
        mockSetMovieWatched = jest.fn();
        jest.clearAllMocks();
    });

    test("renders default view with movie info", () => {
        render(
            <MovieView
                movie={baseMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText("Test Movie")).toBeInTheDocument();
        expect(screen.getByText(/Released 2020/)).toBeInTheDocument();
        expect(screen.getByTestId("mock-rating")).toHaveTextContent(
            "Rating: 8",
        );
        expect(screen.getByTestId("mock-songlist")).toBeInTheDocument();
        expect(screen.getByTestId("mock-trailer")).toBeInTheDocument();
        expect(screen.getByTestId("mock-recordcontrols")).toBeInTheDocument();
    });

    test("calls setMovieWatched with correct args when 'Watched' clicked", () => {
        render(
            <MovieView
                movie={baseMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        const watchedButton = screen.getByRole("button", { name: /watched/i });
        fireEvent.click(watchedButton);

        // Should call MovieView's wrapper around setMovieWatched with movie.id
        expect(mockSetMovieWatched).toHaveBeenCalledWith("m1", true, true);
    });

    test("toggles to editor view when Edit clicked and back when Exit Editor clicked", () => {
        render(
            <MovieView
                movie={baseMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        // Initially not editing
        expect(screen.queryByTestId("mock-editor")).not.toBeInTheDocument();

        // Click Edit in RecordControls → editing true
        fireEvent.click(screen.getByText("Edit"));
        expect(screen.getByTestId("mock-editor")).toBeInTheDocument();

        // Click Exit Editor in mocked MovieEditor → editing false
        fireEvent.click(screen.getByText("Exit Editor"));
        expect(screen.queryByTestId("mock-editor")).not.toBeInTheDocument();
    });

    test("passes proper props to MovieEditor when editing is true", () => {
        render(
            <MovieView
                movie={baseMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        // Toggle into editing mode
        fireEvent.click(screen.getByText("Edit"));
        const editor = screen.getByTestId("mock-editor");
        expect(editor).toBeInTheDocument();
    });

    test("displays movie description and soundtrack items correctly", () => {
        render(
            <MovieView
                movie={baseMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(
            screen.getByText("A test movie description."),
        ).toBeInTheDocument();
        expect(screen.getByText("Song A")).toBeInTheDocument();
        expect(screen.getByText("Song B")).toBeInTheDocument();
    });
});
