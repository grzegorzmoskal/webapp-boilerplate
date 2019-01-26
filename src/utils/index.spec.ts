import {
    mapRepeat,
    isFunction,
    isArray,
    isValid,
    toDictonary,
    toByte,
    toMinMax,
    areEqual,
    joinArrays,
    remap,
    call,
    iterateObject,
    toOption,
    toArray,
    numberWithCommas,
    isMobile
} from "."

// import { check, integer, array } from "kitimat-jest"

describe("utils", () => {
    describe("repeat()", () => {
        it("repeats 0 times", () => {
            expect(mapRepeat(0, _ => null)).toEqual([])
        })

        it("repeats -1 times", () => {
            expect(mapRepeat(-1, _ => null)).toEqual([])
        })

        it("repeats 2 times", () => {
            expect(mapRepeat(2, index => index)).toEqual([0, 1])
        })

        it("repeats 300 times", () => {
            expect(mapRepeat(300, index => index * index)[299]).toEqual(299 * 299)
        })
    })

    describe("isFunction()", () => {
        it("recognizes functions", () => {
            expect(isFunction(() => true)).toBeTruthy()
            /* tslint:disable:only-arrow-functions*/
            expect(
                isFunction(function() {
                    return true
                })
            ).toBeTruthy()
        })
        it("fails on non function argument", () => {
            expect(isFunction(true)).toBeFalsy()
            expect(isFunction({})).toBeFalsy()
            expect(isFunction(undefined)).toBeFalsy()
            expect(isFunction(null)).toBeFalsy()
        })
    })
    describe("isArray()", () => {
        it("recognizes arrays", () => {
            expect(isArray([])).toBeTruthy()
            expect(isArray([""])).toBeTruthy()
            expect(isArray([[]])).toBeTruthy()
        })
        it("fails on non arrays argument", () => {
            expect(isArray(true)).toBeFalsy()
            expect(isArray({})).toBeFalsy()
            expect(isArray(undefined)).toBeFalsy()
            expect(isArray(null)).toBeFalsy()
        })
    })

    describe("isValid()", () => {
        it("recognizes valid conditions", () => {
            expect(isValid(true)).toBeTruthy()
            expect(isValid(() => true)).toBeTruthy()
        })
        it("fails on invalid conditions", () => {
            expect(isValid(false)).toBeFalsy()
            expect(isValid(() => false)).toBeFalsy()
            expect(isValid(null as any)).toBeFalsy()
            expect(isValid(undefined as any)).toBeFalsy()
        })
    })
    describe("toByte()", () => {
        it("maps value to byte", () => {
            expect(toByte(0, 0, 255)).toEqual(0)
            expect(toByte(128, 0, 255)).toEqual(128)
            expect(toByte(255, 0, 255)).toEqual(255)
            expect(toByte(-1, 0, 255)).toEqual(0)
            expect(toByte(256, 0, 255)).toEqual(255)
        })
    })
    describe("toMinMax()", () => {
        it("maps value to range", () => {
            expect(toMinMax(2, 0, 1)).toEqual(1)
            expect(toMinMax(0.1, 0, 1)).toEqual(0.1)
            expect(toMinMax(-0.1, 0, 1)).toEqual(0)
        })
    })

    describe("toDictonary()", () => {
        it("gets empty dictonary if no array is given", () => expect(toDictonary(null as any, null as any)).toEqual({}))
        it("gets empty dictonary if no getKey param is given", () =>
            expect(toDictonary(["foo"], null as any)).toEqual({}))
        it("gets empty dictonary if no getValue param is given", () =>
            expect(toDictonary(["foo"], k => k, null as any)).toEqual({}))
        it("gets maped array of strings", () =>
            expect(toDictonary(["foo", "bar"], s => s)).toEqual({ foo: "foo", bar: "bar" }))
        it("gets maped array of strings using passed getValue", () =>
            expect(toDictonary(["foo", "bar"], s => s, s => s + "2")).toEqual({ foo: "foo2", bar: "bar2" }))
        it("gets maped array of strings with duplicated value", () =>
            expect(toDictonary(["foo", "bar", "foo"], s => s)).toEqual({ foo: "foo", bar: "bar" }))
        it("gets maped array of objects with duplicated value", () =>
            expect(toDictonary([{ id: "foo" }, { id: "bar" }], s => s.id)).toEqual({
                foo: { id: "foo" },
                bar: { id: "bar" }
            }))
        it("gets maped array of objects with duplicated value", () =>
            expect(toDictonary([{ id: "foo" }, { id: "bar" }, { id: "foo", value: 2 }], s => s.id)).toEqual({
                foo: { id: "foo", value: 2 },
                bar: { id: "bar" }
            }))
        it("gets maped array of objects with duplicated value", () =>
            expect(toDictonary([{ id: "foo" }, { id: "bar" }, { id: "foo", value: 2 }], s => s.id)).toEqual({
                foo: { id: "foo", value: 2 },
                bar: { id: "bar" }
            }))
        it("gets maped array of objects with duplicated value using passed getValue param", () =>
            expect(
                toDictonary([{ id: "foo" }, { id: "bar" }, { id: "foo", value: 2 }], s => s.id, s => s.value)
            ).toEqual({
                foo: 2,
                bar: undefined
            }))
    })
    describe("arrays areEqual()", () => {
        it("success when two arrays are equals", () => {
            expect(areEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
            expect(areEqual([], [])).toBeTruthy()
        })

        // check("that arrays are equal",
        //  [array(integer())], arr => expect(areEqual(arr, arr, () => true)).toBeTruthy())

        it("success when compare return true", () => {
            expect(areEqual([1, 2], [2, 3], () => true)).toBeTruthy()
            expect(areEqual([{ id: "foo", cnt: 1 }], [{ id: "foo", cnt: 2 }], (a, b) => a.id === b.id)).toBeTruthy()
        })

        it("fails when arrays are not equal", () => {
            expect(areEqual([2, 1, 3], [2, 1])).toBeFalsy()
            expect(areEqual([2, 1, 3], [1, 2, 3])).toBeFalsy()
            expect(areEqual([2, 1, 3], [])).toBeFalsy()
            expect(areEqual([], [2, 1, 3])).toBeFalsy()
        })
    })

    describe("arrays joinArrays()", () => {
        it("success when two arrays are equals", () => {
            expect(joinArrays([1], [2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1, 2], [2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1], [1, 2], (a, b) => a === b)).toEqual([1, 2])
            expect(joinArrays([1], [], (a, b) => a === b)).toEqual([1])
            expect(joinArrays([], [1], (a, b) => a === b)).toEqual([1])
            expect(joinArrays([1, 2], [2, 3], (a, b) => a === b)).toEqual([1, 2, 3])
        })
    })
    describe("remap()", () => {
        it("remaps", () => {
            expect(remap({ foo: 1 }, (_, key) => key.toUpperCase(), v => v)).toEqual({ FOO: 1 })
            expect(remap({ foo: 1 }, (_, key) => key.toUpperCase(), v => v + 1)).toEqual({ FOO: 2 })
            expect(remap({ foo: 1, bar: 2 }, (_, key) => key.toUpperCase(), v => v + 1)).toEqual({ FOO: 2, BAR: 3 })
            expect(
                remap({ foo: 1, bar: 2 }, (_, key, index) => key.toUpperCase() + index.toString(), v => v + 1)
            ).toEqual({
                FOO0: 2,
                BAR1: 3
            })
        })

        it("skips empty values in mapped object", () => {
            expect(remap({ foo: 1, bar: null }, (_, key) => key, v => v, true)).toEqual({ foo: 1 })
        })
    })

    describe("call()", () => {
        it("calls function when function is passed", async done => {
            call(done)
        })

        it("calls function when function is passed", done => {
            const f = (arg: number) => {
                expect(arg).toEqual(2)
                done()
            }
            call(f, 2)
        })

        it("calls no function when no function is passed", () => {
            call(null as any, 2)
            call(undefined as any, 2)
            call({} as any, 2)
        })
    })

    describe("iterateObject()", () => {
        it("iterates nothing when empty object is given", () => {
            const result: string[] = []
            iterateObject(null, key => result.push(key as string))
            expect(result).toEqual([])
            iterateObject({}, key => result.push(key))
            expect(result).toEqual([])
        })
        it("iterates all keys and values", () => {
            const abc = { a: 1, b: "2", c: true }
            const result: typeof abc = {} as any
            iterateObject(abc, (key, value) => (result[key] = value))
            expect(result).toEqual(abc)
        })
    })

    describe("toArray()", () => {
        it("gets empty array if none or empty object is given", () => {
            expect(toArray(null as any, null as any)).toEqual([])
            expect(toArray({}, null as any)).toEqual([])
        })

        it("maps object to array of indexes", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (_, _2, index) => index)).toEqual([0, 1])
        })

        it("maps object to array of keys", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (_, key, _2) => key)).toEqual(["k1", "k2"])
        })

        it("maps object to array of values", () => {
            expect(toArray({ k1: "foo", k2: "bar" }, (value, _, _2) => value)).toEqual(["foo", "bar"])
        })
    })
    it("numberWithCommas()", () => {
        expect(numberWithCommas(100)).toEqual("100")
        expect(numberWithCommas(1000)).toEqual("1,000")
    })

    describe("isMobile()", () => {
        it("detects iphone as mobile", () => {
            expect(
                isMobile(
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) " +
                        "AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
                )
            ).toEqual(true)
        })

        it("detects android as mobile", () => {
            expect(
                isMobile(
                    "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 " +
                        "(KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36"
                )
            ).toEqual(true)
        })

        it("detects chrome as desktop", () => {
            expect(
                isMobile(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 " +
                        "(KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
                )
            ).toEqual(false)
        })
    })

    it("converts named to toOption", () =>
        expect(toOption({ name: "name", id: "id" })).toEqual({ label: "name", value: "id" }))
    // tslint:disable-next-line:max-file-line-count
})
