import * as React from 'react';
import { Col } from 'reactstrap';

const NavigationButton: React.SFC = props => {
  return (
    <Col>
      <div className="crl-nav-button text-center">{props.children}</div>
    </Col>
  );
};

export { NavigationButton };
