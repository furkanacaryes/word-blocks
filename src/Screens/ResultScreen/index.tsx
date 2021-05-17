import { FunctionComponent, h } from 'preact';

import { Button, Screen, Time } from '@Components';
import { useGameContext } from '@Hooks';
import { GameStatus } from '@Types';

import './styles.css';

export const ResultScreen: FunctionComponent = () => {
  const { status, wordCount, totalElapsed, resetGame } = useGameContext();

  const hasWon = status === GameStatus.WON;

  return (
    <Screen centered randomBgColor>
      <h1>{hasWon ? 'KAZANDIN!' : 'KAYBETTİN!'}</h1>

      {totalElapsed && (
        <div className="stat">
          <div className="stat__box">
            <div className="stat__box__text">
              <Time {...totalElapsed} withUnits />
            </div>
          </div>

          <div className="stat__text">içinde</div>
        </div>
      )}

      <div className="stat">
        <div className="stat__text">toplam</div>

        <div className="stat__box">
          <div className="stat__box__text">{wordCount}</div>
        </div>

        <div className="stat__text">kelime kullanıldı.</div>
      </div>

      <Button text="Tekrar" onClick={resetGame} />
    </Screen>
  );
};
