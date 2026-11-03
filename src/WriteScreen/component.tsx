import { GameHeader } from '../GameHeader';
import { useWriteScreen } from './controller';
import styles from './style.module.css';
import type { IWriteScreenProps } from './types';

export const WriteScreen = (props: IWriteScreenProps) => {
  const {
    question,
    fieldState,
    fieldValue,
    isDone,
    isRevealing,
    isWrong,
    isCheckDisabled,
    progress,
    change,
    check,
  } = useWriteScreen(props);

  return (
    <main className={styles.screen}>
      <GameHeader numbers={props.numbers} onExit={props.onExit} />

      {isDone
        ? (
          <section className={styles.content}>
            <p className={styles.done}>Brawo!</p>
            <p>Wszystkie działania zrobione</p>
            <button type="button" className={styles.button} onClick={props.onExit}>
              Koniec
            </button>
          </section>
        )
        : (
          <form className={styles.content} onSubmit={check}>
            <p className={styles.progress}>{progress}</p>
            <div className={styles.equation}>
              <span>{`${question.equation.left} × ${question.equation.right} =`}</span>
              {/* Read-only instead of disabled while revealing, so the phone keyboard stays open */}
              <input
                className={styles.field}
                data-state={fieldState}
                value={fieldValue}
                onChange={change}
                readOnly={isRevealing}
                inputMode="numeric"
                maxLength={3}
                autoComplete="off"
                autoFocus
                aria-label="Wynik"
              />
              {isWrong && <span className={styles.solution}>{question.equation.result}</span>}
            </div>
            <button type="submit" className={styles.button} disabled={isCheckDisabled}>
              Sprawdź
            </button>
          </form>
        )}
    </main>
  );
};
