import React from 'react'
import './Poster.css'

const Poster = (props) => {
    console.log(props)
    return (
        <article className='poster' onClick={props.displayMovieDetails}>
            <img className='poster-image' src={props.image} />
        </article>
    )
}

export default Poster