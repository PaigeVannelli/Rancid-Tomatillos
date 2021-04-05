import React, { Component } from 'react'
import './MovieDetails.css'
import Youtube from '../../Components/Youtube/Youtube.js'
import { fetchMovieDetails } from '../../APICalls'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            error: '',
            movieDetails: {},
            embededId: '',
        }
    }

    componentDidMount() {
        fetchMovieDetails(this.state.id)
            .then(allData => this.setState({ movieDetails: allData.movieDetails, embededId: allData.videoDetails[0].key }))
            .catch(error => this.setState({ error: error.message }))
    }

    getGenres() {
        return this.state.movieDetails.genres.join(', ')
    }

    formatAmounts(amount) {
        return amount.toLocaleString()
    }

    checkForErrors = () => {
        if (this.state.error) {
            return <h1 className='error'>Error loading movies. Please try again later</h1>
        } else if (!this.state.movieDetails.title && !this.state.error) {
            return <h1 className='error'>Loading...</h1>
        }
    }

    render() {
        return (
            <div className='movies-div'>
                {this.checkForErrors()}
                {(!this.state.error && this.state.movieDetails.title) &&
                    <section style={{
                        background:
                            `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.state.movieDetails.backdrop_path}) no-repeat center center fixed`
                    }}>
                        <div className='main-info'>
                            <h1>{this.state.movieDetails.title}</h1>
                            <div className='movie-details'>
                                <p className='details'>{this.state.movieDetails.release_date}</p>
                                <p>{this.getGenres()}</p>
                            </div>
                            <div className='movie-details'>
                                <p className='details'>Budget: ${this.formatAmounts(this.state.movieDetails.budget)}</p>
                                <p className='details'>Revenue: ${this.state.movieDetails.revenue.toLocaleString()}</p>
                                <p>Runtime: {this.state.movieDetails.runtime} min</p>
                            </div>
                            <p>{this.state.movieDetails.overview} </p>
                        </div>
                        <div className='youtube-video'>
                            <Youtube embededId={this.state.embededId} />
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default MovieDetails;