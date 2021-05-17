import { FunctionComponent, h } from 'preact';

import { GameContextProvider } from '@Contexts/GameContext';
import { useGameContext } from '@Hooks';
import { GameScreen, ResultScreen, StartScreen } from '@Screens';
import { GameStatus } from '@Types';

const AppSlug: FunctionComponent = () => {
  const { status } = useGameContext();

  if (status === GameStatus.READY) return <StartScreen />;
  if (status === GameStatus.STARTED) return <GameScreen />;

  return <ResultScreen />;
};

export const App: FunctionComponent = () => (
  <GameContextProvider>
    <AppSlug />
  </GameContextProvider>
);
