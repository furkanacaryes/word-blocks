import { FunctionComponent, h } from 'preact';

import './styles.css';

type ButtonProps = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({ children, text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text || children}
    </button>
  );
};
