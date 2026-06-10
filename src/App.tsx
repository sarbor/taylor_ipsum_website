import { useState, type FormEventHandler } from 'react';
import { GeneratorForm } from './features/generator/components/GeneratorForm';
import { LyricsOutput } from './features/generator/components/LyricsOutput';
import { useLyricsQuery } from './features/generator/hooks/useLyricsQuery';
import { useRandomAlbum } from './features/generator/hooks/useRandomAlbum';
import { albumMeta, albumNames } from './data/albums';
import { DEFAULT_PARAGRAPHS, FALLBACK_PARAGRAPHS } from './config';

export default function App() {
  const [numParagraphs, setNumParagraphs] = useState(DEFAULT_PARAGRAPHS);
  const [randomize, setRandomize] = useState(false);

  const { albumKey, placeholder } = useRandomAlbum();
  const album = albumMeta[albumKey];

  const normalizedParagraphs = numParagraphs.trim() || FALLBACK_PARAGRAPHS;

  const { data, isFetching, isError, error, refetch } = useLyricsQuery({
    numberOfParagraphs: normalizedParagraphs,
    randomize,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void refetch();

    // On small screens the sheet sits below the form — bring it into view
    if (window.matchMedia('(max-width: 899px)').matches) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelector('.output-section')?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const getOutputText = (): string => {
    if (isFetching) return 'Spinning the records…';
    if (isError)
      return `Something went wrong: ${error?.message || 'failed to fetch lyrics'}. Hit generate to try again.`;
    if (data) return data.join('\n\n');
    return '';
  };

  const wordCount = data ? data.join(' ').trim().split(/\s+/).filter(Boolean).length : 0;
  const stats =
    data && !isFetching && !isError
      ? `${data.length} ${data.length === 1 ? 'paragraph' : 'paragraphs'} · ${wordCount} ${
          wordCount === 1 ? 'word' : 'words'
        }`
      : undefined;

  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <span className="ticker-group" key={copy}>
              {albumNames.map((key) => (
                <span className="ticker-item" key={key}>
                  {albumMeta[key].title}
                  <span className="ticker-star">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="webpage">
        <header>
          <div className="masthead-rule">
            <span>The Placeholder Press</span>
            <span>Vol. 13 · № 89</span>
          </div>
          <h1>
            Taylor <em>Ipsum</em>
          </h1>
          <p className="subtitle">placeholder text, but make it Taylor</p>
        </header>

        <main className="container">
          <div className="control-column">
            <GeneratorForm
              numParagraphs={numParagraphs}
              randomize={randomize}
              isLoading={isFetching}
              onNumParagraphsChange={setNumParagraphs}
              onRandomizeChange={setRandomize}
              onSubmit={handleSubmit}
            />

            <figure className="polaroid">
              <span className="polaroid-tape" aria-hidden="true" />
              <img src={`/images/${albumKey}.jpg`} alt={`${album.title} album cover`} />
              <figcaption>
                {album.title}, {album.year}
              </figcaption>
            </figure>
          </div>

          <LyricsOutput
            placeholder={placeholder}
            value={getOutputText()}
            isLoading={isFetching}
            stats={stats}
          />
        </main>

        <footer>
          <a
            href="https://github.com/sarbor/taylor_swift_api"
            target="_blank"
            rel="noreferrer"
          >
            Powered by the Taylor Swift API ↗
          </a>
          <span>long story short, it&rsquo;s placeholder text</span>
        </footer>
      </div>
    </>
  );
}
