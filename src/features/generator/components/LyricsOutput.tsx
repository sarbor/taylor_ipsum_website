import { CopyButton } from './CopyButton';

type LyricsOutputProps = {
  value: string;
  placeholder: string;
  isLoading: boolean;
  stats?: string;
};

export function LyricsOutput({ value, placeholder, isLoading, stats }: LyricsOutputProps) {
  const copyText = value.trim() ? value : placeholder;

  return (
    <section className="output-section">
      <p className="section-heading">The lyric sheet</p>
      <div className={`sheet${isLoading ? ' is-loading' : ''}`}>
        <span className="hole-strip" aria-hidden="true">
          <span className="sheet-hole" />
          <span className="sheet-hole" />
          <span className="sheet-hole" />
        </span>
        <CopyButton text={copyText} />
        <textarea
          id="generated-text"
          aria-label="Generated lyrics"
          aria-busy={isLoading}
          placeholder={placeholder}
          value={value}
          readOnly
        />
      </div>
      {stats ? <p className="sheet-meta">{stats}</p> : null}
    </section>
  );
}
