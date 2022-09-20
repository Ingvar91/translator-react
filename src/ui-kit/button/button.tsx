import React, { FC } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';

interface ButtonProps {
  text?: string;
  click?: React.MouseEventHandler<HTMLElement>;
  type?: ButtonType;
  outline?: ButtonType;
}

const Button: FC<ButtonProps> = (props) => {
  const { type = 'primary', click, text, outline } = props;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (click) {
      click(e);
    }
  };

  const className = classNames({
    [`${styles.btn}`]: true,
    [`${styles[`btn_${type}`]}`]: type && !outline,
    [`${styles[`btn_outline_${outline}`]}`]: outline,
  });

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
