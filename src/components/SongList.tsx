import React from "react";
import { Song } from "../interfaces/song";
import { ListGroup } from "react-bootstrap";
import { PlaySong } from "./PlaySong";

export function SongList({ songs }: { songs: Song[] }): JSX.Element {
    return (
        <ListGroup as="ol" numbered>
            {songs.map((song: Song) => (
                <ListGroup.Item
                    as="li"
                    key={song.id}
                    className="d-flex align-items-start"
                >
                    <PlaySong song={song}></PlaySong>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
