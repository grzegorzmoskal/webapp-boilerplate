describe('App',() => {
    it('cy.get() - query DOM elements', () => {
        cy.visit('http://localhost:4000')
        cy.get('#app h1').contains('Hello world!')
  })
})
