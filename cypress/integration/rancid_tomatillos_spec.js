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

describe('Feedback Loop', () => {
    it('Should confirm that true is equal to true', () => {
      expect(true).to.equal(true)
    });
  });

describe('Inital page view', () => {
    it('Should be able to visit the main page url', () => {
        cy.get('button')
        .contains('Cinematic')
    })

    it('Should display all movie posters on main page', () => {
        cy.get('section').children().should('have.length', 3)
    })
})

describe('Detailed poster view', () => {
    it('Should be able to click on a specific movie and see more details', () => {
        cy
        .get('a')
        .get('[href="/:694919"]')
        .click()
        cy.fixture('details.json')
        .then(details => {
            cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
                statusCode: 200,
                body: details
            })
        })
    })

    // it('Should display all movie posters on main page', () => {
    //     cy.get('section').children().should('have.length', 3)
    // })
})

