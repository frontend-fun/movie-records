import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { MovieView } from "./MovieView";

export function MovieList({ movies }: { movies: Movie[] }): JSX.Element {
    return (
        <Stack gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.id} className="bg-light border m-2 p-2">
                    <MovieView movie={movie}></MovieView>
                </div>
            ))}
        </Stack>
    );
}
