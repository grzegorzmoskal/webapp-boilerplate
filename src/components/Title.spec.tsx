import * as React from "react"
import { shallow } from "enzyme"
import { Title } from "./Title"

describe("<Title>", () => {
    it("should exist", () => expect(Title).toBeDefined())
    it("should render text", () =>
        expect(shallow(<Title text="Hello React!" />).contains("Hello React!")).toEqual(true))
})
