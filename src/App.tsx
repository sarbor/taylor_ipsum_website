import { useEffect, useState, type FormEvent } from 'react';
import { albumToLyrics, endpointUrl } from './constants';

const albumNames = Object.keys(albumToLyrics);

type LyricsResponse = {
  lyrics: string[];
};

function getRandomAlbum(): string {
  const randomIndex = Math.floor(Math.random() * albumNames.length);
  return albumNames[randomIndex];
}

export default function App() {
  const [numParagraphs, setNumParagraphs] = useState('3');
  const [randomize, setRandomize] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [placeholder, setPlaceholder] = useState('Hello World');

  useEffect(() => {
    const randomAlbum = getRandomAlbum();
    document.body.style.backgroundImage = `url(/images/${randomAlbum}.jpg)`;
    setPlaceholder(albumToLyrics[randomAlbum]);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = numParagraphs.toString().trim();
    const paragraphCount = trimmedValue === '' ? '1' : trimmedValue;
    let route = `${endpointUrl}/lyrics?numberOfParagraphs=${encodeURIComponent(paragraphCount)}`;

    if (randomize) {
      route += '&shouldRandomizeLyrics=true';
    }

    try {
      const response = await fetch(route);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as LyricsResponse;
      const concatenatedText = data.lyrics.join('\n\n');
      setGeneratedText(concatenatedText);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedText('Error retrieving lyrics');
    }
  };

  return (
    <div className="webpage">
      <header>
        <h1>Taylor Ipsum Generator</h1>
      </header>

      <div className="container">
        <form id="generator-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="paragraphs">Number of Paragraphs:</label>
            <input
              type="number"
              id="paragraphs"
              name="paragraphs"
              min="1"
              max="1597"
              value={numParagraphs}
              onChange={(event) => setNumParagraphs(event.target.value)}
            />

            <label htmlFor="randomize">Randomize:</label>
            <input
              type="checkbox"
              id="randomize"
              name="randomize"
              checked={randomize}
              onChange={(event) => setRandomize(event.target.checked)}
            />
          </div>

          <div className="form-row">
            <button type="submit">Generate</button>
          </div>
        </form>
        <textarea
          id="generated-text"
          placeholder={placeholder}
          value={generatedText}
          readOnly
        />
      </div>
    </div>
  );
}
