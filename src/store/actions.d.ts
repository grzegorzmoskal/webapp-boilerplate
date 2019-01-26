type RootState = {
    app: AppState
    reducer: any
}

type AppState = {
    dicts: DBDicts
    date: string
}

interface DictInitPayload<T extends keyof DBDicts> {
    key: T
    value: DBDicts[T]
}
