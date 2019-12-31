import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EntryData, ContentItem } from '@crlife/Models';
import { BannerButton } from './BannerButton';
import "./BannerContainer.scss"

interface BannerContainerProps {
    entry: EntryData;
    onClick(selection: number | 'prev' | 'next'): void;
    onTextsize(): void;
}

class BannerContainer extends React.Component<BannerContainerProps> {
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
                //<Col key={`crl-ban-button-${nav.ref}`} className="crl-ban-button">{`${value}`}</Col>
                <BannerButton
                    key={`crl-ban-button-${index}`} 
                    selection={index}
                    onClick={this.props.onClick}>{`${value}`}</BannerButton>
            )
        })

        return (
            <Container className="crl-ban-container">
                <Row>
                    {navButtons}
                </Row>
            </Container>
        );
    }
}

export { BannerContainer };