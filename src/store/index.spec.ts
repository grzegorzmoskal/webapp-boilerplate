import { reducer, initialState } from "."

describe("counter state", () => {
    describe("reducer", () => {
        it("gives same state when unknown action is given", () =>
            expect(reducer(initialState.app, { type: "fake" })).toEqual(initialState.app))
    })
})
