import React from 'react'
import './Poster.css'

const Poster = ({image}) => {
    return (
        <article className='poster'>
            <img className='poster-image' src={image} />
        </article>
    )
}

export default Poster