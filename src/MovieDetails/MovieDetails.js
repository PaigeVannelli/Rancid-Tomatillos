import React, { Component } from 'react'
import './MovieDetails.css'

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <section>
                <div className='main-info'>
                    <h1>Movie Title</h1>
                    <div className='movie-details'>
                        <p className='details'>Release Date</p>
                        <p>Movie Genres</p>
                    </div>
                    <div className='movie-details'>
                        <p className='details'>Budget</p>
                        <p className='details'>Revenue</p>
                        <p>Run Time</p>
                    </div>
                </div>
                <p className='summary'>
                    sdkasdnkask ldankk sdlnkl nask lna snkdkandkna kdaka sasdkas 
                </p>
            </section>
        )
    }
}

export default MovieDetails;