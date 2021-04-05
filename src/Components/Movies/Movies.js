import React from 'react'
import Poster from '../Poster/Poster.js'
import './Movies.css'

const Movies = (props) => {
    const allMovies = props.movieData ? props.movieData.map(movie => {
        return (
            <Poster image={movie.poster_path} key={movie.id} id={movie.id} displayMovieDetails={props.displayMovieDetails}/>
        )
    }) :
    <p>Error loading movies. Please try again later</p>

    return (
        <section className='all-movies'>
            {allMovies}
        </section>
    )
}

export default Movies