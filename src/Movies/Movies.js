import React from 'react'
import Poster from '../Poster/Poster.js'
import './Movies.css'

const Movies = (props) => {
    const allMovies = props.movieData.map(movie => {
        return (
            <Poster image={movie.poster_path} key={movie.id} id={movie.id} displayMovieDetails={props.displayMovieDetails}/>
        )
    })
    return (
        <section className='all-movies'>
            {allMovies}
        </section>
    )
}

export default Movies