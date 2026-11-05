import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react';

import type { IModeButtonProps } from './types';

const LONG_PRESS_DURATION = 450;
const HINT_DURATION = 1500;

const checkMouse = (event: PointerEvent) => event.pointerType === 'mouse';

/*
 * Mouse: hover shows the name. Touch: holding ~450ms shows it and swallows the click.
 * A plain tap starts the game; on a disabled tile it only shows the name.
 */
export const useModeButton = ({ isDisabled, onStart }: IModeButtonProps) => {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const pressTimer = useRef<number | undefined>(undefined);
  const hideTimer = useRef<number | undefined>(undefined);
  const isLongPress = useRef(false);

  const showHintBriefly = useCallback(() => {
    clearTimeout(hideTimer.current);
    setIsHintVisible(true);
    hideTimer.current = window.setTimeout(() => setIsHintVisible(false), HINT_DURATION);
  }, []);

  const enter = useCallback((event: PointerEvent) => {
    if (checkMouse(event)) setIsHintVisible(true);
  }, []);

  const leave = useCallback((event: PointerEvent) => {
    if (checkMouse(event)) setIsHintVisible(false);
  }, []);

  const press = useCallback((event: PointerEvent) => {
    if (checkMouse(event)) return;

    isLongPress.current = false;
    pressTimer.current = window.setTimeout(() => {
      isLongPress.current = true;
      showHintBriefly();
    }, LONG_PRESS_DURATION);
  }, [showHintBriefly]);

  const release = useCallback(() => clearTimeout(pressTimer.current), []);

  const click = useCallback(() => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    if (isDisabled) {
      showHintBriefly();
      return;
    }

    onStart();
  }, [isDisabled, onStart, showHintBriefly]);

  // Long press would otherwise open the system menu on phones
  const blockContextMenu = useCallback((event: MouseEvent) => event.preventDefault(), []);

  useEffect(() => () => {
    clearTimeout(pressTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  return {
    isHintVisible,
    enter,
    leave,
    press,
    release,
    click,
    blockContextMenu,
  };
};
