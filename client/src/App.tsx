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

  onContentNavClicked = (selection: number | "prev" | "next") => {
    if (selection == "prev" || selection == "next")
    {
      // Navigate to previous / next
    }
    else
    {
      this.setState({ selected: selection as number })
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <ContentContainer items={this.state.series.content} selected={this.state.selected} />
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
