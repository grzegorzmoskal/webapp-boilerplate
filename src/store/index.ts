import { loop, LoopReducer } from "redux-loop"
import { sideEfect, extend } from "./utils"
import { history } from "../views"
export { getStore } from "./init"
import { paths } from "../views/index"
import { AllActions, initialState } from "./actions"
export { actions, initialState } from "./actions"

const redirectToRoute1 = sideEfect(() => history.push(paths.route1))

export const reducer: LoopReducer<RootState, AllActions> = (state, action: AllActions) => {
    if (!state) return initialState
    switch (action.type) {
        case "init":
            return loop(state, redirectToRoute1)
        case "initDictSuccess": {
            const { key, value } = action.payload
            return extend(state)({ dicts: { ...state.dicts, [key]: value } })
        }
    }
    return state
}
