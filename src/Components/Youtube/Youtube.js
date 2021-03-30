import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Youtube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className='video-responsive'>
                <iframe
                    width='654'
                    height='380'
                    src={`https://www.youtube.com/embed/${this.props.embededId}`}
                    frameBorder='0'
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
        )
    }
}
export default Youtube;