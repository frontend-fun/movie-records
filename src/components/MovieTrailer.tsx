export function MovieTrailer({ id }: { id: string }) {
    return (
        <iframe
            width="642"
            height="361"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
