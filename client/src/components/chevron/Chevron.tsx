import * as React from 'react';
import './Chevron.scss';
import chevronUpSvg from './chevron-up.svg';

const Chevron: React.SFC<{ direction: 'up' | 'down'; onClick(): void }> = props => {
  const classValue = `chevron ${props.direction}`;

  const onClickHander = (): void => {
    props.onClick();
  };

  return (
    <div
      className={classValue}
      onClick={onClickHander}
      dangerouslySetInnerHTML={{ __html: chevronUpSvg }}
    />
  );
};

export { Chevron };
