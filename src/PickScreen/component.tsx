import { Celebration } from '../Celebration';
import { GameHeader } from '../GameHeader';
import { usePickScreen } from './controller';
import styles from './style.module.css';
import type { IPickScreenProps } from './types';

export const PickScreen = (props: IPickScreenProps) => {
  const {
    question,
    options,
    isDone,
    isRevealing,
    progress,
    pick,
    t,
  } = usePickScreen(props);

  return (
    <main className={styles.screen}>
      <GameHeader numbers={props.numbers} onExit={props.onExit} />

      {isDone
        ? <Celebration actionLabel={t.finish} onAction={props.onExit} />
        : (
          <section className={styles.content}>
            <p className={styles.progress}>{progress}</p>
            <p className={styles.equation}>
              {`${question.equation.left} × ${question.equation.right} = ?`}
            </p>
            <div className={styles.options}>
              {options.map(({ value, state }) => (
                <button
                  key={value}
                  type="button"
                  className={styles.option}
                  data-state={state}
                  disabled={isRevealing}
                  onClick={() => pick(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </section>
        )}
    </main>
  );
};
