import React from "react";
import { Movie } from "../interfaces/movie";

export function MovieList({ movies }: { movies: Movie[] }): JSX.Element {
    return <div>{movies.length} movies</div>;
}
