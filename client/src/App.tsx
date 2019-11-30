/* global window */
import * as React from 'react';
import { ContentContainer } from './components/content/ContentContainer';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { Chevron } from './components/chevron/Chevron';
import './App.scss';
import { LinkedSeries } from '@models/Models';

interface IAppProps {
  series: LinkedSeries;
}
interface IAppState {
  series: LinkedSeries;
  selected: number;
  navExpanded: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = { series: props.series, selected: 0, navExpanded: false };
  }

  onChevronClicked = (): void => {
    this.setState({ navExpanded: !this.state.navExpanded });
  };

  onContentNavClicked = (selection: number | 'prev' | 'next'): void => {
    if (selection == 'prev' || selection == 'next') {
      const refValue = selection == 'prev' ? this.props.series.prev : this.props.series.next;
      window.location.href = `${window.location.origin}${window.location.pathname}?ref=${refValue}`;
    } else {
      this.setState({ selected: selection as number, navExpanded: false });
    }
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <ContentContainer series={this.state.series} selected={this.state.selected} />
        <NavigationContainer
          expanded={this.state.navExpanded}
          items={this.state.series.navigation}
          onClick={this.onContentNavClicked}
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
