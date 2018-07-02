/// <reference path="./utils/typedActions.d.ts" />
/// <reference path="./services/firebase.d.ts" />
/// <reference path="./store/actions.d.ts" />

declare module "*.scss"
type Named = { id: string; name: string }
type TMap<TKey extends string, TValue> = { [K in TKey]: TValue }
type SMap<TValue> = TMap<string, TValue>

type Options<TValue = any> = Array<Option<TValue>>

interface Option<TValue = string> {
    label?: string
    value?: TValue
}
type Casted<T, S> = { [P in keyof T]: S }
type Subtype<T> = { [P in keyof T]?: T[keyof T] }
type CastedSubtype<T, S> = { [P in keyof T]?: S }

interface KV<K, V> {
    key: K
    value: V
}
