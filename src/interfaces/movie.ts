import type { Song } from "./song";
import type { Watch } from "./watch";

export interface Movie {
    title: string;
    released: number;
    description: string;
    id: string;
    rating: number;
    soundtrack: Song[];
    watched: Watch;
}
