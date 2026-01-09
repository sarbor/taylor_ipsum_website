import { useState, type FormEventHandler } from 'react';
import { GeneratorForm } from './components/GeneratorForm';
import { LyricsOutput } from './components/LyricsOutput';
import { useLyricsQuery } from './hooks/useLyricsQuery';
import { useRandomAlbumBackground } from './hooks/useRandomAlbumBackground';

const DEFAULT_PARAGRAPHS = '3';
const FALLBACK_PARAGRAPHS = '1';

export default function App() {
  const [numParagraphs, setNumParagraphs] = useState(DEFAULT_PARAGRAPHS);
  const [randomize, setRandomize] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { placeholder } = useRandomAlbumBackground();

  const normalizedParagraphs = numParagraphs.trim() || FALLBACK_PARAGRAPHS;

  const { data, isLoading, isError, error } = useLyricsQuery({
    numberOfParagraphs: normalizedParagraphs,
    randomize,
    enabled: shouldFetch,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setShouldFetch(true);
  };

  const getOutputText = (): string => {
    if (isLoading) return 'Loading...';
    if (isError) return `Error: ${error?.message || 'Failed to fetch lyrics'}`;
    if (data) return data.join('\n\n');
    return '';
  };

  return (
    <div className="webpage">
      <header>
        <h1>Taylor Ipsum Generator</h1>
        <p className="subtitle">Placeholder text powered by Taylor Swift lyrics</p>
      </header>

      <div className="container">
        <GeneratorForm
          numParagraphs={numParagraphs}
          randomize={randomize}
          onNumParagraphsChange={setNumParagraphs}
          onRandomizeChange={setRandomize}
          onSubmit={handleSubmit}
        />
        <LyricsOutput placeholder={placeholder} value={getOutputText()} />
      </div>
    </div>
  );
}
