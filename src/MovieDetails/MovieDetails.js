import React, { Component } from 'react'
import './MovieDetails.css'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            averageRating: 0,
            budget: 0,
            genres: [],
            overview: '',
            posterPath: '',
            releaseDate: '',
            revenue: 0,
            runtime: 0,
            tagline: '',
            title: '',
        }
    }

    componentDidMount() {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
        .then(response => response.json())
        .then(data => this.setState(data.movie))
    }

    getGenres() {
        return this.state.genres.join(', ')
        //Would we need to update state with this new info?
    }

    formatAmounts(amount) {
        return amount.toLocaleString()
    }

    render() {
        return (
            <section>
                <div className='main-info'>
                    <h1>{this.state.title}</h1>
                    <div className='movie-details'>
                        <p className='details'>{this.state.release_date}</p>
                        {this.getGenres()}
                    </div>
                    <div className='movie-details'>
                        <p className='details'>Budget: ${this.formatAmounts(this.state.budget)}</p>
                        <p className='details'>Revenue: ${this.state.revenue.toLocaleString()}</p>
                        //Do we want to call the format amounts function or use toLocaleString in the render?
                        <p>Runtime: {this.state.runtime}</p>
                    </div>
                </div>
                <p className='summary'>
                    {this.state.overview} 
                </p>
            </section>
        )
    }
}

export default MovieDetails;