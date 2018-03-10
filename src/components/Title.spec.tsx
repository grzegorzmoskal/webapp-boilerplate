import * as React from "react"
import { shallow } from "enzyme"
import { Title } from "./Title"

describe("<Title>", () => {
    it("should exist", () => {
        expect(Title).toBeDefined()
    })

    it("should render", () => {
        const wrapper = shallow(<Title text="Hello React!" />)
        expect(wrapper.find("h1").contains("Hello React!")).toEqual(true)
    })
})
