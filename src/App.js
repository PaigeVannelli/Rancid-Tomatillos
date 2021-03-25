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
      // movieData: movieData,
      movieData: {
        movies: []
      },
      view: 'mainPage', 
      currentMovieId: 0,
      error: '',
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
    .then(data => this.setState({movieData: data}))
    .catch(error => this.setState({error: error.message}))
  }

  checkIfLoading() {
    if (!this.state.movieData.movies.length && !this.state.error) {
      return <h1 className='error'>Loading...</h1>
    }
  }

  handleIfFailed() {
    if (this.state.error) {
      return <h1 className='error'>Failed to load</h1>
    }
  }

  goToMain = () => {
    this.setState({view: 'mainPage', currentMovieId: 0})
  }

  displayMovieDetails = (id) => {
    console.log(id)
    this.setState({view: 'detailedView', currentMovieId: id})
  }

  render() {
    return (
      <main className='main-page'>
        <nav className='nav'>
          <button className='main-logo' onClick={this.goToMain}><img src={logo} className='movie-reel-logo'/>Rancid<br>
          </br>Tomatillos</button>
        </nav>
        {this.checkIfLoading()}
        {this.handleIfFailed()}
        {this.state.view === 'mainPage' && <Movies movieData={this.state.movieData} displayMovieDetails={this.displayMovieDetails}/>}
        {this.state.view === 'detailedView' && <MovieDetails id={this.state.currentMovieId}/>}
      </main>
    );
  }
}

export default App;
