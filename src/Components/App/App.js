import movieData from '../../movieData.js';
import React, { Component } from 'react';
import Movies from '../Movies/Movies.js'
import MovieDetails from '../MovieDetails/MovieDetails.js'
import MovieBanner from '../MovieBanner/MovieBanner.js'
import {fetchAllMovies} from '../../APICalls'
import './App.css'
import logo from '../../logo.svg'
import search from '../../search.png'
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
      randomChosenMovie: {id: 0,title: '', dateReleased: '', rating: '', backgroundImage: ''},
    }
  }

  componentDidMount = () => {
      fetchAllMovies()
      .then(data => this.setState({ movieData: data.movies, displayedMovies: data.movies }))
      .then(() => {this.chooseBannerMovie()})
      .catch(error => this.setState({ error: error.message }))
  }

  getDisplayedMovies = () => {
    let movies = this.state.movieData
    this.setState({ displayedMovies: movies })
  }

  chooseBannerMovie = () => {
    const randomMovie = this.state.movieData[Math.floor(Math.random() * this.state.movieData.length)];
    this.setState(prevState => ({
      randomChosenMovie: {                
          ...prevState.randomChosenMovie,
          id: randomMovie.id,    
          title: randomMovie.title,
          dateReleased: randomMovie.release_date,
          rating: randomMovie.average_rating,
          backgroundImage: randomMovie.backdrop_path,
      }
    }))
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

 displaySearchBar = () => {
    if (this.state.view === 'mainPage') {
      return( <form>
        <input type='text' 
      className='search-bar' 
      value={this.state.searchValue}
      placeholder='Search for a movie'
      onChange={(event) => this.handleChange(event)}>
      </input>
      <button className='search-button' onClick={this.filterByTitle}><img className='search-logo' src={search}></img></button>
      </form>
      )
    }
  }

  checkForErrors = () => {
    if (this.state.error) {
      return <h1 className='error'>Error loading movies. Please try again later</h1>
    } else if (this.state.movieData?.length === 0  && !this.state.error && !this.state.searchValueInput) {
      return <h1 className='error'>Loading...</h1>
    } else if (this.state.movieData?.length === 0 && !this.state.error && this.state.searchValueInput) {
      return <h1 className='error'>No movies found. Try broadening your search.</h1>
    }
  }

  goToMain = () => {
    this.setState({ view: 'mainPage', currentMovieId: 0, searchValue: '', searchValueInput: '' })
    const allMovies = this.state.displayedMovies
    this.setState(prevState => ({movieData: allMovies}))
    this.chooseBannerMovie()
  }

  displayMovieDetails = (id) => {
    this.setState({ view: 'detailedView', currentMovieId: id })
  }

  showMovieBanner = () => {
    if(this.state.view === 'mainPage') {
      return (
      <Link to={`/${this.state.randomChosenMovie.id}`}>
        <MovieBanner
        displayMovieDetails={this.displayMovieDetails}
        id={this.state.randomChosenMovie.id}
        title={this.state.randomChosenMovie.title}
        dateReleased={this.state.randomChosenMovie.dateReleased}
        rating={this.state.randomChosenMovie.rating}
        backgroundImage={this.state.randomChosenMovie.backgroundImage}/>
      </Link>
      )
    }
  }

  render() {
    return (
      <main className='main-page'>
        <Link to='/'>
        <nav className='nav'
         alt='movie-reel-logo'
        style={this.state.view === 'mainPage' ? {position:'unset'} : {position:'fixed'}}
         >
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
        {this.showMovieBanner()}
        {this.checkForErrors()}
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
