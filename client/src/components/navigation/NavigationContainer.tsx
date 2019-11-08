import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { NavigationItem } from '../../models/Models';
import { NavigationButton } from './NavigationButton';
import './NavigationContainer.scss';

interface NavigationContainerProps {
  items: NavigationItem[];
  expanded: boolean;
}

class NavigationContainer extends React.Component<NavigationContainerProps> {
  render(): JSX.Element {
    const navigationRows = this.props.items.map(item => {
      return (
        <Row key={`nav-button-${item.ref}`}>
          <NavigationButton>{`${item.value}`}</NavigationButton>
        </Row>
      );
    });

    return (
      <Container
        fluid={true}
        className={`crl-nav-container ${this.props.expanded ? 'expanded' : 'collapsed'}`}
      >
        {navigationRows}
        <div className="crl-nav-divider" />
        <Row className="crl-nav-pagenav">
          <NavigationButton>{'<'}</NavigationButton>
          <NavigationButton>{'>'}</NavigationButton>
        </Row>
      </Container>
    );
  }
}

export { NavigationContainer };
