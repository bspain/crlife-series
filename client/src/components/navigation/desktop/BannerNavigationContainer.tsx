import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EntryData, ContentItem } from '@crlife/Models';

interface BannerNavigationContainerProps {
    entry: EntryData;
    onClick(selection: number | 'prev' | 'next'): void;
    onTextsize(): void;
}

class BannerNavigationContainer extends React.Component<BannerNavigationContainerProps> {
    render(): JSX.Element {

        const navButtons = this.props.entry.navigation.map((nav, index) => {

            var value = "Devotional";

            // From nav.ref, lookup content type, and if passage, get the 
            // api_nlt_to_ref if available
            const content : ContentItem = this.props.entry.content.find(c => {
                return c.id == nav.ref
            })

            if (content.type == 'passage')
            {
                value = content.api_nlt_to_ref
            }

            return (
                <Col key={`nav-button-${nav.ref}`}>{`${value}`}</Col>
            )
        })

        return (
            <Container>
                <Row>
                    {navButtons}
                </Row>
            </Container>
        );
    }
}

export { BannerNavigationContainer };