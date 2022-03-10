import React from "react";
import { ListGroup } from "react-bootstrap";
import { Song } from "../interfaces/song";

export function ReadOnlySongs({ songs }: { songs: Song[] }): JSX.Element {
    return (
        <ListGroup as="ol" numbered>
            {songs.map((song: Song) => (
                <ListGroup.Item
                    as="li"
                    key={song.id}
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{song.name}</div>
                        {song.by}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
