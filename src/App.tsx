import { useState } from 'react';

import { ConfigScreen } from './ConfigScreen';
import { GAME_MODES, type IGameSettings } from './game';
import { MatchGame } from './MatchGame';
import { PickScreen } from './PickScreen';
import { WriteScreen } from './WriteScreen';

const SCREENS = {
  [GAME_MODES.match]: MatchGame,
  [GAME_MODES.pick]: PickScreen,
  [GAME_MODES.write]: WriteScreen,
};

const App = () => {
  const [settings, setSettings] = useState<IGameSettings | null>(null);

  const exit = () => setSettings(null);

  if (!settings) return <ConfigScreen onStart={setSettings} />;

  const Screen = SCREENS[settings.mode];

  return <Screen numbers={settings.numbers} onExit={exit} />;
};

export default App;
