import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { ContentItem, SeriesEntry } from '@crlife/Models';
import { BannerButton } from './BannerButton';
import './BannerContainer.scss';
import { DisplayName } from '../../../helpers/NavigationDisplayNameHelper';

interface BannerContainerProps {
  entry: SeriesEntry;
  onClick(selection: number | 'prev' | 'next'): void;
  onTextsize(): void;
}

class BannerContainer extends React.Component<BannerContainerProps> {
  render(): JSX.Element {
    const prevDisplayName = DisplayName(this.props.entry.prev);
    const nextDisplayName = DisplayName(this.props.entry.next);

    const navButtons = this.props.entry.navigation.map((nav, index) => {
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
        <BannerButton
          key={`crl-ban-button-${index}`}
          selection={index}
          onClick={this.props.onClick}
        >{`${value}`}</BannerButton>
      );
    });

    return (
      <Container className="crl-ban-container">
        <Row>
          <BannerButton selection="prev" onClick={this.props.onClick}>
            {'< ' + prevDisplayName}
          </BannerButton>
          {navButtons}
          <BannerButton selection="next" onClick={this.props.onClick}>
            {nextDisplayName + ' >'}
          </BannerButton>
        </Row>
      </Container>
    );
  }
}

export { BannerContainer };
