import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { ContentItem, SeriesEntry } from '@crlife/Models';
import { NavigationButton } from './NavigationButton';
import { Textsize } from '../../textsize/Textsize';
import './NavigationContainer.scss';
import { DisplayName } from '../../../helpers/NavigationDisplayNameHelper';

interface NavigationContainerProps {
  entry: SeriesEntry;
  expanded: boolean;
  onClick(selection: number | 'prev' | 'next'): void;
  onTextsize(): void;
}

class NavigationContainer extends React.Component<NavigationContainerProps> {
  render(): JSX.Element {
    const prevDisplayName = DisplayName(this.props.entry.prev);
    const nextDisplayName = DisplayName(this.props.entry.next);

    const navigationRows = this.props.entry.navigation.map((nav, index) => {
      let value = 'Devotional';

      // From nav.ref, lookup content type, and if passage, get the
      // api_nlt_to_ref if available
      const content: ContentItem = this.props.entry.content.find(c => {
        return c.id == nav.ref;
      });

      if (content.type == 'passage') {
        value = content.api_nlt_to_ref; // TODO: Pretty format this
      }

      return (
        <Row key={`nav-button-${nav.ref}`}>
          <NavigationButton
            selection={index}
            onClick={this.props.onClick}
          >{`${value}`}</NavigationButton>
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
        <div className="crl-nav-divider" />
        <Row className="crl-nav-pagenav">
          <NavigationButton selection="prev" onClick={this.props.onClick}>
            {'< ' + prevDisplayName}
          </NavigationButton>
          <NavigationButton selection="next" onClick={this.props.onClick}>
            {nextDisplayName + ' >'}
          </NavigationButton>
        </Row>
      </Container>
    );
  }
}

export { NavigationContainer };
