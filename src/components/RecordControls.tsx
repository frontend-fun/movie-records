import React from "react";
import { Button } from "react-bootstrap";
import { Watch } from "../interfaces/watch";

export function RecordControls({
    watched,
    changeEditing,
    setMovieWatched
}: {
    watched: Watch;
    changeEditing: () => void;
    setMovieWatched: (s: boolean, l: boolean) => void;
}): JSX.Element {
    return (
        <div>
            {watched.seen ? (
                <Button
                    className="float-right me-3"
                    size="sm"
                    onClick={() => setMovieWatched(false, watched.liked)}
                >
                    Mark as unwatched
                </Button>
            ) : (
                <Button
                    className="float-right me-3"
                    size="sm"
                    onClick={() => setMovieWatched(true, watched.liked)}
                >
                    Mark as watched
                </Button>
            )}
            {watched.seen &&
                (watched.liked ? (
                    <Button
                        className="float-right me-3"
                        size="sm"
                        variant="success"
                        onClick={() => setMovieWatched(true, false)}
                    >
                        Liked
                    </Button>
                ) : (
                    <Button
                        className="float-right me-3"
                        size="sm"
                        variant="warning"
                        onClick={() => setMovieWatched(true, true)}
                    >
                        Not liked
                    </Button>
                ))}
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit
            </Button>
        </div>
    );
}
