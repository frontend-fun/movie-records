import React from "react";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieRating } from "./MovieRating";
import { MovieTrailer } from "./MovieTrailer";
import { SongList } from "./SongList";
import { Movie } from "../interfaces/movie";
import { Watch } from "../interfaces/watch";
import { WatchStatus } from "./WatchStatus";
import { RecordControls } from "./RecordControls";
import { MovieEditor } from "./MovieEditor";

export function MovieView({
    movie,
    deleteMovie,
    editMovie,
    setMovieWatched
}: {
    movie: Movie;
    deleteMovie: (id: string) => void;
    editMovie: (id: string, newMovie: Movie) => void;
    setMovieWatched: (id: string, s: boolean, l: boolean) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <MovieEditor
            changeEditing={changeEditing}
            movie={movie}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
        ></MovieEditor>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h3>{movie.title}</h3>
                    <RecordControls
                        setMovieWatched={(seen: boolean, liked: boolean) =>
                            setMovieWatched(movie.id, seen, liked)
                        }
                        watched={movie.watched}
                        changeEditing={changeEditing}
                    ></RecordControls>
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
