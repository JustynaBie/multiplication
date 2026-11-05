import { GAME_MODES } from '../game';
import { LanguagePicker } from '../LanguagePicker';
import { ModeButton } from '../ModeButton';
import { useConfigScreen } from './controller';
import { MatchIcon, PickIcon, WriteIcon } from './icons';
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
    t,
  } = useConfigScreen(props);

  return (
    <main className={styles.screen}>
      <LanguagePicker />

      <section className={styles.choose}>
        <h1 className={styles.title}>{t.chooseTitle}</h1>
        <p className={styles.hint}>{t.chooseHint}</p>
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
      </section>

      <div className={styles.modes}>
        <ModeButton
          label={t.matchMode}
          icon={<MatchIcon />}
          isDisabled={isMatchDisabled}
          onStart={() => start(GAME_MODES.match)}
        />
        <ModeButton
          label={t.pickMode}
          icon={<PickIcon />}
          isDisabled={isStartDisabled}
          onStart={() => start(GAME_MODES.pick)}
        />
        <ModeButton
          label={t.writeMode}
          icon={<WriteIcon />}
          isDisabled={isStartDisabled}
          onStart={() => start(GAME_MODES.write)}
        />
      </div>
    </main>
  );
};
