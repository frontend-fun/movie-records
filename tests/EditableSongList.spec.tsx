import { render, screen } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";
describe("EditableSongList component", () => {
    const songs = ["Song 1", "Song 2"];
    const setSongs = jest.fn();

    it("Renders the EditableSongList component", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
    });

    it("Displays the correct number of songs", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        const songInputs = screen.getAllByRole("textbox");
        expect(songInputs.length).toBe(songs.length);
    });

    it("Displays the correct song names", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        songs.forEach((song) => {
            const songInput = screen.getByDisplayValue(song);
            expect(songInput).toBeInTheDocument();
        });
    });
    it("Deletes a song when delete button is clicked", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        const deleteButtons = screen.getAllByRole("button", {
            name: /delete/i,
        });
        deleteButtons[0].click();
        expect(setSongs).toHaveBeenCalledWith(["Song 2"]);
    });
    it("Adds a song when add button is clicked", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        const addButton = screen.getByRole("button", { name: /add song/i });
        addButton.click();
        expect(setSongs).toHaveBeenCalledWith([...songs, ""]);
    });
    it("Edits a song when edit button is clicked", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        const songInput = screen.getByDisplayValue("Song 1");
        songInput.setAttribute("value", "New Song 1");
        expect(setSongs).toHaveBeenCalledWith(["New Song 1", "Song 2"]);
    });

    it("Updates song after being edited", () => {
        render(<EditableSongList songs={songs} setSongs={setSongs} />);
        const songInput = screen.getByDisplayValue("Song 1");
        songInput.focus();
        (songInput as HTMLInputElement).value = "Updated Song 1";
        songInput.blur();
        expect(setSongs).toHaveBeenCalledWith(["Updated Song 1", "Song 2"]);
    });
});
