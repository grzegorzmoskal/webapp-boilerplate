interface TypedAction<A = string> {
    type: A
}
interface TypePayloadAction<A, P> extends TypedAction<A> {
    payload: P
}

interface Dispatch<S> {
    <A extends TypedAction<string>>(action: A): A
}

type Reducer<T, A extends TypedAction = TypedAction> = (state: T, action: A) => T
type ReducerOf<T> = Casted<T, Reducer<any>>
