import * as React from "react"
interface Props {
    text: string
    important?: boolean
    className?: string
}
import "./Title.scss"
import { bindBem } from "../utils/bem"
const { block, element } = bindBem("Title")

export const Title: React.SFC<Props> = ({ text, className, important }) => {
    let result: JSX.Element[] | string = text
    const hProps = { className: block({ important }, className) }
    const hasN = text && text.indexOf("\n") >= 0
    const hasQuotedN = text && text.indexOf("\\n") >= 0

    if (hasN || hasQuotedN) {
        result = text.split(hasN ? "\n" : "\\n").map((item, index) => (
            <span key={index}>
                {index === 0 ? null : <br />}
                {item}
            </span>
        ))
    }

    return (
        <h4 {...hProps}>
            <span className={element("Content")}>{result}</span>
        </h4>
    )
}
