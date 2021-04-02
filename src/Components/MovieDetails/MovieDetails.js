import React, { Component } from 'react'
import './MovieDetails.css'
import Youtube from '../../Components/Youtube/Youtube.js'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            backdrop_path: '',
            average_rating: 0,
            budget: 0,
            genres: [],
            overview: '',
            poster_path: '',
            release_date: '',
            revenue: 0,
            runtime: 0,
            tagline: '',
            title: '',
            error: '',
            embededId: '',
        }
    }

    componentDidMount() {
        this.fetchAllData();
        // this.fetchVideoData();
    }

    fetchAllData() {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
        .then(response => response.json())
        .then(data => this.setState(data.movie))
        .catch(error => this.setState({ error: error.message }))
    }


    fetchVideoData() {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}/videos`)
        .then(response => response.json())
        .then(data => this.setState({embededId: data.videos[0].key}))
    }

    // componentDidMount() {
    //     fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
    //     .then(response => response.json())
    //     .then(data => this.setState(data.movie))
    //     .catch(error => this.setState({error: error.message}))
    // }

    getGenres() {
        return this.state.genres.join(', ')
    }

    formatAmounts(amount) {
        return amount.toLocaleString()
    }

    checkIfLoading() {
        if (!this.state.title && !this.state.error) {
            return <h1 className='error'>Loading...</h1>
        }
    }

    handleIfFailed() {
        if (this.state.error) {
            return <h1 className='error'>Failed to load</h1>
        }
    }
    

    render() {
        return (
            <div className='movies-div'>
                {this.checkIfLoading()}
                {this.handleIfFailed()}
                {(!this.state.error && this.state.title) &&
                     <section style={{
                        background:
                            `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.state.backdrop_path}) no-repeat center center fixed`
                    }}>
                        <div className='main-info'>
                            <h1>{this.state.title}</h1>
                            <div className='movie-details'>
                                <p className='details'>{this.state.release_date}</p>
                                <p>{this.getGenres()}</p>
                            </div>
                            <div className='movie-details'>
                                <p className='details'>Budget: ${this.formatAmounts(this.state.budget)}</p>
                                <p className='details'>Revenue: ${this.state.revenue.toLocaleString()}</p>
                                <p>Runtime: {this.state.runtime}</p>
                                <p>{this.state.overview} </p>
                            </div>
                        </div>
                        <div className='youtube-video'>
                            <Youtube embededId={this.state.embededId}/>
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default MovieDetails;