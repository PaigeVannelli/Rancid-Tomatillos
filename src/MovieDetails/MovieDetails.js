import React, { Component } from 'react'
import './MovieDetails.css'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        }
    }

    componentDidMount() {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.state.id}`)
        .then(response => response.json())
        .then(data => this.setState(data.movie))
    }

    getGenres() {
        const formattedGenres = this.state.genres.join(', ')
        this.setState({genres: formattedGenres})
        return <p>{this.state.genres}</p>
    }

    render() {
        return (
            <section>
                <div className='main-info'>
                    <h1>{this.state.title}</h1>
                    <div className='movie-details'>
                        <p className='details'>{this.state.release_date}</p>
                        {/* {this.getGenres()} */}
                    </div>
                    <div className='movie-details'>
                        {/* <p className='details'>Budget: ${this.state.budget.toLocaleString()}</p>
                        <p className='details'>Revenue: ${this.state.revenue.toLocaleString()}</p> */}
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