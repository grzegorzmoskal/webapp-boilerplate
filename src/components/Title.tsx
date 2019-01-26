import * as React from "react"
import { bind } from "../utils/bem"
import "./Title.scss"

const { Block, Element } = bind("Title")
type Props = { text: string; important?: boolean }

export const Title: React.SFC<Props> = ({ text, important }) => (
    <Block modifiers={{ important: !!important }}>
        <Element name="Content">{text}</Element>
    </Block>
)
