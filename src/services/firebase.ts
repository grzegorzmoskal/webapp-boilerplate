import "firebase/database"
import "firebase/auth"
import { initializeApp, database, auth } from "firebase/app"
import { toArray } from "../utils"

export const defaultConfig = {
    // Firebase config comes here
}

export type FirebaseDb = {
    database: database.Database
    auth: auth.Auth
}

let _db: FirebaseDb
export type FirebaseConfig = typeof defaultConfig
export const getFirebaseDb = (config: FirebaseConfig = defaultConfig): FirebaseDb => {
    if (!_db) {
        const app = initializeApp(config)
        _db = { database: app.database(), auth: auth() }
    }
    return _db
}

const refs: SMap<database.Reference> = {}
const getRef = <T extends DBNode>(mainNode: T, path: keyof DBSchema[T]) => {
    const p = path as string
    if (!refs[p]) {
        refs[p] = getFirebaseDb()
            .database.ref("/" + mainNode)
            .child(p)
    }
    return refs[p]
}

export const push = <T extends DBNode, T2 extends keyof DBSchema[T]>(root: T, child: T2, item: any) =>
    getRef(root, child).push(item)

export const add = <T extends DBNode, T2 extends keyof DBSchema[T]>(root: T, child: T2, id: string, item: any) =>
    getRef(root, child)
        .child(id)
        .set(item)

export type EventType = database.EventType

interface SubscribeParams<N, O> {
    onInit?: (values: O[]) => void
    onChange?: (type: EventType, value: any) => void
    converter: (v: N) => O
}

const subscribeOn: EventType[] = ["child_changed", "child_added", "child_removed"]

export async function subscribe<T extends keyof DBSchema, T2 extends keyof DBSchema[T]>(
    node: T,
    path: T2,
    { onInit, onChange, converter }: SubscribeParams<Named, Option>
) {
    const collectionRef = getRef(node, path)
    if (onInit) onInit(toArray((await collectionRef.once("value")).val(), converter))
    if (onChange)
        subscribeOn.forEach(type =>
            collectionRef.limitToFirst(1).on(type, s => onChange(type, converter(s ? s.val() : null)))
        )
}

export const updateCollection = <T>(dict: T[], type: EventType, value: T, key: keyof T) => {
    if (type === "child_added") return [...dict, value]
    if (type === "child_removed") return dict.filter(it => it[key] !== value[key])
    if (type === "child_changed") return dict.map(it => (it[key] === value[key] ? value : it))
    return dict
}
