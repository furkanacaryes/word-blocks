import { FunctionComponent, h } from 'preact';

import { Button, Screen } from '@Components';
import { useGameContext, useRequirementErrors } from '@Hooks';
import { formatCustomText } from '@Utils';

import './styles.css';

const rules = [
  `Arkaplan rengini beğenmemişsen; yenile.`,
  `Gördüğün kelimenin son harfiyle bir kelime söylemelisin.`,
  `Sıran geldiğinde [space] ile duraklat; kelimeni söyle.`,
  `Kullanılan kelimeleri söyleme. Bilgisayarın seçtikleri dahil.`,
  `Her tur 8 saniye sürecek`,
  `Sen başlıyorsun`,
];

export const StartScreen: FunctionComponent = () => {
  const { startGame } = useGameContext();
  const requirementErrors = useRequirementErrors();

  const renderErrors = () => {
    const hasErrors = requirementErrors.length > 0;

    return (
      hasErrors && (
        <div className="error-stack">
          {requirementErrors.map((error, index) => (
            <div key={`error--${index}`} className="error-stack__item">
              {error}
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <Screen centered randomBgColor>
      {renderErrors()}

      <h1>Kelime Zinciri</h1>

      <div>
        <h2>Nasıl oynanır?</h2>

        <ol className="rules-list">
          {rules.map((rule, index) => (
            <li key={`rule--${index}`} className="rules-list__item">
              <div className="rules-list__item__content">{formatCustomText(rule)}</div>
            </li>
          ))}
        </ol>
      </div>

      <Button
        text="Yuvarlanarak Başla!"
        onClick={startGame}
        disabled={!!requirementErrors.length}
      />
    </Screen>
  );
};
