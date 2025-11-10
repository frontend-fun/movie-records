import { render, screen, fireEvent } from "@testing-library/react";
import { RecordControls } from "../src/components/RecordControls";

describe("RecordControls component", () => {
    const mockChangeEditing = jest.fn();
    const mockSetMovieWatched = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly when unseen", () => {
        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText(/Mark as watched/i)).toBeInTheDocument();
        expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    });

    it("renders correctly when seen and liked", () => {
        render(
            <RecordControls
                watched={{ seen: true, liked: true, when: null }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText(/Mark as unwatched/i)).toBeInTheDocument();
        expect(screen.getByText(/Liked/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Liked/i));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, false);
    });

    it("renders correctly when seen and not liked", () => {
        render(
            <RecordControls
                watched={{ seen: true, liked: false, when: null }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText(/Not liked/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Not liked/i));
        expect(mockSetMovieWatched).toHaveBeenCalledWith(true, true);
    });

    it("clicking Edit calls changeEditing", () => {
        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                changeEditing={mockChangeEditing}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        fireEvent.click(screen.getByText(/Edit/i));
        expect(mockChangeEditing).toHaveBeenCalled();
    });
});
