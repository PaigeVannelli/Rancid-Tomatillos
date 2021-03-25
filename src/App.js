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
      view: 'mainPage'
    }
  }

goToMain = () => {
  this.setState({view: 'mainPage'})
}

displayMovieDetails = () => {
  this.setState({view: 'detailedView'})
}

  render() {
    return (
      <main className='main-page'>
        <nav className='nav'>
          <button className='main-logo' onClick={this.goToMain}><img src={logo} className='movie-reel-logo'/>Rancid<br>
          </br>Tomatillos</button>
        </nav>
        {this.state.view === 'mainPage' && <Movies movieData={this.state.movieData} displayMovieDetails={this.displayMovieDetails}/>}
        {this.state.view === 'detailedView' && <MovieDetails />}
      </main>
    );
  }
}

export default App;
