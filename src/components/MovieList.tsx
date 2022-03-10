import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { MovieView } from "./MovieView";
import { Watch } from "../interfaces/watch";

export function MovieList({
    movies,
    deleteMovie,
    editMovie,
    setMovieWatched
}: {
    movies: Movie[];
    deleteMovie: (id: string) => void;
    editMovie: (id: string, newMovie: Movie) => void;
    setMovieWatched: (id: string, s: boolean, l: boolean) => void;
}): JSX.Element {
    return (
        <Stack gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.id} className="bg-light border m-2 p-2">
                    <MovieView
                        movie={movie}
                        deleteMovie={deleteMovie}
                        editMovie={editMovie}
                        setMovieWatched={setMovieWatched}
                    ></MovieView>
                </div>
            ))}
        </Stack>
    );
}
