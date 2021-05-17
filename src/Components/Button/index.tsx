import { FunctionComponent, h } from 'preact';

import './styles.css';

type ButtonProps = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({ children, text, disabled, ...props }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''}`}
      disabled={disabled}
      {...props}
    >
      {text || children}
    </button>
  );
};
