/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { Screen, Time } from '@Components';
import { useCountdown, useGameContext, useRecognition, useSpeech, useWords } from '@Hooks';
import { GameStatus, Player } from '@Types';
import { getRandomNumber, selectRandomIn, sleep } from '@Utils';

import './styles.css';

export const GameScreen: FunctionComponent = () => {
  const words = useWords();
  const { speak } = useSpeech();
  const { setGameResult } = useGameContext();
  const { startListening, isListening, abortListening } = useRecognition();

  const [{ currentPlayer, usedWords, currentWord }, setState] = useState<{
    currentPlayer: Player;
    usedWords: string[];
    currentWord: string;
  }>(() => {
    const initialWord = selectRandomIn(words);

    return {
      currentPlayer: Player.Human,
      currentWord: initialWord,
      usedWords: [initialWord],
    };
  });

  const isHuman = (player: Player) => player === Player.Human;

  const endGame = useCallback(() => {
    const status = isHuman(currentPlayer) ? GameStatus.LOST : GameStatus.WON;

    setGameResult({ status, totalElapsed: countdown.totalElapsed, wordCount: usedWords.length });
  }, [currentPlayer, usedWords]);

  const countdown = useCountdown({
    duration: 8_000,
    frequency: 100,
    onEnd: endGame,
  });

  const doesChain = useCallback(
    (next: string, tail = currentWord) => {
      const lastChar = tail.slice(-1);

      return next.startsWith(lastChar);
    },
    [currentWord],
  );

  const findComputerAnswer = () => {
    const didPassThirdRound = usedWords.length > 6;

    const shouldFail = didPassThirdRound && Math.random() < 0.3;

    if (shouldFail) {
      const incorrectWords = words.filter((word) => !doesChain(word) || usedWords.includes(word));

      return selectRandomIn(incorrectWords);
    }

    const correctWords = words.filter((word) => doesChain(word) && !usedWords.includes(word));

    return selectRandomIn(correctWords);
  };

  const validateWord = useCallback(
    (word: string) => {
      const isWord = !word.includes(' ');
      const doesItChain = doesChain(word.toLocaleLowerCase('tr'));
      const isNotUsed = !usedWords.includes(word);

      return isWord && doesItChain && isNotUsed;
    },
    [doesChain, usedWords],
  );

  const endTurn = useCallback(
    (word: string) => {
      const isValid = validateWord(word);

      if (isValid) {
        setState((prev) => ({
          ...prev,
          currentPlayer: isHuman(prev.currentPlayer) ? Player.Computer : Player.Human,
          currentWord: word,
          usedWords: [...prev.usedWords, word],
        }));

        countdown.lapse();
      } else {
        endGame();
      }
    },
    [validateWord],
  );

  const playComputer = useCallback(async (): Promise<void> => {
    const answer = findComputerAnswer();

    const fakeThinkingDuration = getRandomNumber(2_000, 4_000);

    await sleep(fakeThinkingDuration);

    countdown.pause();
    await speak(answer);

    endTurn(answer);
  }, [endTurn]);

  const spaceButtonListener = useCallback(
    async ({ key }: KeyboardEvent) => {
      if (key === ' ') {
        startListening()
          .then((word) => endTurn(word))
          .catch(abortListening);
      }
    },

    [endTurn],
  );

  useEffect(() => {
    countdown.start();
  }, []);

  useEffect(() => {
    if (isListening) countdown.pause();
    else countdown.start();
  }, [isListening]);

  useEffect(() => {
    if (isHuman(currentPlayer)) {
      addEventListener('keydown', spaceButtonListener);

      return () => removeEventListener('keydown', spaceButtonListener);
    }
  }, [currentPlayer, spaceButtonListener]);

  useEffect(() => {
    if (!isHuman(currentPlayer)) playComputer();
  }, [currentPlayer, playComputer]);

  return (
    <Screen centered randomBgColor>
      <div class={`current-word ${isListening ? 'is-listening' : ''}`}>{currentWord}</div>

      <div class="ticker">
        <Time
          seconds={countdown.remaining.seconds}
          milliseconds={countdown.remaining.milliseconds}
        />
      </div>
    </Screen>
  );
};
