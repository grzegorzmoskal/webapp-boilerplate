import { Cmd } from "redux-loop"

describe("typings test", () => {
    it("cmd", () => {
        const successActionCreator = (a: string) => ({ type: a })
        const fooPromise = () => new Promise<string>(resolve => resolve("foo"))

        const f0 = () => "foo"
        Cmd.run(f0, { successActionCreator })

        const f1 = (_: number) => fooPromise()
        Cmd.run(f1, { args: [1], successActionCreator })

        const f1p = (_: number) => "foo"
        Cmd.run(f1p, { args: [1], successActionCreator })

        const f2 = (_: number, _b: string) => fooPromise()
        Cmd.run(f2, { args: [1, "2"], successActionCreator })

        const f2p = (_: number, _b: string) => "foo"
        Cmd.run(f2p, { args: [1, "2"], successActionCreator })

        const f3 = (_: number, _b: string, _c: boolean) => fooPromise()
        Cmd.run(f3, { args: [1, "2", false], successActionCreator })

        const f3p = (_: number, _b: string, _c: boolean) => "foo"
        Cmd.run(f3p, { args: [1, "2", false], successActionCreator })
    })
})
