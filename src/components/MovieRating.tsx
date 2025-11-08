export function MovieRating({ rating }: { rating: number }) {
    const stars = Math.ceil(rating / 2);
    const filledStars = "⭐".repeat(stars);
    const emptyStars = "✰".repeat(5 - stars);
    return (
        <span>
            {filledStars}
            {emptyStars}
        </span>
    );
}
