import { GAME_MODES } from '../game';
import { useConfigScreen } from './controller';
import { ArrowsIcon, ClickIcon, PencilIcon } from './icons';
import styles from './style.module.css';
import type { IConfigScreenProps } from './types';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ConfigScreen = (props: IConfigScreenProps) => {
  const {
    selected,
    toggle,
    start,
    isStartDisabled,
    isMatchDisabled,
  } = useConfigScreen(props);

  return (
    <main className={styles.screen}>
      <div className={styles.numbers}>
        {NUMBERS.map(number => (
          <button
            key={number}
            type="button"
            className={styles.number}
            aria-pressed={selected.includes(number)}
            onClick={() => toggle(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <div className={styles.modes}>
        <button
          type="button"
          className={styles.mode}
          aria-label="Łączenie działań z wynikami"
          disabled={isMatchDisabled}
          onClick={() => start(GAME_MODES.match)}
        >
          <ArrowsIcon />
        </button>

        <button
          type="button"
          className={styles.mode}
          aria-label="Wybieranie dobrej odpowiedzi"
          disabled={isStartDisabled}
          onClick={() => start(GAME_MODES.pick)}
        >
          <ClickIcon />
        </button>

        <button
          type="button"
          className={styles.mode}
          aria-label="Wpisywanie wyników"
          disabled={isStartDisabled}
          onClick={() => start(GAME_MODES.write)}
        >
          <PencilIcon />
        </button>
      </div>
    </main>
  );
};
