import { useEffect, useState } from 'react';
import { albumNames, albumToLyrics, type AlbumKey } from '../../../data/albums';

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

    return () => {
      document.body.style.backgroundImage = previousBackground;
    };
  }, [albumKey]);

  return { albumKey, placeholder };
}
