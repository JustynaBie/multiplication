import { useCelebration } from './controller';
import styles from './style.module.css';
import type { ICelebrationProps } from './types';

export const Celebration = ({ actionLabel, onAction }: ICelebrationProps) => {
  const { gif, t } = useCelebration();

  return (
    <section className={styles.celebration}>
      <img className={styles.gif} src={gif} alt={t.catAlt} />
      <p className={styles.title}>{t.bravo}</p>
      <p className={styles.text}>{t.allDone}</p>
      <button type="button" className={styles.button} onClick={onAction}>
        {actionLabel}
      </button>
    </section>
  );
};
