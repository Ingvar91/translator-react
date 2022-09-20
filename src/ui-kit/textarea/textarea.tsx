import React, { ChangeEvent, FC } from 'react';
import styles from './textarea.module.scss';

interface TextareaProps {
  text: string;
  maxLength: number;
  change: (text: string) => void;
}

const Textarea: FC<TextareaProps> = ({ text, change, maxLength = 300 }) => {
  const onTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    change(String(event?.target.value).substring(0, maxLength));
  };

  return (
    <div className={styles.textarea_container}>
      <textarea className={styles.textarea} value={text} onChange={onTextarea}></textarea>
      <span className={styles.textarea_max_length}>
        {text?.length || 0}/{maxLength}
      </span>
    </div>
  );
};

export default Textarea;
