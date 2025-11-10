import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList Component", () => {
    let mockSetSongs: jest.Mock;

    beforeEach(() => {
        mockSetSongs = jest.fn();
        jest.clearAllMocks();
    });

    test("renders all existing songs", () => {
        const songs = ["Song A", "Song B"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        expect(screen.getByDisplayValue("Song A")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Song B")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    test("calls setSongs with an empty new song when Add Song clicked", () => {
        const songs = ["Song A"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const addButton = screen.getByRole("button", { name: /add song/i });
        fireEvent.click(addButton);

        // Expect previous + new empty string
        expect(mockSetSongs).toHaveBeenCalledWith(["Song A", ""]);
    });

    test("edits a song value correctly", () => {
        const songs = ["Old Song"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const input = screen.getByDisplayValue("Old Song");
        fireEvent.change(input, { target: { value: "New Song" } });

        expect(mockSetSongs).toHaveBeenCalledWith(["New Song"]);
    });

    test("deletes a song correctly when ❌ button clicked", () => {
        const songs = ["Song 1", "Song 2", "Song 3"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        // Delete the middle song
        const deleteButtons = screen.getAllByRole("button", { name: /❌/ });
        fireEvent.click(deleteButtons[1]);

        // Should remove index 1
        expect(mockSetSongs).toHaveBeenCalledWith(["Song 1", "Song 3"]);
    });

    test("handles multiple add and delete operations", () => {
        const songs: string[] = [];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const addButton = screen.getByRole("button", { name: /add song/i });

        // Add twice
        fireEvent.click(addButton);
        fireEvent.click(addButton);

        expect(mockSetSongs).toHaveBeenCalledTimes(2);
        expect((mockSetSongs.mock.calls[1] as [string[]])[0]).toEqual(["", ""]);

        // Render again with two songs to test deleting
        render(<EditableSongList songs={["A", "B"]} setSongs={mockSetSongs} />);
        const deleteButtons = screen.getAllByRole("button", { name: /❌/ });
        fireEvent.click(deleteButtons[0]);

        expect(mockSetSongs).toHaveBeenCalledWith(["B"]);
    });

    test("ensures song input changes trigger setSongs per index", () => {
        const songs = ["Song X", "Song Y"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[1], { target: { value: "Song Y Updated" } });

        expect(mockSetSongs).toHaveBeenCalledWith(["Song X", "Song Y Updated"]);
    });

    test("renders without any songs gracefully", () => {
        render(<EditableSongList songs={[]} setSongs={mockSetSongs} />);
        expect(
            screen.getByRole("button", { name: /add song/i }),
        ).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
});
