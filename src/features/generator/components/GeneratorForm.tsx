import type { FormEventHandler } from 'react';
import { MAX_PARAGRAPHS, MIN_PARAGRAPHS } from '../../../config';

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
        <div className="input-group">
          <label htmlFor="paragraphs">Paragraphs</label>
          <input
            type="number"
            id="paragraphs"
            name="paragraphs"
            min={MIN_PARAGRAPHS}
            max={MAX_PARAGRAPHS}
            value={numParagraphs}
            onChange={(event) => onNumParagraphsChange(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="randomize">Randomize</label>
          <input
            type="checkbox"
            id="randomize"
            name="randomize"
            checked={randomize}
            onChange={(event) => onRandomizeChange(event.target.checked)}
          />
        </div>
      </div>

      <div className="button-row">
        <button type="submit">✨ Generate Lyrics</button>
      </div>
    </form>
  );
}
