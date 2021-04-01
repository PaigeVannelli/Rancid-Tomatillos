
// describe('Feedback Loop', () => {
//     it('Should confirm that true is equal to true', () => {
//       expect(true).to.equal(true)
//     });
//   });

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
    beforeEach(() => {
        // cy.fixture('movie.json')
        // .then(movieData => {
        //     cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        //         statusCode: 200,
        //         body: movieData
        //     })
        // })
        cy.visit('http://localhost:3000/') 
    })

    it('Should be able to click on a specific movie and see more details', () => {
        cy.get('a')
        .get('[href="/:694919"]')
        .click()
        cy.fixture('details.json')
        .then(details => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movie/694919', {
                statusCode: 200,
                body: details
            })
        })
        cy.get('h1').contains('Money Plane')
    })
})

describe('Movie Filtering', () => {
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
       .type('')
       cy.get('[data-cy=search-button]')
       .click()
       cy.get('section').children().should('have.length', 3)
    })
})

//check filtering 
//check video fetch?
//check server error messages
//check if there are no movies that match filter
// check if loading?
//check if it can go back a page cy.go('back')


//         cy
//         .get('a')
//         .get('[href="/:694919"]')
//         .click()
//         cy.fixture('details.json')
//         .then(details => {
//             cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
//                 statusCode: 200,
//                 body: details
//             })
//         })
//         // cy.contains('Money Plane')
//     })

    // it('Should display all movie posters on main page', () => {
    //     cy.get('section').children().should('have.length', 3)
    // })
// })

