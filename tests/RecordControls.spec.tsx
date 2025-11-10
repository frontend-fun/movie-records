import { render, screen } from "@testing-library/react";
import { RecordControls } from "../src/components/RecordControls";

describe("RecordControls component", () => {
    const watched = { seen: true, liked: false, when: null };
    const changeEditing = jest.fn();
    const setMovieWatched = jest.fn();

    it("Renders the RecordControls component", () => {
        render(
            <RecordControls
                watched={watched}
                changeEditing={changeEditing}
                setMovieWatched={setMovieWatched}
            />,
        );
    });

    it("Displays the correct buttons based on watched status", () => {
        render(
            <RecordControls
                watched={watched}
                changeEditing={changeEditing}
                setMovieWatched={setMovieWatched}
            />,
        );
        const markAsUnwatchedButton = screen.getByRole("button", {
            name: /mark as unwatched/i,
        });
        expect(markAsUnwatchedButton).toBeInTheDocument();

        const notLikedButton = screen.getByRole("button", {
            name: /not liked/i,
        });
        expect(notLikedButton).toBeInTheDocument();
    });
    it("Calls setMovieWatched with correct parameters when buttons are clicked", () => {
        render(
            <RecordControls
                watched={watched}
                changeEditing={changeEditing}
                setMovieWatched={setMovieWatched}
            />,
        );
        const markAsUnwatchedButton = screen.getByRole("button", {
            name: /mark as unwatched/i,
        });
        markAsUnwatchedButton.click();
        expect(setMovieWatched).toHaveBeenCalledWith(false, false);

        const notLikedButton = screen.getByRole("button", {
            name: /not liked/i,
        });
        notLikedButton.click();
        expect(setMovieWatched).toHaveBeenCalledWith(true, true);
    });
    it("Displays like button when marked as watched", () => {
        const watchedLiked = { seen: true, liked: true, when: null };
        render(
            <RecordControls
                watched={watchedLiked}
                changeEditing={changeEditing}
                setMovieWatched={setMovieWatched}
            />,
        );
        const likedButton = screen.getByRole("button", {
            name: /liked/i,
        });
        expect(likedButton).toBeInTheDocument();
    });
});
