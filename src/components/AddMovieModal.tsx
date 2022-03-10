import React, { useState } from "react";
import { Button, Modal, Form, Col, Row, Container } from "react-bootstrap";
import { Movie } from "../interfaces/movie";
import { Song } from "../interfaces/song";
import { EditableSongList } from "./EditableSongList";

export function AddMovieModal({
    show,
    handleClose,
    addMovie
}: {
    show: boolean;
    handleClose: () => void;
    addMovie: (newMovie: Movie) => void;
}) {
    const [id, setId] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);

    function saveChanges() {
        addMovie({
            id: id,
            title: "",
            rating: 0,
            description: "",
            released: 0,
            soundtrack: songs.map(
                (song: string): Song => ({ id: song, name: "", by: "" })
            ),
            watched: {
                seen: false,
                liked: false,
                when: null
            }
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Title */}
                <Form.Group controlId="formMovieId" as={Row}>
                    <Form.Label column sm={3}>
                        YouTube ID:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={id}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setId(event.target.value)}
                        />
                    </Col>
                </Form.Group>
                {/* Soundtrack */}
                <span>Spotify IDs:</span>
                <EditableSongList
                    songs={songs}
                    setSongs={setSongs}
                ></EditableSongList>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
