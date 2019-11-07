import * as React from 'react';
import { NavigationContainer } from './components/navigation/NavigationContainer';
class App extends React.Component {
  render(): JSX.Element {
    // const SSR_DATA = document.getElementById('__CR_SERIES_SSR_DATA').innerText;
    // const payload = JSON.parse(SSR_DATA) as JenkinsJsonPayload;

    const navItems = [
      { "ref": "ot-content", "value": "Older Testament Study" },
      { "ref": "nt-content", "value": "New Testament Study" },
      { "ref": "ot-passage", "value": "Old Testament Passage" },
      { "ref": "nt-passage", "value": "New Testament Passage" },
      { "ref": "ps-passage", "value": "Psalms" },
      { "ref": "pr-passage", "value": "Proverbs" },
      { "ref": "fs-content", "value": "Further Study" }
    ]

    return (
      <div className="App">
        <NavigationContainer items={ navItems }></NavigationContainer>
      </div>
    );
  }
}

export default App;
