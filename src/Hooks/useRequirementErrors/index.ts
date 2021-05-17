import { useEffect, useState } from 'preact/hooks';

import { useMicrophone, useRecognition, useSpeech } from '@Hooks';

export const useRequirementErrors = (): string[] => {
  const recognition = useRecognition();
  const microphone = useMicrophone();
  const speech = useSpeech();

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const nextErrors: string[] = [];

    if (recognition.error) nextErrors.push(recognition.error);
    if (microphone.error) nextErrors.push(microphone.error);
    if (speech.error) nextErrors.push(speech.error);

    setErrors(nextErrors);
  }, [microphone.error, speech.error, recognition.error]);

  return errors;
};
