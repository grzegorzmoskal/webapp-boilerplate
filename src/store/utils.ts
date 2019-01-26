import { Cmd, CmdType, loop, Loop } from "redux-loop"
import { Action } from "redux"

export const sideEfect = (cmd: () => void) =>
    Cmd.run(cmd, {
        successActionCreator: () => null as any,
        failActionCreator: () => null as any
    })

export type Ext<A extends Action = any, TState = RootState> = (
    e: Partial<TState>,
    cmd?: CmdType<A>
) => Loop<TState, A> | TState

export const extend = <A extends Action, TState>(state: TState): Ext<A, TState> => (e, cmd) =>
    cmd
        ? (loop({ ...(state as any), ...(e as any) }, cmd) as Loop<TState, any>)
        : (({ ...(state as any), ...(e as any) } as any) as TState)
