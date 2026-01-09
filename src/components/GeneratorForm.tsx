import type { FormEventHandler } from 'react';

type GeneratorFormProps = {
  numParagraphs: string;
  randomize: boolean;
  onNumParagraphsChange: (value: string) => void;
  onRandomizeChange: (value: boolean) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function GeneratorForm({
  numParagraphs,
  randomize,
  onNumParagraphsChange,
  onRandomizeChange,
  onSubmit,
}: GeneratorFormProps) {
  return (
    <form id="generator-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label htmlFor="paragraphs">Number of Paragraphs:</label>
        <input
          type="number"
          id="paragraphs"
          name="paragraphs"
          min="1"
          max="1597"
          value={numParagraphs}
          onChange={(event) => onNumParagraphsChange(event.target.value)}
        />

        <label htmlFor="randomize">Randomize:</label>
        <input
          type="checkbox"
          id="randomize"
          name="randomize"
          checked={randomize}
          onChange={(event) => onRandomizeChange(event.target.checked)}
        />
      </div>

      <div className="form-row">
        <button type="submit">Generate</button>
      </div>
    </form>
  );
}
