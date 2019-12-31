import * as React from 'react';
import { Col } from 'reactstrap';

interface BannerButtonProps {
    selection: number;
    onClick(selection: number): void;
}

const BannerButton: React.SFC<BannerButtonProps> = props => {
    const handleClick = (): void => {
      props.onClick(props.selection);
    };
  
    return (
      <Col key={`crl-ban-button-${props.selection}`} className="crl-ban-button" onClick={handleClick}>{props.children}</Col>
    );
  };
  
  export { BannerButton }; 