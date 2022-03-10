import React from "react";
import { Song } from "../interfaces/song";

export function PlaySong({ song }: { song: Song }): JSX.Element {
    /*return (
        <Badge bg="primary" pill onClick={}>
            ▶
        </Badge>
    );*/
    /*
    <div className="ms-2 me-auto">
                        <div className="fw-bold">{song.name}</div>
                        {song.by}
                    </div>
                    */
    return (
        <iframe
            src={`https://open.spotify.com/embed?uri=spotify:track:${song.id}`}
            frameBorder="0"
            height="80"
            width="350"
            allowTransparency={true}
            className="ms-4"
        ></iframe>
    );
}
