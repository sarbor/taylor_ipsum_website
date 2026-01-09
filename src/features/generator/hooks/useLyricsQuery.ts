import { useQuery } from '@tanstack/react-query';
import { fetchLyrics } from '../../../api/lyrics';

type UseLyricsQueryParams = {
    numberOfParagraphs: string;
    randomize: boolean;
    enabled: boolean;
};

export function useLyricsQuery({
    numberOfParagraphs,
    randomize,
    enabled,
}: UseLyricsQueryParams) {
    return useQuery({
        queryKey: ['lyrics', numberOfParagraphs, randomize],
        queryFn: ({ signal }) =>
            fetchLyrics({ numberOfParagraphs, randomize, signal }),
        enabled,
        staleTime: 0, // Always refetch when triggered
        gcTime: 0, // Don't cache results
    });
}
