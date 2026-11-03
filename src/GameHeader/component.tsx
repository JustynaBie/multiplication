import styles from './style.module.css';
import type { IGameHeaderProps } from './types';

export const GameHeader = ({ numbers, onExit, children }: IGameHeaderProps) => (
  <header className={styles.header}>
    <button
      type="button"
      className={styles.back}
      aria-label="Wróć"
      onClick={onExit}
    >
      ←
    </button>
    {numbers.map(number => (
      <span key={number} className={styles.number}>{number}</span>
    ))}
    {children}
  </header>
);
