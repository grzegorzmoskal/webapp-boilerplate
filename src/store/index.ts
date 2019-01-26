import { loop, LoopReducer } from "redux-loop"
import { sideEfect, extend } from "./utils"
import { getHistory } from "./init"
export { getStore } from "./init"
import { paths } from "../views/index"
import { AllActions, initialState } from "./actions"
export { actions, initialState } from "./actions"

const redirectToRoute1 = sideEfect(() => getHistory().push(paths.route1))

export const reducer: LoopReducer<AppState, AllActions> = (state, action: AllActions) => {
    if (!state) return initialState.app
    switch (action.type) {
        case "init":
            return loop(state, redirectToRoute1)
        case "initDictSuccess": {
            const { key, value } = action.payload
            return extend(state)({ dicts: { ...state.dicts, [key]: value } })
        }
        case "updateDate": {
            return extend(state)({ date: new Date().toString() })
        }
    }
    return state
}
