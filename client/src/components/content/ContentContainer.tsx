/* global window, document */
import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { Series } from '../../models/Models';
import './ContentContainer.scss';
import './nlt-api.css';

interface ContentContainerProps {
  series: Series;
  selected: number;
}

class ContentContainer extends React.Component<ContentContainerProps> {
  render(): JSX.Element {
    const contentRows = this.props.series.content.map(content => {
      return (
        <Row
          key={`content-${content.id}`}
          id={content.id}
          className={`clr-con-type-${content.type}`}>
          dangerouslySetInnerHTML={{ __html: decodeURIComponent(content.value) }}
        </Row>
      );
    });

    return <Container className="crl-con-container" fluid={true}>
      <div className="crl-con-banner">
        <h1>{this.props.series.title}</h1>
        <h2>{this.props.series.subtitle}</h2>
      </div>
      {contentRows}
    </Container>;
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
      document.getElementById(this.props.series.content[this.props.selected].id).scrollIntoView();
    }
  }
}

export { ContentContainer };
