import React from "react";
import { Button, ListGroup, Form, Col, Row } from "react-bootstrap";

export function EditableSongList({
    songs,
    setSongs
}: {
    songs: string[];
    setSongs: (songs: string[]) => void;
}): JSX.Element {
    function addSong() {
        setSongs([...songs, ""]);
    }

    function editSong(index: number, newValue: string) {
        const copiedSongs = [...songs];
        copiedSongs[index] = newValue;
        setSongs(copiedSongs);
    }

    function deleteSong(index: number) {
        const copiedSongs = [...songs];
        copiedSongs.splice(index, 1);
        setSongs(copiedSongs);
    }

    return (
        <div>
            <Button size="sm" variant="success" onClick={addSong}>
                Add Song
            </Button>
            <ListGroup as="ol" numbered>
                {songs.map((song: string, index: number) => (
                    <ListGroup.Item
                        as="li"
                        key={index}
                        className="d-flex align-items-start"
                    >
                        <div className="ms-3 me-auto">
                            <Form.Group controlId="formMovieName" as={Row}>
                                <Col sm={11}>
                                    <Form.Control
                                        value={song}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            editSong(index, event.target.value)
                                        }
                                    />
                                </Col>
                                <Col sm={1}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteSong(index)}
                                    >
                                        ❌
                                    </Button>
                                </Col>
                            </Form.Group>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
