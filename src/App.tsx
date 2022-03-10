import React, { useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import ghibli from "./data/ghibli_movies.json";
import { Movie } from "./interfaces/movie";
import { Watch } from "./interfaces/watch";

const MOVIES = ghibli as Movie[];

function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>(MOVIES);
    const [watched, setWatched] = useState<Record<string, Watch>>({});

    return (
        <div className="App">
            <header className="App-header">Movie Records</header>
            <div>
                <MovieList movies={movies}></MovieList>
            </div>
        </div>
    );
}

export default App;
