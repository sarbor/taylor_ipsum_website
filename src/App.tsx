import { useState, type FormEventHandler } from 'react';
import { GeneratorForm } from './components/GeneratorForm';
import { LyricsOutput } from './components/LyricsOutput';
import { fetchLyrics } from './api/lyrics';
import { useRandomAlbumBackground } from './hooks/useRandomAlbumBackground';

const DEFAULT_PARAGRAPHS = '3';
const FALLBACK_PARAGRAPHS = '1';

export default function App() {
  const [numParagraphs, setNumParagraphs] = useState(DEFAULT_PARAGRAPHS);
  const [randomize, setRandomize] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const { placeholder } = useRandomAlbumBackground();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const normalizedParagraphs = numParagraphs.trim() || FALLBACK_PARAGRAPHS;

    try {
      const lyrics = await fetchLyrics({
        numberOfParagraphs: normalizedParagraphs,
        randomize,
      });
      setGeneratedText(lyrics.join('\n\n'));
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
        <GeneratorForm
          numParagraphs={numParagraphs}
          randomize={randomize}
          onNumParagraphsChange={setNumParagraphs}
          onRandomizeChange={setRandomize}
          onSubmit={handleSubmit}
        />
        <LyricsOutput placeholder={placeholder} value={generatedText} />
      </div>
    </div>
  );
}
