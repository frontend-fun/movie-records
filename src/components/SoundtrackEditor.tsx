import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import type { Song } from "../interfaces/song";

interface SongProps {
    song: Song;
    setSong: (id: string, newSong: Song) => void;
}

export function SongNameEditor({ song, setSong }: SongProps) {
    return (
        <Form.Control
            value={song.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSong(song.id, {
                    ...song,
                    name: event.target.value,
                })
            }
        />
    );
}

export function SongByEditor({ song, setSong }: SongProps) {
    return (
        <Form.Control
            value={song.by}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSong(song.id, {
                    ...song,
                    by: event.target.value,
                })
            }
        />
    );
}

export function SoundtrackEditor({
    songs,
    setSongs,
}: {
    songs: Song[];
    setSongs: (songs: Song[]) => void;
}) {
    function setSong(id: string, newSong: Song) {
        setSongs(songs.map((song: Song) => (song.id === id ? newSong : song)));
    }

    return (
        <ListGroup as="ol" numbered>
            {songs.map((song: Song) => (
                <ListGroup.Item
                    as="li"
                    key={song.id}
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 me-auto">
                        {/* Song Title */}
                        <SongNameEditor
                            song={song}
                            setSong={setSong}
                        ></SongNameEditor>
                        {/* Song By */}
                        <SongByEditor
                            song={song}
                            setSong={setSong}
                        ></SongByEditor>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
