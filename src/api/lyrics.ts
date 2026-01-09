import { endpointUrl } from '../constants';

type LyricsResponse = {
  lyrics: string[];
};

type FetchLyricsParams = {
  numberOfParagraphs: string;
  randomize: boolean;
  signal?: AbortSignal;
};

const isLyricsResponse = (data: unknown): data is LyricsResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const candidate = data as LyricsResponse;
  return (
    Array.isArray(candidate.lyrics) &&
    candidate.lyrics.every((line) => typeof line === 'string')
  );
};

export async function fetchLyrics({
  numberOfParagraphs,
  randomize,
  signal,
}: FetchLyricsParams): Promise<string[]> {
  const url = new URL(`${endpointUrl}/lyrics`);
  url.searchParams.set('numberOfParagraphs', numberOfParagraphs);

  if (randomize) {
    url.searchParams.set('shouldRandomizeLyrics', 'true');
  }

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as unknown;

  if (!isLyricsResponse(data)) {
    throw new Error('Unexpected response format');
  }

  return data.lyrics;
}
