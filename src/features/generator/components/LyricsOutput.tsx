import { CopyButton } from './CopyButton';

type LyricsOutputProps = {
  value: string;
  placeholder: string;
};

export function LyricsOutput({ value, placeholder }: LyricsOutputProps) {
  return (
    <div className="output-section">
      <label className="output-label">Generated Lyrics</label>
      <div className="textarea-wrapper">
        <CopyButton text={value} />
        <textarea
          id="generated-text"
          placeholder={placeholder}
          value={value}
          readOnly
        />
      </div>
    </div>
  );
}
