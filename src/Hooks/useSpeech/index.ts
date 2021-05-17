import { useEffect, useRef } from 'preact/hooks';

type Speech = {
  speak: (text: string) => Promise<void>;
  isSupported: boolean;
};

export const useSpeech = (): Speech => {
  const isSupported = !!window.speechSynthesis;

  const utteranceRef = useRef(new SpeechSynthesisUtterance());

  const makeSureYeldaIsHere = () => {
    const utterance = utteranceRef.current;

    if (utterance.lang.match(/tr/i)) return;

    const defaultVoice = speechSynthesis.getVoices().find((voice) => voice.lang.match(/tr/i));

    if (defaultVoice) {
      utterance.voice = defaultVoice;
      utterance.lang = defaultVoice.lang;
    }
  };

  const speak = async (text: string): Promise<void> => {
    if (speechSynthesis.speaking) return;

    const utterance = utteranceRef.current;

    makeSureYeldaIsHere();

    utterance.text = text;

    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = () => reject(`Could NOT speak this: '${text}'`);

      speechSynthesis.speak(utterance);
    });
  };

  const onMount = () => {
    const utterance = utteranceRef.current;

    makeSureYeldaIsHere();

    utterance.volume = 1; // ?   0    -   1
    utterance.rate = 1; // ?     0.1  -  10
    utterance.pitch = 1.2; // ?    0    -   2
  };

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isSupported, speak };
};
