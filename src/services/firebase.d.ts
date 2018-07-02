interface DBSchema {
    dicts: DBDicts
}

interface DBDicts {
    collection1: Options
}

type DBNode = keyof DBSchema
