import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Application integration", () => {
    test("can open Add Movie modal, add a movie with a song and see its trailer iframe", () => {
        render(<App />);

        // open the add modal
        const addButton = screen.getByRole("button", {
            name: /Add New Movie/i,
        });
    userEvent.click(addButton);

        // modal should be visible (dialog present and contains the title)
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getByText(/Add New Movie/i)).toBeInTheDocument();

        // fill the YouTube ID
        const idInput = screen.getByLabelText(/YouTube ID:/i);
    userEvent.type(idInput, "my-test-id");

        // add a soundtrack entry, type into the newly created textbox
        const addSongButton = screen.getByRole("button", { name: /Add Song/i });
    userEvent.click(addSongButton);

        // there will be multiple textboxes; the last one is the song input
        const textboxes = screen.getAllByRole("textbox");
        const songInput = textboxes[textboxes.length - 1];
    userEvent.type(songInput, "spotify-track-1");

        // save changes
        const saveButton = screen.getByRole("button", {
            name: /Save Changes/i,
        });
    userEvent.click(saveButton);

    // modal should close (no dialog present)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        // find all trailers and assert one contains our id
        const iframes = screen.getAllByTitle("YouTube video player");
        const found = iframes.some((node) =>
            (node as HTMLIFrameElement).src.includes("my-test-id"),
        );
        expect(found).toBe(true);
    });
});
