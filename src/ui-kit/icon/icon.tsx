import React, { FC } from 'react';
import styles from './icon.module.scss';

interface IconProps {
  icon: string | undefined | null;
  fontSize?: number;
  className?: string;
  title?: string;
  click?: React.MouseEventHandler<HTMLElement>;
}

const Icon: FC<IconProps> = (props) => {
  const { icon, fontSize = 1, title, click, className = '' } = props;
  let svg: Element | null;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (click) {
      click(e);
    }
  };

  if (icon) {
    svg = document.createRange().createContextualFragment(icon).firstElementChild!;
    const viewBoxArray = String(svg.getAttribute('viewBox')).split(' ');
    const width = Number(viewBoxArray[2]);
    const height = Number(viewBoxArray[3]);

    let widthSvg = '1em';
    if (width > height) {
      widthSvg = `${width / height}em`;
    }
    svg.setAttribute('width', widthSvg);

    let heightSvg = '1em';
    if (height > width) {
      heightSvg = `${height / width}em`;
    }
    svg.setAttribute('height', heightSvg);

    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('font-size', `${fontSize}rem`);
  }

  const innerHtml = () => {
    return { __html: svg?.outerHTML || '' };
  };

  return (
    <span
      title={title}
      className={`${className} ${styles.container}`}
      onClick={onClick}
      dangerouslySetInnerHTML={innerHtml()}
    ></span>
  );
};

export default Icon;
