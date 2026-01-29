import { useEffect, useState } from 'react';
import { albumNames, albumToLyrics, type AlbumKey } from '../../../data/albums';

// Album-specific color palettes for the iridescent accent
const albumColors: Record<AlbumKey, { primary: string; secondary: string; glow: string }> = {
  taylor_swift: { primary: '#7dd3c0', secondary: '#a8e6cf', glow: 'rgba(125, 211, 192, 0.4)' },
  fearless: { primary: '#ffd700', secondary: '#ffe066', glow: 'rgba(255, 215, 0, 0.4)' },
  speak_now: { primary: '#c99fff', secondary: '#e0c4ff', glow: 'rgba(201, 159, 255, 0.4)' },
  red: { primary: '#ff6b6b', secondary: '#ff8a80', glow: 'rgba(255, 107, 107, 0.4)' },
  '1989': { primary: '#87ceeb', secondary: '#b8e0f0', glow: 'rgba(135, 206, 235, 0.4)' },
  reputation: { primary: '#a0a0a0', secondary: '#c0c0c0', glow: 'rgba(160, 160, 160, 0.4)' },
  lover: { primary: '#ff9ff3', secondary: '#ffc8dd', glow: 'rgba(255, 159, 243, 0.4)' },
  folklore: { primary: '#d4d4d4', secondary: '#e8e8e8', glow: 'rgba(212, 212, 212, 0.4)' },
  evermore: { primary: '#e8b888', secondary: '#f0d4b8', glow: 'rgba(232, 184, 136, 0.4)' },
  midnights: { primary: '#7c8ae6', secondary: '#a0acf0', glow: 'rgba(124, 138, 230, 0.4)' },
  life_of_a_showgirl: { primary: '#e8c4ff', secondary: '#c4e8ff', glow: 'rgba(232, 196, 255, 0.4)' },
};

const getRandomAlbumKey = (): AlbumKey => {
  const randomIndex = Math.floor(Math.random() * albumNames.length);
  return albumNames[randomIndex];
};

export function useRandomAlbumBackground() {
  const [albumKey] = useState<AlbumKey>(getRandomAlbumKey);
  const placeholder = albumToLyrics[albumKey];

  useEffect(() => {
    const previousBackground = document.body.style.backgroundImage;
    document.body.style.backgroundImage = `url(/images/${albumKey}.jpg)`;

    // Apply album-specific accent colors
    const colors = albumColors[albumKey];
    document.documentElement.style.setProperty('--accent-primary', colors.primary);
    document.documentElement.style.setProperty('--accent-secondary', colors.secondary);
    document.documentElement.style.setProperty('--accent-glow', colors.glow);

    return () => {
      document.body.style.backgroundImage = previousBackground;
      // Reset to default colors
      document.documentElement.style.setProperty('--accent-primary', '#e8c4ff');
      document.documentElement.style.setProperty('--accent-secondary', '#c4e8ff');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(232, 196, 255, 0.4)');
    };
  }, [albumKey]);

  return { albumKey, placeholder };
}
