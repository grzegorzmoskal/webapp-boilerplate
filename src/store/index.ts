import { loop, LoopReducer } from "redux-loop"
import { sideEfect, extend } from "./utils"
import { history } from "../views"
export { getStore } from "./init"
import { paths } from "../views/index"
import { AllActions } from "./actions"
// tslint:disable-next-line:no-duplicate-imports
import * as actions from "./actions"
export { general as actions, General as Actions, initialState } from "./actions"

const redirectToRoute1 = sideEfect(() => history.push(paths.route1))
const reduceInitDictSuccess = (state: RootState, { key, value }: DictInitPayload<keyof DBDicts>) => {
    const result = { dicts: { ...state.dicts, [key]: value } }
    return extend(state)(result)
}
export const reducer: LoopReducer<RootState, AllActions> = (state, action: AllActions) => {
    switch (action.type) {
        case actions.init:
            return loop(state, redirectToRoute1)
        case actions.initDictSuccess:
            return reduceInitDictSuccess(state, action.payload)
        default:
            return state
    }
}
