/* global window */
import * as React from 'react';
import { ContentContainer } from './components/content/ContentContainer';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { Chevron } from './components/chevron/Chevron';
import './App.scss';
import { SeriesEntry } from '@crlife/Models';

interface IAppProps {
  entry: SeriesEntry;
}
interface IAppState {
  entry: SeriesEntry;
  selected: number;
  navExpanded: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = { entry: props.entry, selected: 0, navExpanded: false };
  }

  onChevronClicked = (): void => {
    this.setState({ navExpanded: !this.state.navExpanded });
  };

  onTextsizeClicked = (): void => {
    console.log('onTextsizeClicked')
  }

  onContentNavClicked = (selection: number | 'prev' | 'next'): void => {
    if (selection == 'prev' || selection == 'next') {
      const refValue = selection == 'prev' ? this.props.entry.prev : this.props.entry.next;
      window.location.href = `${window.location.origin}${window.location.pathname}?ref=${refValue}`;
    } else {
      this.setState({ selected: selection as number, navExpanded: false });
    }
  };

  render(): JSX.Element {
    return (
      <div className="App">
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
