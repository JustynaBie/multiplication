import { useTranslation } from '../i18n';
import styles from './style.module.css';
import type { IProgressBarProps } from './types';

export const ProgressBar = ({ solved, total }: IProgressBarProps) => {
  const { t } = useTranslation();
  const fill = { width: `${(solved / total) * 100}%` };

  return (
    <section className={styles.progress}>
      <div className={styles.top}>
        <h2 className={styles.title}>{t.progressTitle}</h2>
        <span className={styles.count}>{`${solved}/${total}`}</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={solved}
      >
        <div className={styles.fill} style={fill} />
      </div>
      <p className={styles.hint}>{t.progressLeft(total - solved)}</p>
    </section>
  );
};
