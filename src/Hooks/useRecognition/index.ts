import { useEffect, useState } from 'preact/hooks';

import { isSupported, recognition } from './recognition';

type Recognition = {
  isSupported: boolean;
  isListening: boolean;
  startListening: () => Promise<string>;
  abortListening: () => void;
};

export const useRecognition = (): Recognition => {
  const [isListening, setListening] = useState(false);

  const extractWord = ({ results }: SpeechRecognitionEvent) => {
    return results[0][0].transcript;
  };

  const abortListening = () => recognition.abort();

  const startListening = async (): Promise<string> => {
    if (isListening) recognition.abort();

    return new Promise((resolve, reject) => {
      recognition.onerror = () => reject('Error occurred in recognition');
      recognition.onnomatch = () => reject("I didn't recognise that word.");
      recognition.onresult = (event) => resolve(extractWord(event));

      recognition.start();
    });
  };

  const onMount = () => {
    recognition.onaudioend = () => setListening(false);
    recognition.onaudiostart = () => setListening(true);
  };

  useEffect(() => {
    onMount();
  }, []);

  return {
    abortListening,
    isListening,
    isSupported,
    startListening,
  };
};
