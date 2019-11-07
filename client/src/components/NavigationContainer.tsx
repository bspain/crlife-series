import * as React from 'react';
import { Row } from 'reactstrap';
import { NavigationButton } from './NavigationButton';

class NavigationContainer extends React.Component {
  render(): JSX.Element {
    return (
      <Row>
        <NavigationButton>{'<'}</NavigationButton>
        <NavigationButton>{'>'}</NavigationButton>
      </Row>
    );
  }
}

export { NavigationContainer };
