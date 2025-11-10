import { render, screen, fireEvent } from "@testing-library/react";
import { RecordControls } from "../src/components/RecordControls";
import { jest } from "@jest/globals";
import type { Watch } from "../src/interfaces/watch";

describe("RecordControls", () => {
    const mockChangeEditing = jest.fn();
    const mockSetMovieWatched = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders unwatched movie controls", () => {
        const watched: Watch = { seen: false, liked: false, when: null };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText("Mark as watched")).toBeInTheDocument();
        expect(screen.queryByText("Liked")).not.toBeInTheDocument();
        expect(screen.queryByText("Not liked")).not.toBeInTheDocument();
    });

    it("renders watched and liked movie controls", () => {
        const watched: Watch = { seen: true, liked: true, when: "2023-01-01" };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText("Mark as unwatched")).toBeInTheDocument();
        expect(screen.getByText("Liked")).toBeInTheDocument();
    });

    it("renders watched but not liked movie controls", () => {
        const watched: Watch = { seen: true, liked: false, when: "2023-01-01" };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText("Mark as unwatched")).toBeInTheDocument();
        expect(screen.getByText("Not liked")).toBeInTheDocument();
    });

    it("handles marking movie as watched", () => {
        const watched: Watch = { seen: false, liked: false, when: null };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText("Mark as watched"));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, false);
    });

    it("handles marking movie as unwatched", () => {
        const watched: Watch = { seen: true, liked: false, when: "2023-01-01" };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText("Mark as unwatched"));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(false, false);
    });

    it("handles liking a watched movie", () => {
        const watched: Watch = { seen: true, liked: false, when: "2023-01-01" };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText("Not liked"));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, true);
    });

    it("handles unliking a watched movie", () => {
        const watched: Watch = { seen: true, liked: true, when: "2023-01-01" };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText("Liked"));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, false);
    });

    it("handles edit button click", () => {
        const watched: Watch = { seen: false, liked: false, when: null };
        render(
            <RecordControls
                watched={watched}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText("Edit"));
        expect(mockChangeEditing).toHaveBeenCalled();
    });
});
