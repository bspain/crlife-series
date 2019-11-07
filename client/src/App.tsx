import * as React from 'react';
import { NavigationContainer } from './components/navigation/NavigationContainer';
class App extends React.Component {
  render(): JSX.Element {
    // const SSR_DATA = document.getElementById('__CR_SERIES_SSR_DATA').innerText;
    // const payload = JSON.parse(SSR_DATA) as JenkinsJsonPayload;

    return (
      <div className="App">
        <NavigationContainer></NavigationContainer>
      </div>
    );
  }
}

export default App;
