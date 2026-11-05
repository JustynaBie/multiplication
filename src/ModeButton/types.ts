import type { ReactNode } from 'react';

export interface IModeButtonProps {
  label: string;
  icon: ReactNode;
  isDisabled: boolean;
  onStart: () => void;
}
