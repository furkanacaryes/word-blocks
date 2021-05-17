import { useContext } from 'preact/hooks';

import { GameContext, GameContextValue } from '@Contexts/GameContext';

export const useGameContext = (): GameContextValue => {
  return useContext(GameContext);
};
