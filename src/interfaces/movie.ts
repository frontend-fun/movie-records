import { Song } from "./song";

export interface Movie {
    title: string;
    released: number;
    description: string;
    id: string;
    rating: number;
    soundtrack: Song[];
}
