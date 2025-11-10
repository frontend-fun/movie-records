import { render, screen, fireEvent } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";
describe("EditableSongList", () => {
    const mockSetSongs = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with no songs", () => {
        render(<EditableSongList songs={[]} setSongs={mockSetSongs} />);

        expect(screen.getByText("Add Song")).toBeInTheDocument();
        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
    });

    test("renders all songs in text inputs", () => {
        const songs = ["Time", "Cornfield Chase"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(2);
        expect(inputs[0]).toHaveValue("Time");
        expect(inputs[1]).toHaveValue("Cornfield Chase");
    });

    test("adds a new blank song when Add Song button is clicked", () => {
        const songs = ["Mountains"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const addButton = screen.getByText("Add Song");
        fireEvent.click(addButton);

        expect(mockSetSongs).toHaveBeenCalledWith(["Mountains", ""]);
    });

    test("updates a song when its input value changes", () => {
        const songs = ["Time", "Cornfield Chase"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[0], {
            target: { value: "Dream is Collapsing" },
        });

        expect(mockSetSongs).toHaveBeenCalledWith([
            "Dream is Collapsing",
            "Cornfield Chase",
        ]);
    });

    test("deletes a song when ❌ button is clicked", () => {
        const songs = ["Time", "Cornfield Chase", "Day One"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);

        const deleteButtons = screen.getAllByRole("button", { name: "❌" });
        fireEvent.click(deleteButtons[1]); // delete second song

        expect(mockSetSongs).toHaveBeenCalledWith(["Time", "Day One"]);
    });

    /*test("handles multiple add, edit, and delete actions sequentially", () => {
        let songs = ["First Song"];
        const setSongs = jest.fn((updated) => (songs: = updated));

        const { rerender } = render(
            <EditableSongList songs={songs} setSongs={setSongs} />,
        );

        // Add new song
        fireEvent.click(screen.getByText("Add Song"));
        expect(setSongs).toHaveBeenCalledWith(["First Song", ""]);

        // Simulate re-render with new song list
        rerender(
            <EditableSongList songs={["First Song", ""]} setSongs={setSongs} />,
        );

        // Edit the new song
        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[1], { target: { value: "Second Song" } });
        expect(setSongs).toHaveBeenCalledWith(["First Song", "Second Song"]);

        // Delete first song
        const deleteButtons = screen.getAllByRole("button", { name: "❌" });
        fireEvent.click(deleteButtons[0]);
        expect(setSongs).toHaveBeenCalledWith(["Second Song"]);
    });*/
});
