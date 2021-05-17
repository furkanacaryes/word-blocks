import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import './styles.css';

type ScreenProps = {
  centered?: boolean;
  randomBgColor?: boolean;
};

// * Extract to `@Utils`
const generateBgColor = () => {
  const rgb = ['r', 'g', 'b'].map(() => Math.floor(Math.random() * 255));

  return {
    style: {
      backgroundColor: `rgb(${rgb.join(',')})`,
    },
  };
};

export const Screen: FunctionComponent<ScreenProps> = ({ children, centered, randomBgColor }) => {
  const bgColor = useMemo(() => (randomBgColor ? generateBgColor() : undefined), [randomBgColor]);

  return (
    <section className={`screen ${centered ? 'centered' : ''}`} {...bgColor}>
      {children}
    </section>
  );
};
