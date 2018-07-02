import * as bem from "./bem"

describe("BEM", () => {
    it("gets block class name without modifiers", () => {
        expect(bem.block("Foo")).toBe("Foo")
    })

    it("gets block class name containing one modifier", () => {
        expect(bem.block("Foo", { bar: true })).toBe("Foo Foo--bar")
    })

    it("gets block class name containing two modifiers", () => {
        expect(bem.block("Foo", { bar: true, baz: true })).toBe("Foo Foo--bar Foo--baz")
    })

    it("gets element class name", () => {
        expect(bem.element("Foo", "bar")).toBe("Foo__bar")
    })

    it("binds `block` function with name", () => {
        expect(bem.bindBem("f").block()).toBe("f")
        expect(bem.bindBem("f").block({ foo: true })).toBe("f f--foo")
        expect(bem.bindBem("f").block({ foo: true, bar: true })).toBe("f f--foo f--bar")

        expect(
            bem.bindBem("f").block({
                foo: true,
                bar: false
            })
        ).toBe("f f--foo")

        expect(
            bem.bindBem("f").block({
                foo: () => true
            })
        ).toBe("f f--foo")
    })

    it("binds `element` function with name", () => {
        expect(bem.bindBem("f").element("foo")).toBe("f__foo")
    })
})
