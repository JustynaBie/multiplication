import { Celebration } from '../Celebration';
import { GameHeader } from '../GameHeader';
import { ProgressBar } from '../ProgressBar';
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
    solved,
    total,
    change,
    check,
    t,
  } = useWriteScreen(props);

  return (
    <main className={styles.screen}>
      <GameHeader numbers={props.numbers} onExit={props.onExit} />
      {!isDone && <ProgressBar solved={solved} total={total} />}

      {isDone
        ? <Celebration actionLabel={t.finish} onAction={props.onExit} />
        : (
          <form className={styles.content} onSubmit={check}>
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
                placeholder="?"
                aria-label={t.result}
              />
              <span className={styles.solution} data-visible={isWrong}>
                {question.equation.result}
              </span>
            </div>
            <button type="submit" className={styles.button} disabled={isCheckDisabled}>
              {t.check}
            </button>
          </form>
        )}
    </main>
  );
};
