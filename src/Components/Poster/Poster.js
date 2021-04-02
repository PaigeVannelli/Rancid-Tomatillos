import React from 'react'
import './Poster.css'
import { Link } from 'react-router-dom';

const Poster = (props) => {
    return (
        <Link to={`/${props.id}`}>
            <article className='poster' onClick={() => props.displayMovieDetails(props.id)}>
                <img className='poster-image' src={props.image} />
            </article>
        </Link>
    )
}

export default Poster