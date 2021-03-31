
describe('Feedback Loop', () => {
    // beforeEach(() => {
    //     cy.fixture('movie.json')
    //     .then(movieData => {
    //         cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
    //             statusCode: 200,
    //             body: movieData
    //         })
    //     })
    //     cy.visit('http://localhost:3000/') 
    // })

    it('Should confirm that true is equal to true', () => {
      expect(true).to.equal(true)
    });
  });

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
        cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {statusCode: 200, body: {
            "movie": {
            "id": 694919,
            "title": "Money Plane",
            "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
            "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
            "release_date": "2020-09-29",
            "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
            "genres": [
            "Action"
            ],
            "budget": 0,
            "revenue": 0,
            "runtime": 82,
            "tagline": "",
            "average_rating": 6.142857142857143
            }
        }
    })
        // cy.visit('http://localhost:3000/:694919')
        // cy.fixture('details.json')
        // .then(details => {
        //     cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movie/694919', {
        //         statusCode: 200,
        //         body: details
        //     })
        // })
        // cy.wait(5000)
    })
})


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

