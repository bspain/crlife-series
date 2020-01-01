import * as React from 'react';
import { Col } from 'reactstrap';

interface NavigationButtonProps {
  selection: number | 'prev' | 'next';
  onClick(selection: number | 'prev' | 'next'): void;
}

const NavigationButton: React.SFC<NavigationButtonProps> = props => {
  const handleClick = (): void => {
    props.onClick(props.selection);
  };

  return (
    <Col onClick={handleClick}>
      <div className="crl-nav-button text-center">{props.children}</div>
    </Col>
  );
};

export { NavigationButton };
