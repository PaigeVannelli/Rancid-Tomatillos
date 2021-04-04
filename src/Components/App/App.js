import movieData from '../../movieData.js';
import React, { Component } from 'react';
import Movies from '../Movies/Movies.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import {fetchAllMovies} from '../../APICalls'
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
      movieData: [],
      displayedMovies: [],
      view: 'mainPage',
      currentMovieId: 0,
      error: '',
      searchValue: '',
      searchValueInput: '',
    }
  }

  componentDidMount = () => {
      fetchAllMovies()
      .then(data => this.setState({ movieData: data.movies, displayedMovies: data.movies }))
      .catch(error => this.setState({ error: error.message }))
  }

  getDisplayedMovies = () => {
    let movies = this.state.movieData
    this.setState({ displayedMovies: movies })
  }

  handleChange = (event) => {
    this.setState({searchValue: event.target.value})
  }

  filterByTitle = () => {
    this.setSearchValue()
    this.filterMovies()
  }

  setSearchValue = () => {
    const searchValue = this.state.searchValue
    this.setState({searchValueInput: searchValue})
  }

  filterMovies = () => {
    const filteredMovies = this.state.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
    })
    this.displaySearchedTitles(filteredMovies)
  }

  displaySearchedTitles = (filteredMovies) => {
    if (this.state.searchValue) {
      this.setState({movieData: filteredMovies})
    } else {
        const allMovies = this.state.displayedMovies
        this.setState({movieData: allMovies})
    }
  }
  
  handleChange(event) {
    this.setState({searchValue: event.target.value})
  }
  
  filterByTitle = () => {
    const filteredMovies = this.state.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
    })
    if (this.state.searchValue) {
      this.setState({displayedMovies: filteredMovies})
    } else {
      this.setState({displayedMovies: movieData})
    }
  }

 displaySearchBar = () => {
    if (this.state.view === 'mainPage') {
      return( <form>
        <input type='search' 
      className='search-bar' 
      value={this.state.searchValue}
      placeholder='Search for a movie'
      onChange={(event) => this.handleChange(event)}>
      </input>
      <button className='search-button' onClick={this.filterByTitle} data-cy='search-button'>Search</button>
      </form>
      )
    }
  }

  handleIfFailed = () => {
    if (this.state.error) {
      return <h1 className='error'>Failed to load</h1>
    }
  }

  checkIfLoading = () => {
    if (this.state?.movieData.length === 0 && !this.state.error && !this.state.searchValueInput) {
      return <h1 className='error'>Loading...</h1>
    }
  }

  checkSearchSuccess = () => {
    if (!this.state.movieData.length && !this.state.error && this.state.searchValueInput) {
      return <h1 className='error'>No movies found. Try broadening your search.</h1>
    }
  }

  goToMain = () => {
    this.setState({ view: 'mainPage', currentMovieId: 0, searchValue: '', searchValueInput: '' })
    const allMovies = this.state.displayedMovies
    this.setState(prevState => ({movieData: allMovies}))
  }

  displayMovieDetails = (id) => {
    this.setState({ view: 'detailedView', currentMovieId: id })
  }

  // findMovie = (match) => {
  //    const movie = this.state.movieData.find(movie => {
  //       return movie.id === parseInt(match.params.id);
  //     })
  //     if(!movie) {
  //       return (<p className='error'>This Movie Doesn't Exist!</p>)
  //     }
  //     return (
  //       <MovieDetails id={match.params.id}/>
  //     )
  // }

  // checkIfMovieExists = (match, movie) => {
  //   if(!movie) {
  //     return (<p className='error'>This Movie Doesn't Exist!</p>)
  //   }
  //   return (
  //     <MovieDetails id={match.params.id.substring(1)}/>
  //   )
  // }


  render() {
    return (
      <main className='main-page'>
        <Link to='/'>
        <nav className='nav' alt='movie-reel-logo'>
          <button 
          className='main-logo' 
          onClick={this.goToMain}>
            <img 
            src={logo} 
            className='movie-reel-logo' 
            data-cy='home-button'
            />Cinematic</button>
          {this.displaySearchBar()}
        </nav>
        </Link>
        {this.checkIfLoading()}
        {this.handleIfFailed()}
        {this.checkSearchSuccess()}
        <Switch>
          <Route
            exact path='/'
            render={() => {
              return (
                <Movies movieData={this.state.movieData} displayMovieDetails={this.displayMovieDetails} />
              )
            }}
          />
          <Route
            exact path='/:id'
            render={({ match }) => {
              // {this.findMovie(match)}
              const movie = this.state.movieData.find(movie => {
                return movie.id === parseInt(match.params.id);
              })
              if(!movie) {
                return (<p className='error'>This Movie Doesn't Exist!</p>)
              }
              return (
                <MovieDetails id={match.params.id}/>
              )
            }}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
