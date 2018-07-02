import * as React from "react"
import { Route1 } from "./Route1"
import createHistory from "history/createBrowserHistory"
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter } from "react-router-redux"

export const paths = {
    route1: "/r1",
    admin: "/admin"
}

export const history = createHistory()
export const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Redirect from="/" to={paths.route1} exact />
            <Route path={paths.route1} component={Route1} exact />
        </Switch>
    </ConnectedRouter>
)
