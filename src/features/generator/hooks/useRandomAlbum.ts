import { useEffect, useState } from 'react';
import { albumNames, albumToLyrics, type AlbumKey } from '../../../data/albums';

// Per-album ink accents, tuned for contrast against the cream paper background
const albumAccents: Record<AlbumKey, { accent: string; wash: string }> = {
  taylor_swift: { accent: '#1f7a5e', wash: 'rgba(31, 122, 94, 0.14)' },
  fearless: { accent: '#996d10', wash: 'rgba(153, 109, 16, 0.16)' },
  speak_now: { accent: '#7b48b7', wash: 'rgba(123, 72, 183, 0.14)' },
  red: { accent: '#b02031', wash: 'rgba(176, 32, 49, 0.13)' },
  '1989': { accent: '#22759c', wash: 'rgba(34, 117, 156, 0.15)' },
  reputation: { accent: '#37352f', wash: 'rgba(55, 53, 47, 0.13)' },
  lover: { accent: '#cf3d85', wash: 'rgba(207, 61, 133, 0.14)' },
  folklore: { accent: '#63615a', wash: 'rgba(99, 97, 90, 0.16)' },
  evermore: { accent: '#a8511d', wash: 'rgba(168, 81, 29, 0.15)' },
  midnights: { accent: '#41509e', wash: 'rgba(65, 80, 158, 0.15)' },
  life_of_a_showgirl: { accent: '#c75412', wash: 'rgba(199, 84, 18, 0.15)' },
};

const getRandomAlbumKey = (): AlbumKey => {
  const randomIndex = Math.floor(Math.random() * albumNames.length);
  return albumNames[randomIndex];
};

export function useRandomAlbum() {
  const [albumKey] = useState<AlbumKey>(getRandomAlbumKey);
  const placeholder = albumToLyrics[albumKey];

  useEffect(() => {
    const root = document.documentElement;
    const { accent, wash } = albumAccents[albumKey];
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-wash', wash);

    return () => {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-wash');
    };
  }, [albumKey]);

  return { albumKey, placeholder };
}
