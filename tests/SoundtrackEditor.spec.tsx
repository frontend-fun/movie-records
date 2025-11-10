import { render, fireEvent, screen } from "@testing-library/react";
import {
    SoundtrackEditor,
    SongNameEditor,
    SongByEditor,
} from "../src/components/SoundtrackEditor";
import { jest } from "@jest/globals";
import type { Song } from "../src/interfaces/song";

describe("SoundtrackEditor Components", () => {
    describe("SoundtrackEditor", () => {
        const mockSetSongs = jest.fn();
        const initialSongs: Song[] = [
            { id: "1", name: "Song 1", by: "Artist 1" },
            { id: "2", name: "Song 2", by: "Artist 2" },
        ];

        beforeEach(() => {
            mockSetSongs.mockClear();
        });

        it("renders all songs with their editors", () => {
            render(
                <SoundtrackEditor
                    songs={initialSongs}
                    setSongs={mockSetSongs}
                />,
            );

            initialSongs.forEach((song) => {
                expect(screen.getByDisplayValue(song.name)).toBeInTheDocument();
                expect(screen.getByDisplayValue(song.by)).toBeInTheDocument();
            });
        });

        it("updates song when song name is changed", () => {
            render(
                <SoundtrackEditor
                    songs={initialSongs}
                    setSongs={mockSetSongs}
                />,
            );

            const firstSongNameInput = screen.getByDisplayValue("Song 1");
            fireEvent.change(firstSongNameInput, {
                target: { value: "Updated Song 1" },
            });

            const expectedSongs = initialSongs.map((song) =>
                song.id === "1" ? { ...song, name: "Updated Song 1" } : song,
            );
            expect(mockSetSongs).toHaveBeenCalledWith(expectedSongs);
        });

        it("updates song when artist is changed", () => {
            render(
                <SoundtrackEditor
                    songs={initialSongs}
                    setSongs={mockSetSongs}
                />,
            );

            const firstArtistInput = screen.getByDisplayValue("Artist 1");
            fireEvent.change(firstArtistInput, {
                target: { value: "Updated Artist 1" },
            });

            const expectedSongs = initialSongs.map((song) =>
                song.id === "1" ? { ...song, by: "Updated Artist 1" } : song,
            );
            expect(mockSetSongs).toHaveBeenCalledWith(expectedSongs);
        });
    });

    describe("SongNameEditor", () => {
        const mockSetSong = jest.fn();
        const song: Song = { id: "1", name: "Test Song", by: "Test Artist" };

        beforeEach(() => {
            mockSetSong.mockClear();
        });

        it("renders with song name", () => {
            render(<SongNameEditor song={song} setSong={mockSetSong} />);
            expect(screen.getByDisplayValue("Test Song")).toBeInTheDocument();
        });

        it("calls setSong with updated name when changed", () => {
            render(<SongNameEditor song={song} setSong={mockSetSong} />);

            const input = screen.getByDisplayValue("Test Song");
            fireEvent.change(input, { target: { value: "Updated Song" } });

            expect(mockSetSong).toHaveBeenCalledWith("1", {
                ...song,
                name: "Updated Song",
            });
        });
    });

    describe("SongByEditor", () => {
        const mockSetSong = jest.fn();
        const song: Song = { id: "1", name: "Test Song", by: "Test Artist" };

        beforeEach(() => {
            mockSetSong.mockClear();
        });

        it("renders with artist name", () => {
            render(<SongByEditor song={song} setSong={mockSetSong} />);
            expect(screen.getByDisplayValue("Test Artist")).toBeInTheDocument();
        });

        it("calls setSong with updated artist when changed", () => {
            render(<SongByEditor song={song} setSong={mockSetSong} />);

            const input = screen.getByDisplayValue("Test Artist");
            fireEvent.change(input, { target: { value: "Updated Artist" } });

            expect(mockSetSong).toHaveBeenCalledWith("1", {
                ...song,
                by: "Updated Artist",
            });
        });
    });
});
