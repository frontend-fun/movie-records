import { Song } from "./song";

export interface Movie {
    title: string;
    released: number;
    description: string;
    youtube: string;
    rating: number;
    soundtrack: Song[];
}
