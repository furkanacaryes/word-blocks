import { createContext, FunctionComponent, h } from 'preact';
import { useReducer } from 'preact/hooks';

import { initialState, reducer } from './reducer';
import { GameAction, GameContextValue, GameState } from './types';

export const GameContext = createContext<GameContextValue>({} as GameContextValue);

export const GameContextProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = () => dispatch({ type: GameAction.StartGame });

  const resetGame = () => dispatch({ type: GameAction.ResetGame });

  const setGameResult = (payload: Partial<GameState>) => {
    dispatch({ payload, type: GameAction.EndGame });
  };

  const returnValue = {
    ...state,
    resetGame,
    setGameResult,
    startGame,
  };

  return <GameContext.Provider value={returnValue}>{children}</GameContext.Provider>;
};
