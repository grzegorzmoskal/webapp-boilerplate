import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { getStore } from "./store"
import { Routes } from "./views"

render(
    <Provider store={getStore()}>
        <Routes />
    </Provider>,
    document.getElementById("app")
)
