import * as React from "react"
import { render } from "react-dom"
import { Title } from "./components/Title"
render(
    <div>
        {process.env.APP_DESCRIPTION}
        <Title text="Hello world!" />
    </div>,
    document.getElementById("app")
)
