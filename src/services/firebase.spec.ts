import { updateCollection } from "./firebase"
describe("firebase service", () => {
    describe("updateCollection()", () => {
        const Id = (id: string, name?: string) => ({ id, name: name || id })
        it("gives new array when child added", () =>
            expect(updateCollection([Id("bar")], "child_added", Id("foo"), "id")).toEqual([Id("bar"), Id("foo")]))
        it("gives new array when child removed", () =>
            expect(updateCollection([Id("foo"), Id("bar")], "child_removed", Id("foo"), "id")).toEqual([Id("bar")]))
        it("gives new array when child updated", () =>
            expect(updateCollection([Id("foo"), Id("bar")], "child_changed", Id("foo", "name"), "id")).toEqual([
                Id("foo", "name"),
                Id("bar")
            ]))
    })
})
