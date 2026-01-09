type LyricsOutputProps = {
  value: string;
  placeholder: string;
};

export function LyricsOutput({ value, placeholder }: LyricsOutputProps) {
  return (
    <textarea
      id="generated-text"
      placeholder={placeholder}
      value={value}
      readOnly
    />
  );
}
