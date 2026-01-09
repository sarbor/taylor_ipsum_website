import { useState, type FormEventHandler } from 'react';
import { GeneratorForm } from './features/generator/components/GeneratorForm';
import { LyricsOutput } from './features/generator/components/LyricsOutput';
import { useLyricsQuery } from './features/generator/hooks/useLyricsQuery';
import { useRandomAlbumBackground } from './features/generator/hooks/useRandomAlbumBackground';
import { DEFAULT_PARAGRAPHS, FALLBACK_PARAGRAPHS } from './config';

export default function App() {
  const [numParagraphs, setNumParagraphs] = useState(DEFAULT_PARAGRAPHS);
  const [randomize, setRandomize] = useState(false);

  const { placeholder } = useRandomAlbumBackground();

  const normalizedParagraphs = numParagraphs.trim() || FALLBACK_PARAGRAPHS;

  const { data, isFetching, isError, error, refetch } = useLyricsQuery({
    numberOfParagraphs: normalizedParagraphs,
    randomize,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void refetch();
  };

  const getOutputText = (): string => {
    if (isFetching) return 'Loading...';
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
