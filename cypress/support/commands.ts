;(() => {
    Cypress.Commands.add("foo", () => "foo")
})()

declare namespace Cypress {
    interface Chainable {
        /**
         * Yields "foo"
         *
         * @returns {typeof foo}
         * @memberof Chainable
         * @example
         *    cy.foo().then(f = ...) // f is "foo"
         */
        foo: () => string
    }
}
