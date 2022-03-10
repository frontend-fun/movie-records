import React, { useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import ghibli from "./data/ghibli_movies.json";
import { Movie } from "./interfaces/movie";
import { Watch } from "./interfaces/watch";

const MOVIES = ghibli.map(
    (movie: Partial<Movie>): Movie => ({
        ...(movie as Movie),
        watched: { seen: false, liked: false, when: null }
    })
);

function watchMovie(movie: Movie, seen: boolean, liked: boolean): Movie {
    return {
        ...movie,
        watched: {
            ...movie.watched,
            seen: seen,
            liked: liked,
            when: new Date().toLocaleString()
        }
    };
}

function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>(MOVIES);

    function setMovieWatched(id: string, seen: boolean, liked: boolean) {
        setMovies(
            movies.map(
                (movie: Movie): Movie =>
                    id === movie.id ? watchMovie(movie, seen, liked) : movie
            )
        );
    }

    function editMovie(id: string, newMovie: Movie) {
        setMovies(
            movies.map(
                (movie: Movie): Movie => (movie.id === id ? newMovie : movie)
            )
        );
    }

    function deleteMovie(id: string) {
        setMovies(movies.filter((movie: Movie): boolean => movie.id !== id));
    }

    function addMovie(id: string, newMovie: Movie) {
        setMovies([...movies, newMovie]);
    }

    return (
        <div className="App">
            <header className="App-header">Movie Records</header>
            <div>
                <MovieList
                    movies={movies}
                    editMovie={editMovie}
                    deleteMovie={deleteMovie}
                    setMovieWatched={setMovieWatched}
                ></MovieList>
                
            </div>
        </div>
    );
}

export default App;
