import { Action, ActionCreator, AnyAction, StoreEnhancer, Store } from "redux"

export interface StoreCreator {
    <S, A extends Action>(reducer: LoopReducer<S, A>, preloadedState: S, enhancer: StoreEnhancer<S>): Store<S>
}

export type Loop<S, A extends Action> = [S, CmdType<A>]

export interface LoopReducer<S, A extends Action> {
    (state: S | undefined, action: AnyAction): S | Loop<S, A>
}

export interface LiftedLoopReducer<S, A extends Action> {
    (state: S | undefined, action: AnyAction): Loop<S, A>
}

export type CmdSimulation = {
    result: any
    success: boolean
}
export interface MultiCmdSimulation {
    [index: number]: CmdSimulation | MultiCmdSimulation
}

export interface NoneCmd {
    readonly type: "NONE"
    simulate(): null
}

export interface ListCmd<A extends Action> {
    readonly type: "LIST"
    readonly cmds: CmdType<A>[]
    readonly sequence?: boolean
    readonly batch?: boolean
    simulate(simulations: MultiCmdSimulation): A[]
}

export interface ActionCmd<A extends Action> {
    readonly type: "ACTION"
    readonly actionToDispatch: A
    simulate(): A
}

export interface MapCmd<A extends Action> {
    readonly type: "MAP"
    readonly tagger: ActionCreator<A>
    readonly nestedCmd: CmdType<A>
    readonly args: any[]
    simulate(simulations?: CmdSimulation | MultiCmdSimulation): A[] | A | null
}

export interface RunCmd<A extends Action> {
    readonly type: "RUN"
    readonly func: Function
    readonly args?: any[]
    readonly failActionCreator?: ActionCreator<A>
    readonly successActionCreator?: ActionCreator<A>
    readonly forceSync?: boolean
    simulate(simulation: CmdSimulation): A
}

//deprecated types
export type SequenceCmd<A extends Action> = ListCmd<A>
export type BatchCmd<A extends Action> = ListCmd<A>

export type CmdType<A extends Action> =
    | ActionCmd<A>
    | ListCmd<A>
    | MapCmd<A>
    | NoneCmd
    | RunCmd<A>
    | BatchCmd<A>
    | SequenceCmd<A>

declare function install<S>(): StoreEnhancer<S>

declare function loop<S, A extends Action>(state: S, cmd: CmdType<A>): Loop<S, A>

declare namespace Cmd {
    export const dispatch: symbol
    export const getState: symbol
    export const none: NoneCmd
    export function action<A extends Action>(action: A): ActionCmd<A>
    export function batch<A extends Action>(cmds: CmdType<A>[]): BatchCmd<A>
    export function sequence<A extends Action>(cmds: CmdType<A>[]): SequenceCmd<A>

    export function list<A extends Action>(
        cmds: CmdType<A>[],
        options?: {
            batch?: boolean
            sequence?: boolean
            testInvariants?: boolean
        }
    ): ListCmd<A>

    export function map<A extends Action, B extends Action>(
        cmd: CmdType<B>,
        tagger: (subAction: B) => A,
        args?: any[]
    ): MapCmd<A>

    type RunFuncOptionsShared<TFail> = {
        testInvariants?: boolean
        failActionCreator?: (error: Error) => TFail
    }

    type RunFuncOptions<TSuccess, TFail, T> = RunFuncOptionsShared<TFail> & {
        successActionCreator: (a: T) => TSuccess
    }

    type RunFuncOptionsNoArgs<TSuccess, TFail> = RunFuncOptionsShared<TFail> & {
        successActionCreator: () => TSuccess
    }

    type AsyncF0 = () => any
    type AsyncF1<T> = () => Promise<T> | T
    type AsyncF2<T1, T2> = (a: T1) => Promise<T2> | T2
    type AsyncF3<T1, T2, T3> = (a: T1, a2: T2) => Promise<T3> | T3
    type AsyncF4<T1, T2, T3, T4> = (a: T1, a2: T2, a3: T3) => Promise<T4> | T4

    export function run<TS extends Action, TF extends Action>(
        func: AsyncF0,
        options: RunFuncOptionsNoArgs<TS, TF>
    ): RunCmd<TS | TF>
    export function run<TS extends Action, TF extends Action, T>(
        func: AsyncF1<T>,
        options: RunFuncOptions<TS, TF, T>
    ): RunCmd<TS | TF>
    export function run<TS extends Action, TF extends Action, T1, T2>(
        func: AsyncF2<T1, T2>,
        options: RunFuncOptions<TS, TF, T2> & { args: [T1] }
    ): RunCmd<TS | TF>
    export function run<TS extends Action, TF extends Action, T1, T2, T3>(
        func: AsyncF3<T1, T2, T3>,
        options: RunFuncOptions<TS, TF, T3> & { args: [T1, T2] }
    ): RunCmd<TS | TF>
    export function run<TS extends Action, TF extends Action, T1, T2, T3, T4>(
        func: AsyncF4<T1, T2, T3, T4>,
        options: RunFuncOptions<TS, TF, T4> & { args: [T1, T2, T3] }
    ): RunCmd<TS | TF>
}

export type ReducerMapObject<S, A extends Action = AnyAction> = { [K in keyof S]: LoopReducer<S[K], A> }

declare function combineReducers<S, A extends Action = AnyAction>(
    reducers: ReducerMapObject<S, A>
): LiftedLoopReducer<S, A>

declare function mergeChildReducers<S, A extends Action = AnyAction>(
    parentResult: S | Loop<S, A>,
    action: AnyAction,
    childMap: ReducerMapObject<S, A>
): Loop<S, A>

declare function liftState<S, A extends Action>(state: S | Loop<S, A>): Loop<S, A>

declare function isLoop(test: any): boolean

declare function getModel<S>(loop: S | Loop<S, AnyAction>): S

declare function getCmd<A extends Action>(a: any): CmdType<A> | null
