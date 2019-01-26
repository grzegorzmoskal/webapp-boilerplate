import * as React from "react"
import { Route1 } from "./Route1"
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { getHistory } from "../store/init"

export const paths = {
    route1: "/r1",
    admin: "/admin"
}

export const Routes = () => (
    <ConnectedRouter history={getHistory()}>
        <Switch>
            <Redirect from="/" to={paths.route1} exact />
            <Route path={paths.route1} component={Route1} exact />
        </Switch>
    </ConnectedRouter>
)
