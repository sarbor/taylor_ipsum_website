export type LyricsResponse = {
    lyrics: string[];
};

export type FetchLyricsParams = {
    numberOfParagraphs: string;
    randomize: boolean;
};

export type { AlbumKey } from './constants';
