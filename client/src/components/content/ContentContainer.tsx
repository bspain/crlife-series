/* global window, document */
import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { SeriesEntry } from '@models/Models';
import './ContentContainer.scss';
import './nlt-api.css';

interface ContentContainerProps {
  entry: SeriesEntry;
  selected: number;
}

class ContentContainer extends React.Component<ContentContainerProps> {
  render(): JSX.Element {
    const contentRows = this.props.entry.content.map(content => {
      return (
        <Row
          key={`content-${content.id}`}
          id={content.id}
          className={`clr-con-type-${content.type}`}
        >
          <div className={`clr-con-title`}>{content.title}</div>
          <div
            className={`clr-con-body`}
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(content.value) }}
          ></div>
        </Row>
      );
    });

    return (
      <Container className="crl-con-container" fluid={true}>
        <div className="crl-con-banner">
          <h1>{this.props.entry.title}</h1>
          <h2>{this.props.entry.subtitle}</h2>
        </div>
        {contentRows}
      </Container>
    );
  }

  componentDidMount(): void {
    this.scrollToSelection();
  }

  componentDidUpdate(): void {
    this.scrollToSelection();
  }

  scrollToSelection(): void {
    if (!this.props.selected) {
      window.scrollTo(0, 0);
    } else {
      document.getElementById(this.props.entry.content[this.props.selected].id).scrollIntoView();
    }
  }
}

export { ContentContainer };
