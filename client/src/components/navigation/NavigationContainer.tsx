import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { NavigationButton } from './NavigationButton';
import './NavigationContainer.scss';

interface INagivationItem {
  ref: string;
  value: string;
}

interface INavigationContainerProps {
  items: INagivationItem[];
}

class NavigationContainer extends React.Component<INavigationContainerProps> {
  render(): JSX.Element {
    const navigationRows = this.props.items.map(item => {
      return (
        <Row key={`nav-button-${item.ref}`}>
          <NavigationButton>{`${item.value}`}</NavigationButton>
        </Row>
      );
    });

    return (
      <Container fluid={true} className="crl-nav-container">
        {navigationRows}
        <div className="crl-nav-divider"/>
        <Row className="crl-nav-pagenav">
          <NavigationButton>{'<'}</NavigationButton>
          <NavigationButton>{'>'}</NavigationButton>
        </Row>
      </Container>
    );
  }
}

export { NavigationContainer };
