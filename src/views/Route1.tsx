import * as React from "react"
import { Title } from "../components/Title"
import { actions } from "../store"
import { connect } from "react-redux"

type Props = { date: string }
type Actions = { updateDate: F0 }
const Route1Plain: React.SFC<Props & Actions> = p => (
    <>
        <Title text="Route 1" />
        <h1>{p.date}</h1>
        <button onClick={p.updateDate}>update date</button>
    </>
)
export const Route1 = connect<Props, Actions>(
    (s: RootState) => ({ date: s.app.date }),
    d => ({ updateDate: () => d(actions.updateDate()) })
)(Route1Plain)
