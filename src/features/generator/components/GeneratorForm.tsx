import type { FormEventHandler } from 'react';
import { FALLBACK_PARAGRAPHS, MAX_PARAGRAPHS, MIN_PARAGRAPHS } from '../../../config';

type GeneratorFormProps = {
  numParagraphs: string;
  randomize: boolean;
  isLoading: boolean;
  onNumParagraphsChange: (value: string) => void;
  onRandomizeChange: (value: boolean) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function GeneratorForm({
  numParagraphs,
  randomize,
  isLoading,
  onNumParagraphsChange,
  onRandomizeChange,
  onSubmit,
}: GeneratorFormProps) {
  const stepParagraphs = (delta: number) => {
    const parsed = parseInt(numParagraphs, 10);
    const current = Number.isNaN(parsed) ? Number(FALLBACK_PARAGRAPHS) : parsed;
    const next = Math.min(MAX_PARAGRAPHS, Math.max(MIN_PARAGRAPHS, current + delta));
    onNumParagraphsChange(String(next));
  };

  return (
    <form id="generator-form" onSubmit={onSubmit}>
      <p className="section-heading">Place your order</p>

      <div className="field">
        <label htmlFor="paragraphs">№ of paragraphs</label>
        <div className="stepper">
          <button
            type="button"
            className="step-btn"
            onClick={() => stepParagraphs(-1)}
            aria-label="One fewer paragraph"
          >
            −
          </button>
          <input
            type="number"
            id="paragraphs"
            name="paragraphs"
            min={MIN_PARAGRAPHS}
            max={MAX_PARAGRAPHS}
            value={numParagraphs}
            onChange={(event) => onNumParagraphsChange(event.target.value)}
          />
          <button
            type="button"
            className="step-btn"
            onClick={() => stepParagraphs(1)}
            aria-label="One more paragraph"
          >
            +
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="randomize">Shuffle the verses</label>
        <input
          type="checkbox"
          id="randomize"
          name="randomize"
          checked={randomize}
          onChange={(event) => onRandomizeChange(event.target.checked)}
        />
      </div>

      <button type="submit" className="ticket-btn" disabled={isLoading}>
        {isLoading ? 'Pressing the record…' : 'Generate lyrics ✦'}
      </button>
    </form>
  );
}
