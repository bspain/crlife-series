import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { NavigationItem } from '@crlife/Models';
import { NavigationButton } from './NavigationButton';
import { Textsize } from '../textsize/Textsize'
import './NavigationContainer.scss';

interface NavigationContainerProps {
  items: NavigationItem[];
  expanded: boolean;
  onClick(selection: number | 'prev' | 'next'): void;
  onTextsize(): void;
}

class NavigationContainer extends React.Component<NavigationContainerProps> {
  render(): JSX.Element {
    const navigationRows = this.props.items.map((item, index) => {
      return (
        <Row key={`nav-button-${item.ref}`}>
          <NavigationButton
            selection={index}
            onClick={this.props.onClick}
          >{`${item.value}`}</NavigationButton>
        </Row>
      );
    });

    return (
      <Container
        fluid={true}
        className={`crl-nav-container ${this.props.expanded ? 'expanded' : 'collapsed'}`}
      >
        <Row className="crl-nav-options">
          <Textsize onClick={this.props.onTextsize} />
        </Row>
        {navigationRows}
        <Row className="crl-nav-pagenav">
          <NavigationButton selection="prev" onClick={this.props.onClick}>
            {'<'}
          </NavigationButton>
          <NavigationButton selection="next" onClick={this.props.onClick}>
            {'>'}
          </NavigationButton>
        </Row>
      </Container>
    );
  }
}

export { NavigationContainer };
