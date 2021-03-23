import movieData from './movieData.js';
import React, {Component} from 'react';
import Movies from './Movies/Movies.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: movieData,
    }
  }

  render() {
    return (
      <main>
        <Movies movieData={this.state.movieData}/>
      </main>
    );
  }
}

export default App;
