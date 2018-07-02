import { createAction } from "../utils/typedActions"

export const init = "init"

export const general = {
    [init]: () => createAction(init)
}

export const initDictSuccess = "initDictSuccess"

export const internal = {
    [initDictSuccess]: <T extends keyof DBDicts>(payload: DictInitPayload<T>) => createAction(initDictSuccess, payload)
}

export const all = { ...internal, ...general }

export type AllActions = ReturnType<typeof all[keyof typeof all]>

export type General = typeof general

export const initialTypes: DBDicts = { collection1: [] }

export const initialState: RootState = { dicts: initialTypes }
