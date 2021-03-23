import movieData from './movieData.js';
import React, {Component} from 'react';
import Movies from './Movies/Movies.js'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <Movies />
      </main>
    );
  }
}

export default App;
