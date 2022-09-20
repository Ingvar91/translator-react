import React, { FC, MouseEventHandler } from 'react';
import styles from './dropdown.module.scss';

interface DropdownItemProps {
  children?: JSX.Element;
  click?: MouseEventHandler<HTMLElement>;
}

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { children, click } = props;

  return (
    <div className={`${styles.dropdown_item}`} onClick={click}>
      {children}
    </div>
  );
};

export default DropdownItem;
