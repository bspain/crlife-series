import * as React from 'react';
import { ContentContainer } from './components/content/ContentContainer';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { Chevron } from './components/chevron/Chevron';
import './App.scss';
import { Series } from './models/Models';

interface IAppProps {
  series: Series;
}
interface IAppState {
  series: Series;
  navExpanded: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = { series: props.series, navExpanded: false };
  }

  onChevronClicked = (): void => {
    this.setState({ ...this.state, navExpanded: !this.state.navExpanded });
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <ContentContainer items={this.state.series.content} selected={0} />
        <NavigationContainer
          expanded={this.state.navExpanded}
          items={this.state.series.navigation}
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
