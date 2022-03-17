import React from "react";
import { Song } from "../interfaces/song";

export function PlaySong({ song }: { song: Song }): JSX.Element {
    return (
        <iframe
            src={`https://open.spotify.com/embed?uri=spotify:track:${song.id}`}
            frameBorder="0"
            height="80"
            width="350"
            className="ms-4"
        ></iframe>
    );
}
