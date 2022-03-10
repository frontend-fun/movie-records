import React, { useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { AddMovieModal } from "./components/AddMovieModal";
import ghibli from "./data/ghibli_movies.json";
import { Movie } from "./interfaces/movie";
import { Watch } from "./interfaces/watch";
import { Button } from "react-bootstrap";

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
    const [showAddModal, setShowAddModal] = useState(false);

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

    function addMovie(newMovie: Movie) {
        const existing = movies.find(
            (movie: Movie): boolean => movie.id === newMovie.id
        );
        if (existing === undefined) {
            setMovies([...movies, newMovie]);
        }
    }

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

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
            <div>
                <Button
                    variant="success"
                    className="m-4"
                    onClick={handleShowAddModal}
                >
                    Add New Movie
                </Button>
                <AddMovieModal
                    show={showAddModal}
                    handleClose={handleCloseAddModal}
                    addMovie={addMovie}
                ></AddMovieModal>
            </div>
        </div>
    );
}

export default App;
