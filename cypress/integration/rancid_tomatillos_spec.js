describe('Inital page view', () => {
    beforeEach(() => {
        cy.fixture('movie.json')
        .then(movieData => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
                statusCode: 200,
                body: movieData
            })
        })
        cy.visit('http://localhost:3000/') 
    })

    it('Should be able to visit the main page url', () => {
        cy.get('button')
        .contains('Cinematic')
    })

    it('Should display all movie posters on main page', () => {
        cy.get('section').children().should('have.length', 3)
    })
})

describe('Detailed poster view', () => {
    before(() => {
        cy.fixture('video.json')
        .then(videoDetails => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919/videos', videoDetails)
        })
        cy.fixture('details.json')
        .then(movieDetails => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', movieDetails)
        })
        cy.fixture('movie.json')
        .then(movieData => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', movieData)
        })
        cy.visit('http://localhost:3000/') 
    })

    it('Should be able to click on a specific movie and see more details', () => {
        cy.get('a')
        .get('[href="/694919"]')
        .click()
        cy.wait(1000)
        cy.get('h1').contains('Money Plane')
    })

    it('Should display the correct movie trailer when movie poster is clicked', () => {
        cy.get('[data-cy=video]')
        // .its('0.contentDocument').should('exist')
    })
})

describe('Movie Filtering', () => {
    beforeEach(() => {
        cy.fixture('movie.json')
        .then(movieData => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', movieData)
        })
        cy.visit('http://localhost:3000/') 
    })

    it('Should be able to search by movie title', () => {
       cy.get('input')
       .type('money plane')
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('section').children().should('have.length', 1)
    })

    it('Should be able to search by a partial movie title', () => {
       cy.get('input')
       .type('m')
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('section').children().should('have.length', 2)
    })

    it('Should show all movies when the search bar is clear', () => {
       cy.get('input')
       .clear()
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('section').children().should('have.length', 3)
    })

    it('Should show all movies when the home button is clicked', () => {
       cy.get('input')
       .clear()
       cy.get('[data-cy=home-button]')
       .click()
       cy.get('section').children().should('have.length', 3)
    })

    it('Should show error message if no movies match search criteria', () => {
       cy.get('input')
       .type('xzy')
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('h1')
       .contains('No movies found')
    })
})

describe('Error Messages All Movies', () => {
    it('Should show a loading message when movies are still loading', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {videos: []})
        cy.visit('http://localhost:3000/')
        cy.get('h1')
        .contains('Loading')
    })
  
    it('Should return an error if the server cannot get the movie data', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
            method: 'GET',
            url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
            status: 500,
            response: {
                message: 'Something went wrong, please try again later'
            }
        })
        cy.visit('http://localhost:3000/')
        cy.get('p')
        .contains('Error loading movies')
    })
})

describe('Error Messages Movie Details', () => {
    before(() => {
        cy.fixture('video.json')
        .then(videoDetails => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919/videos', videoDetails)
        })
        cy.fixture('details.json')
        .then(movieDetails => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {movie: {title: ''}})
        })
        cy.fixture('movie.json')
        .then(movieData => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', movieData)
        })
        cy.visit('http://localhost:3000/') 
    })

    it('Should show a loading message when movie details are still loading', () => {
        cy.get('a')
        .get('[href="/694919"]')
        .click()
        cy.get('h1')
        .contains('Loading')
    })
  
})

describe('Error Messages Movie Details', () => {
    it('Should return an error if the server cannot get the movie data', () => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
            method: 'GET',
            url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
            status: 500,
            response: {
                message: 'Something went wrong, please try again later'
            }
        })
        cy.visit('http://localhost:3000/')
        cy.get('a')
        .get('[href="/694919"]')
        .click()
        cy.get('h1')
        .contains('Error loading movies. Please try again later')
    })
})

//check if it can go back a page cy.go('back')
//check for video errors 


