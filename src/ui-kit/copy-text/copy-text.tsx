import React, { FC } from 'react';
import { IconCopy } from '../icon/icons/iconCopy';
import Icon from '../icon/icon';
import styles from './copy-text.module.scss';

interface CopyTextProps {
  text: string;
}

const CopyText: FC<CopyTextProps> = (props) => {
  const { text } = props;

  const iconCopy = IconCopy;

  const onCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text).then();
    }
  };

  return <Icon title="Копировать" className={styles.icon} icon={iconCopy} fontSize={1.6} click={onCopy} />;
};

export default CopyText;
