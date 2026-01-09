type LyricsOutputProps = {
  value: string;
  placeholder: string;
};

export function LyricsOutput({ value, placeholder }: LyricsOutputProps) {
  return (
    <div className="output-section">
      <label className="output-label">Generated Lyrics</label>
      <textarea
        id="generated-text"
        placeholder={placeholder}
        value={value}
        readOnly
      />
    </div>
  );
}
