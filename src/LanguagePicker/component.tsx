import { useLanguagePicker } from './controller';
import styles from './style.module.css';

export const LanguagePicker = () => {
  const {
    rootRef,
    isOpen,
    currentFlag,
    options,
    label,
    toggle,
    choose,
  } = useLanguagePicker();

  return (
    <div ref={rootRef} className={styles.picker}>
      <button
        type="button"
        className={styles.current}
        aria-label={label}
        aria-expanded={isOpen}
        onClick={toggle}
      >
        {currentFlag}
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(({ language, flag, name, isActive }) => (
            <li key={language}>
              <button
                type="button"
                className={styles.option}
                aria-label={name}
                aria-pressed={isActive}
                onClick={() => choose(language)}
              >
                {flag}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
