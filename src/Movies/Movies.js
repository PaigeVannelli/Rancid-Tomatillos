import React from 'react'
import Poster from '../Poster/Poster.js'
import './Movies.css'

const Movies = ({movieData}) => {
    console.log(movieData.movies)
    const allMovies = movieData.movies.map(movie => {
        return (
            <Poster image={movie.poster_path} key={movie.id} />
        )
    })
    return (
        <section className='all-movies'>
            {allMovies}
        </section>
    )
}

export default Movies