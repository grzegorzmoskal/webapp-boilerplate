import { createAction } from "../utils/typedActions"

export const actions = {
    init: () => createAction("init"),
    updateDate: () => createAction("updateDate"),
    initDictSuccess: <T extends keyof DBDicts>(payload: DictInitPayload<T>) => createAction("initDictSuccess", payload)
}
export type AllActions = ReturnType<typeof actions[keyof typeof actions]>
export const initialTypes: DBDicts = { collection1: [] }
export const initialState: RootState = { app: { dicts: initialTypes, date: "" } } as any
