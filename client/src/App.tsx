import * as React from 'react';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { Chevron } from './components/chevron/Chevron';
import './App.scss';

interface IAppState {
  navExpanded: boolean;
}
class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = { navExpanded: false };
  }

  onChevronClicked = (): void => {
    this.setState({ ...this.state, navExpanded: !this.state.navExpanded });
  };

  render(): JSX.Element {
    // const SSR_DATA = document.getElementById('__CR_SERIES_SSR_DATA').innerText;
    // const payload = JSON.parse(SSR_DATA) as JenkinsJsonPayload;

    const navItems = [
      { ref: 'ot-content', value: 'Older Testament Study' },
      // { ref: 'nt-content', value: 'New Testament Study' },
      { ref: 'ot-passage', value: 'Old Testament Passage' },
      // { ref: 'nt-passage', value: 'New Testament Passage' },
      // { ref: 'ps-passage', value: 'Psalms' },
      // { ref: 'pr-passage', value: 'Proverbs' },
      { ref: 'fs-content', value: 'Further Study' }
    ];

    return (
      <div className="App">
        <NavigationContainer
          expanded={this.state.navExpanded}
          items={navItems}
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
