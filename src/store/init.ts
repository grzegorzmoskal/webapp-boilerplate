import { Store, compose, createStore, Dispatch, applyMiddleware } from "redux"
import { install, combineReducers } from "redux-loop"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"

import { actions, reducer, initialState } from "."
import * as firebase from "../services/firebase"
import { toOption } from "../utils"
// import { routerReducer } from "react-router-redux"

export type MapState<TS, TO = any> = (state: RootState, props: TO) => TS
export type MapDispatch<TA, TO = any> = (dispatch: Dispatch<any>, props: TO) => TA
export type TStore = Store<RootState>

let _history: ReturnType<typeof createBrowserHistory> = null as any
export const getHistory = () => {
    if (!_history) _history = createBrowserHistory()
    return _history
}

let _store: TStore | null = null
const initStore = () => {
    const { __REDUX_DEVTOOLS_EXTENSION__ = () => (f: any) => f } = window as any
    return createStore(
        combineReducers<any>({ app: reducer, router: connectRouter(getHistory()) }),
        initialState as any,
        compose(
            install(),
            __REDUX_DEVTOOLS_EXTENSION__(),
            applyMiddleware(routerMiddleware(getHistory()))
        )
    ) as TStore
}
export const getStore = () => {
    if (!_store) {
        _store = initStore()
        // initFirebase()
        _store.dispatch(actions.init())
    }
    return _store
}

export const initFirebase = async () => {
    const { dispatch } = getStore()
    const { auth } = firebase.getFirebaseDb()
    auth.onAuthStateChanged(user => {
        if (!user) return
        firebase.subscribe("dicts", "collection1", {
            converter: toOption,
            onInit: value => dispatch(actions.initDictSuccess({ key: "collection1", value }))
        })
    })

    auth.signInAnonymously()
}
