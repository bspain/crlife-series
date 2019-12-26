import * as React from 'react';
import './Textsize.scss';
import textsizeUpSvg from './textsize-up.svg';

const Textsize: React.SFC<{ onClick(): void }> = props => {
  const classValue = `textsize-icon`;

  const onClickHander = (): void => {
    props.onClick();
  };

  return (
    <div
      className={classValue}
      onClick={onClickHander}
      dangerouslySetInnerHTML={{ __html: textsizeUpSvg }}
    />
  );
};

export { Textsize };
