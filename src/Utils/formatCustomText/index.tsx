import { h } from 'preact';

export const formatCustomText = (text: string): (h.JSX.Element | string)[] => {
  const keySelector = /(\[.*\])/;
  const allNonAlphanumericSelector = /[^\w]/g;

  const parts = text.split(keySelector);

  return parts.map((part) => {
    if (part.match(keySelector)) {
      const keyName = part.replace(allNonAlphanumericSelector, '');

      return <div className="key">{keyName}</div>;
    }

    return part;
  });
};
