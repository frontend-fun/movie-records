import { render, fireEvent, screen } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";
import { jest } from "@jest/globals";

describe("EditableSongList", () => {
    const mockSetSongs = jest.fn();
    const initialSongs = ["Song 1", "Song 2"];

    beforeEach(() => {
        mockSetSongs.mockClear();
    });

    it("renders list of songs", () => {
        render(
            <EditableSongList songs={initialSongs} setSongs={mockSetSongs} />,
        );

        initialSongs.forEach((song) => {
            expect(screen.getByDisplayValue(song)).toBeInTheDocument();
        });
    });

    it("adds new song when clicking Add Song button", () => {
        render(
            <EditableSongList songs={initialSongs} setSongs={mockSetSongs} />,
        );

        const addButton = screen.getByText("Add Song");
        fireEvent.click(addButton);

        expect(mockSetSongs).toHaveBeenCalledWith([...initialSongs, ""]);
    });

    it("edits existing song", () => {
        render(
            <EditableSongList songs={initialSongs} setSongs={mockSetSongs} />,
        );

        const firstSongInput = screen.getByDisplayValue("Song 1");
        fireEvent.change(firstSongInput, {
            target: { value: "Updated Song 1" },
        });

        expect(mockSetSongs).toHaveBeenCalledWith(["Updated Song 1", "Song 2"]);
    });

    it("deletes song", () => {
        render(
            <EditableSongList songs={initialSongs} setSongs={mockSetSongs} />,
        );

        const deleteButtons = screen.getAllByText("❌");
        fireEvent.click(deleteButtons[0]);

        expect(mockSetSongs).toHaveBeenCalledWith(["Song 2"]);
    });

    it("maintains order when editing songs", () => {
        const multipleSongs = ["Song 1", "Song 2", "Song 3"];
        render(
            <EditableSongList songs={multipleSongs} setSongs={mockSetSongs} />,
        );

        const secondSongInput = screen.getByDisplayValue("Song 2");
        fireEvent.change(secondSongInput, {
            target: { value: "Updated Song 2" },
        });

        expect(mockSetSongs).toHaveBeenCalledWith([
            "Song 1",
            "Updated Song 2",
            "Song 3",
        ]);
    });

    it("maintains order when deleting songs", () => {
        const multipleSongs = ["Song 1", "Song 2", "Song 3"];
        render(
            <EditableSongList songs={multipleSongs} setSongs={mockSetSongs} />,
        );

        const deleteButtons = screen.getAllByText("❌");
        fireEvent.click(deleteButtons[1]); // Delete the second song

        expect(mockSetSongs).toHaveBeenCalledWith(["Song 1", "Song 3"]);
    });
});
