import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { MovieRating } from "./MovieRating";
import { MovieTrailer } from "./MovieTrailer";

export function MovieList({ movies }: { movies: Movie[] }): JSX.Element {
    return (
        <Stack gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.id} className="bg-light border m-2 p-2">
                    <Container>
                        <Row>
                            <Col>
                                <h3>{movie.title}</h3>
                                <MovieRating
                                    rating={movie.rating}
                                ></MovieRating>
                                <i> Released {movie.released}</i>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>{movie.description}</p>
                            </Col>
                            <Col>
                                <MovieTrailer id={movie.id}></MovieTrailer>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ))}
        </Stack>
    );
}
