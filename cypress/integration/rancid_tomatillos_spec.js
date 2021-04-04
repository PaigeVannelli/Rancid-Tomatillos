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

    it.only('Should show error message if no movies match search criteria', () => {
       cy.get('input')
       .type('xzy')
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('h1')
       .contains('No movies found')
    })
})

// describe('Video Display', () => {
//     beforeEach(() => {
//         cy.fixture('video.json')
//         .then(videoData => {
//             cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919/videos', {
//                 statusCode: 200,
//                 body: videoData
//             })
//         })
//         cy.visit('http://localhost:3000/:694919') 
//         cy.wait(1000)
//     })

//     it('Should show a movie trailer when viewing movie details', () => {
//         cy.get('a')
//         .contains('MONEY PLANE')
//      })
// })

describe('Error Messages', () => {
    beforeEach(() => {
        cy.fixture('video.json')
        .then(() => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
                statusCode: 200,
                body: {
                    message: 'Error data not found'
                }
            })
        })
        cy.visit('http://localhost:3000/') 
    })

    it('Should show a movie trailer when viewing movie details', () => {
        // cy.get('a')
        // .contains('MONEY PLANE')
     })
})

//check filtering 
//check video fetch?
//check server error messages
// check if loading?
//check if it can go back a page cy.go('back')




