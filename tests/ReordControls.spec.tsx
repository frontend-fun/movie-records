import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecordControls } from "../src/components/RecordControls";
import type { Watch } from "../src/interfaces/watch";

describe("RecordControls Component", () => {
    let mockChangeEditing: jest.Mock;
    let mockSetMovieWatched: jest.Mock;

    beforeEach(() => {
        mockChangeEditing = jest.fn();
        mockSetMovieWatched = jest.fn();
        jest.clearAllMocks();
    });

    test("renders 'Mark as watched' when movie is unseen", () => {
        const watch: Watch = { seen: false, liked: false, when: null };

        render(
            <RecordControls
                watched={watch}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        // Should show "Mark as watched" and "Edit"
        const watchButton = screen.getByRole("button", {
            name: /mark as watched/i,
        });
        const editButton = screen.getByRole("button", { name: /edit/i });

        expect(watchButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();

        // Clicking "Mark as watched" should call setMovieWatched(true, liked)
        fireEvent.click(watchButton);
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, false);

        // Clicking "Edit" should call changeEditing
        fireEvent.click(editButton);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("renders 'Mark as unwatched' and 'Not liked' when seen but not liked", () => {
        const watch: Watch = { seen: true, liked: false, when: "2024-01-01" };

        render(
            <RecordControls
                watched={watch}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        const unwatchButton = screen.getByRole("button", {
            name: /mark as unwatched/i,
        });
        const notLikedButton = screen.getByRole("button", {
            name: /not liked/i,
        });
        const editButton = screen.getByRole("button", { name: /edit/i });

        expect(unwatchButton).toBeInTheDocument();
        expect(notLikedButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();

        // Simulate clicking each
        fireEvent.click(unwatchButton);
        expect(mockSetMovieWatched).toHaveBeenCalledWith(false, false);

        fireEvent.click(notLikedButton);
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, true);

        fireEvent.click(editButton);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("renders 'Mark as unwatched' and 'Liked' when seen and liked", () => {
        const watch: Watch = { seen: true, liked: true, when: "2024-05-12" };

        render(
            <RecordControls
                watched={watch}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        const unwatchButton = screen.getByRole("button", {
            name: /mark as unwatched/i,
        });
        const likedButton = screen.getByRole("button", { name: /liked/i });
        const editButton = screen.getByRole("button", { name: /edit/i });

        expect(unwatchButton).toBeInTheDocument();
        expect(likedButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();

        // Simulate interactions
        fireEvent.click(unwatchButton);
        expect(mockSetMovieWatched).toHaveBeenCalledWith(false, true);

        fireEvent.click(likedButton);
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, false);

        fireEvent.click(editButton);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("renders proper number of buttons depending on state", () => {
        // Case 1: Unseen — 2 buttons
        const unseen: Watch = { seen: false, liked: false, when: null };
        const { rerender } = render(
            <RecordControls
                watched={unseen}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );
        expect(screen.getAllByRole("button")).toHaveLength(2);

        // Case 2: Seen but not liked — 3 buttons
        rerender(
            <RecordControls
                watched={{ seen: true, liked: false, when: "x" }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );
        expect(screen.getAllByRole("button")).toHaveLength(3);

        // Case 3: Seen and liked — 3 buttons
        rerender(
            <RecordControls
                watched={{ seen: true, liked: true, when: "x" }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );
        expect(screen.getAllByRole("button")).toHaveLength(3);
    });
});
