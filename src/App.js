import movieData from './movieData.js';
import React, {Component} from 'react';
import Movies from './Movies/Movies.js'
import MovieDetails from './MovieDetails/MovieDetails.js'
import './App.css'
import logo from './logo.svg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: movieData,
    }
  }

  render() {
    return (
      <main className='main-page'>
        <nav className='nav'>
          <button className='main-logo'><img src={logo} className='movie-reel-logo'/>Rancid<br>
          </br>Tomatillos</button>
        </nav>
        {/* <Movies movieData={this.state.movieData}/> */}
        <MovieDetails />
      </main>
    );
  }
}

export default App;
