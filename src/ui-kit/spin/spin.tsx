import React, { FC } from 'react';
import Icon from '../icon/icon';
import { IconSpinnerThird } from '../icon/icons/iconSpinnerThird';
import styles from './spin.module.scss';

interface SpinProps {
  fontSize?: number;
}

const Spin: FC<SpinProps> = (props) => {
  const { fontSize } = props;
  const icon = IconSpinnerThird;

  return (
    <Icon className={styles.spin} icon={icon} fontSize={fontSize} />
  );
};

export default Spin;
