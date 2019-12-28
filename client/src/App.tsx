/* global window, localStorage */
import * as React from 'react';
import { ContentContainer } from './components/content/ContentContainer';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { Chevron } from './components/chevron/Chevron';
import './App.scss';
import { SeriesEntry } from '@crlife/Models';

const LARGEST_TEXT_SIZE = 4;

interface IAppProps {
  entry: SeriesEntry;
}
interface IAppState {
  entry: SeriesEntry;
  selected: number;
  navExpanded: boolean;
  textsize: number;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    let initialTextSize = Number.parseInt(localStorage.getItem('crl-initial-textsize'));
    if (Number.isNaN(initialTextSize)) {
      initialTextSize = 0;
    }

    this.state = { entry: props.entry, selected: 0, navExpanded: false, textsize: initialTextSize };
  }

  onChevronClicked = (): void => {
    this.setState({ navExpanded: !this.state.navExpanded });
  };

  onTextsizeClicked = (): void => {
    let newTextSize = this.state.textsize + 1;
    if (newTextSize > LARGEST_TEXT_SIZE) {
      newTextSize = 0;
    }

    localStorage.setItem('crl-initial-textsize', newTextSize.toString());
    this.setState({ textsize: newTextSize });
  };

  onContentNavClicked = (selection: number | 'prev' | 'next'): void => {
    if (selection == 'prev' || selection == 'next') {
      const refValue = selection == 'prev' ? this.props.entry.prev : this.props.entry.next;
      window.location.href = `${window.location.origin}${window.location.pathname}?ref=${refValue}`;
    } else {
      this.setState({ selected: selection as number, navExpanded: false });
    }
  };

  render(): JSX.Element {
    const textsizeClass = `crl-textsize${this.state.textsize}`;

    return (
      <div className={`crl-app ${textsizeClass}`}>
        <ContentContainer entry={this.state.entry} selected={this.state.selected} />
        <NavigationContainer
          expanded={this.state.navExpanded}
          items={this.state.entry.navigation}
          onClick={this.onContentNavClicked}
          onTextsize={this.onTextsizeClicked}
        ></NavigationContainer>
        <Chevron
          direction={this.state.navExpanded ? 'down' : 'up'}
          onClick={this.onChevronClicked}
        />
      </div>
    );
  }
}

export default App;
