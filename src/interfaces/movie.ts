import { Song } from "./song";

export interface Movie {
    title: string;
    description: string;
    trailer: string;
    rating: number;
    soundtrack: Song[];
}
