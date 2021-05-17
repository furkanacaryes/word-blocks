import { Reducer } from 'preact/hooks';

import { Action, Clock, GameStatus } from '@Types';

export enum GameAction {
  StartGame,
  EndGame,
  ResetGame,
}

export type GameState = {
  totalElapsed?: Clock;
  status: GameStatus;
  wordCount: number;
};

export type GameContextValue = GameState & {
  startGame: () => void;
  resetGame: () => void;
  setGameResult: (payload: GameState) => void;
};

export type GameStateReducer = Reducer<GameState, Action<GameAction, Partial<GameState>>>;
