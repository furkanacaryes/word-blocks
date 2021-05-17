import { GameStatus } from '@Types';
import { GameAction, GameStateReducer } from './types';

export const initialState = {
  status: GameStatus.READY,
  wordCount: 0,
};

export const reducer: GameStateReducer = (state, action) => {
  switch (action.type) {
    case GameAction.StartGame:
      return {
        ...state,
        status: GameStatus.STARTED,
      };
    case GameAction.EndGame:
      return {
        ...state,
        ...action.payload,
      };
    case GameAction.ResetGame:
      return initialState;
    default:
      return state;
  }
};
