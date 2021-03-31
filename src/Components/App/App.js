import movieData from '../../movieData.js';
import React, { Component } from 'react';
import Movies from '../Movies/Movies.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import './App.css'
import logo from '../../logo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // movieData: movieData,
      movieData: {
        movies: []
      },
      displayedMovies: movieData.movies,
      view: 'mainPage',
      currentMovieId: 0,
      error: '',
      searchValue: '',
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(data => this.setState({ movieData: data }))
      .catch(error => this.setState({ error: error.message }))
  }

  checkIfLoading() {
    if (!this.state.movieData.movies.length && !this.state.error) {
      return <h1 className='error'>Loading...</h1>
    }
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value})
  }
  
  filterByTitle = () => {
    const filteredMovies = this.state.movieData.movies.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
    })
    if (this.state.searchValue) {
      this.setState({displayedMovies: filteredMovies})
    } else {
      this.setState({displayedMovies: movieData.movies})
    }
  }

  displaySearchBar() {
    if (this.state.view === 'mainPage') {
      return( <form>
        <input type='search' 
      className='search-bar' 
      value={this.state.searchValue}
      placeholder='Search for a movie'
      onChange={(event) => this.handleChange(event)}>
      </input>
      <button className='search-button' onClick={this.filterByTitle}>Search</button>
      </form>
      )
    }
  }
 
  handleIfFailed() {
    if (this.state.error) {
      return <h1 className='error'>Failed to load</h1>
    }
  }

  goToMain = () => {
    this.setState({ view: 'mainPage', currentMovieId: 0 })
  }

  displayMovieDetails = (id) => {
    this.setState({ view: 'detailedView', currentMovieId: id })
  }

  render() {
    return (
      <main className='main-page'>
        <Link to='/'>
        <nav className='nav'>
          <button className='main-logo' onClick={this.goToMain}><img src={logo} className='movie-reel-logo' />Cinematic</button>
          {this.displaySearchBar()}
        </nav>
        </Link>
        {this.checkIfLoading()}
        {this.handleIfFailed()}
        <Switch>
          <Route
            exact path='/'
            render={() => {
              return (
                <Movies movieData={this.state.displayedMovies} displayMovieDetails={this.displayMovieDetails} />
              )
            }}
          />
          <Route
            exact path='/:id'
            render={({ match }) => {
              const movie = this.state.movieData.movies.find(movie => {
                return movie.id === parseInt(match.params.id.substring(1));
              })
              if(!movie) {
                return (<p className='error'>This Movie Doesn't Exist!</p>)
              }
              return (
                <MovieDetails id={match.params.id.substring(1)}/>
              )
            }}
          />

          {/* {this.state.view === 'mainPage' && <Movies movieData={this.state.movieData} displayMovieDetails={this.displayMovieDetails}/>}
        {this.state.view === 'detailedView' && <MovieDetails id={this.state.currentMovieId}/>} */}
        </Switch>
      </main>
    );
  }
}

export default App;
