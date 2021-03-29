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

    it('Should display all movie potsers on main page', () => {
        // cy.get('a')
        // .get('[href="/:694919"]')
        // .get('article')
        // .should('be.visible')
        // .find('img')
        // .should('include', ['https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg'])
    })
})