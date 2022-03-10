import React from "react";

export function MovieRating({ rating }: { rating: number }): JSX.Element {
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
