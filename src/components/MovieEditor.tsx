import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Movie } from "../interfaces/movie";
import { ReadOnlySongs } from "./ReadOnlySongs";

export function MovieEditor({
    changeEditing,
    movie,
    editMovie,
    deleteMovie
}: {
    changeEditing: () => void;
    movie: Movie;
    editMovie: (id: string, newMovie: Movie) => void;
    deleteMovie: (id: string) => void;
}): JSX.Element {
    const [title, setTitle] = useState<string>(movie.title);
    const [releaseYear, setReleaseYear] = useState<string>(
        movie.released.toString()
    );
    const [rating, setRating] = useState<string>(
        (Math.ceil(movie.rating / 2) * 2).toString()
    );
    const [description, setDescription] = useState<string>(movie.description);

    function save() {
        editMovie(movie.id, {
            ...movie,
            title: title,
            released: parseInt(releaseYear) || 0,
            rating: parseInt(rating) || 0,
            description: description
        });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Title */}
                    <Form.Group controlId="formMovieTitle" as={Row}>
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={title}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Release Year */}
                    <Form.Group controlId="formMovieRelease" as={Row}>
                        <Form.Label column sm={2}>
                            Release Year:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="number"
                                value={releaseYear}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setReleaseYear(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Rating */}
                    <Form.Group controlId="formMovieRating" as={Row}>
                        <Form.Label column sm={2}>
                            Release Year:
                        </Form.Label>
                        <Col>
                            <Form.Select
                                value={rating}
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) => setRating(event.target.value)}
                            >
                                <option value="0">✰✰✰✰✰</option>
                                <option value="2">⭐✰✰✰✰</option>
                                <option value="4">⭐⭐✰✰✰</option>
                                <option value="6">⭐⭐⭐✰✰</option>
                                <option value="8">⭐⭐⭐⭐✰</option>
                                <option value="10">⭐⭐⭐⭐⭐</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    {/* Description */}
                    <Form.Group controlId="formMovieDescription" as={Row}>
                        <Form.Label column sm={2}>
                            Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Soundtrack */}
                    <ReadOnlySongs songs={movie.soundtrack}></ReadOnlySongs>
                    {/* Save/Cancel */}
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button onClick={cancel} variant="warning" className="me-5">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteMovie(movie.id)}
                        variant="danger"
                        className="me-8"
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
