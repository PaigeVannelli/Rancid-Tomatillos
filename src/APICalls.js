

export const fetchAllMovies = () => {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
    .then(allMovies => {
        return allMovies
    })
}

export const fetchMovieDetails = (movieId) => {
    let movieDetails =  fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}`)
        .then(response => response.json())
        .then(movieDetails => {
            return movieDetails
        })

    let videoDetails = fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}/videos`)
        .then(response => response.json())
        .then(videoDetails => {
            return videoDetails;
        })

    return Promise.all([movieDetails, videoDetails])
        .then(data => {
            let allData = {}
            allData.movieDetails = data[0].movie;
            allData.videoDetails = data[1].videos;
            console.log(allData)
            return allData;
        });
}

