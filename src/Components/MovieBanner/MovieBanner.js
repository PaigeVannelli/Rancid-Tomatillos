import React from 'react'
import './MovieBanner.css'


const MovieBanner = ({ title, dateReleased, rating, backgroundImage, displayMovieDetails }) => {
    return (
        <section className='movie-banner' onClick={displayMovieDetails} style={{
            background:
                `linear-gradient(to left, rgba(255,0,0,0), rgba(52, 52, 52, 1))
                ,url(${backgroundImage})`
        }}>
            <div className='movie-banner-info'>
                <h1 >{title}</h1>
                <div className='movie-info'>
                    <p className='details'>{dateReleased}</p>
                    <p>Rating: {Number(rating).toFixed(2)} / 10</p>
                </div>
            </div>
        </section>
    )
}

export default MovieBanner;