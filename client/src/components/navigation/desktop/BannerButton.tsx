import * as React from 'react';
import { Col } from 'reactstrap';

interface BannerButtonProps {
  selection: number | 'prev' | 'next';
  onClick(selection: number | 'prev' | 'next'): void;
}

const BannerButton: React.SFC<BannerButtonProps> = props => {
  const handleClick = (): void => {
    props.onClick(props.selection);
  };

  return (
    <Col className="crl-ban-button" onClick={handleClick}>
      {props.children}
    </Col>
  );
};

export { BannerButton };
