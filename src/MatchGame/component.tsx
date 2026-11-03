import { MatchScreen } from '../MatchScreen';
import { useMatchGame } from './controller';
import type { IMatchGameProps } from './types';

export const MatchGame = (props: IMatchGameProps) => {
  const { numbers, onExit } = props;
  const {
    level,
    hasLevels,
    hasNextLevel,
    goToNextLevel,
  } = useMatchGame(props);

  if (!hasLevels) return <MatchScreen numbers={numbers} onExit={onExit} />;

  const nextLevel = hasNextLevel
    ? goToNextLevel
    : undefined;

  // key gives each level a fresh board
  return (
    <MatchScreen
      key={level}
      numbers={numbers}
      level={level}
      onExit={onExit}
      onNextLevel={nextLevel}
    />
  );
};
