interface RootState {
    dicts: DBDicts
}

interface DictInitPayload<T extends keyof DBDicts> {
    key: T
    value: DBDicts[T]
}
