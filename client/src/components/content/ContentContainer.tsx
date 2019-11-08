import * as React from 'react';
import { Container, Row } from 'reactstrap';
import { ContentItem } from '../../models/Models';
import './ContentContainer.scss';

interface ContentContainerProps {
  items: ContentItem[];
  selected: number;
}

class ContentContainer extends React.Component<ContentContainerProps> {
  render(): JSX.Element {
    const contentRows = this.props.items.map(content => {
      return (
        <Row
          key={`content-${content.id}`}
          id={content.id}
          dangerouslySetInnerHTML={{ __html: decodeURIComponent(content.value) }}
        ></Row>
      );
    });

    return <Container fluid={true}>{contentRows}</Container>;
  }
}

export { ContentContainer };
