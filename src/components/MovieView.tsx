import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieRating } from "./MovieRating";
import { MovieTrailer } from "./MovieTrailer";
import { SongList } from "./SongList";
import { Movie } from "../interfaces/movie";

export function MovieView({ movie }: { movie: Movie }): JSX.Element {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>{movie.title}</h3>
                    <MovieRating rating={movie.rating}></MovieRating>
                    <i> Released {movie.released}</i>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{movie.description}</p>
                    <SongList songs={movie.soundtrack}></SongList>
                </Col>
                <Col>
                    <MovieTrailer id={movie.id}></MovieTrailer>
                </Col>
            </Row>
        </Container>
    );
}
