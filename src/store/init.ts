import { Store, compose, createStore, Dispatch } from "redux"
import { install } from "redux-loop"
import { actions, reducer, initialState } from "."
import { internal } from "./actions"
import * as firebase from "../services/firebase"
import { toOption } from "../utils"

export type MapState<TS, TO = any> = (state: RootState, props: TO) => TS
export type MapDispatch<TA, TO = any> = (dispatch: Dispatch<any>, props: TO) => TA
export type TStore = Store<RootState>

const initStore = () => {
    const { devToolsExtension = () => (f: any) => f } = window as any
    return createStore(
        reducer,
        initialState,
        compose(
            install(),
            devToolsExtension()
        )
    ) as TStore
}

let store: TStore = null
export const getStore = () => {
    if (!store) {
        store = initStore()
        initFirebase()
        store.dispatch(actions.init())
    }
    return store
}

export const initFirebase = async () => {
    const { dispatch } = getStore()
    const { auth } = firebase.getFirebaseDb()
    auth.onAuthStateChanged(user => {
        if (!user) return

        firebase.subscribe("dicts", "collection1", {
            converter: toOption,
            onInit: value => dispatch(internal.initDictSuccess({ key: "collection1", value }))
        })
    })

    auth.signInAnonymously()
}
