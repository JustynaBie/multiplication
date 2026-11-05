import { useModeButton } from './controller';
import styles from './style.module.css';
import type { IModeButtonProps } from './types';

// aria-disabled instead of disabled, so a tap on a grey tile can still show its name
export const ModeButton = (props: IModeButtonProps) => {
  const {
    isHintVisible,
    enter,
    leave,
    press,
    release,
    click,
    blockContextMenu,
  } = useModeButton(props);

  return (
    <div className={styles.wrapper}>
      {isHintVisible && <span className={styles.hint} role="tooltip">{props.label}</span>}
      <button
        type="button"
        className={styles.mode}
        aria-label={props.label}
        aria-disabled={props.isDisabled}
        onPointerEnter={enter}
        onPointerLeave={leave}
        onPointerDown={press}
        onPointerUp={release}
        onPointerCancel={release}
        onClick={click}
        onContextMenu={blockContextMenu}
      >
        {props.icon}
      </button>
    </div>
  );
};
