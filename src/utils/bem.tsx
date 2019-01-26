import * as React from "react"

export function element(className: string, value: string) {
    return `${className}__${value}`
}

export const isFunction = (f: any): f is () => void => "function" === typeof f
const isValid = (pred: boolean | (() => boolean)) => (isFunction(pred) ? pred() : pred)

export function block(name: string, modifiers: SMap<boolean | (() => boolean)> = {}, className: string = "") {
    return Object.keys(modifiers).reduce(
        (classNames, modifier) => classNames + (isValid(modifiers[modifier]) ? ` ${name}--${modifier}` : ""),
        className ? `${className} ${name}` : name
    )
}

export function bindBem(name: string) {
    return {
        element: (elementName: string) => element(name, elementName),
        block: (modifiers: SMap<boolean | (() => boolean)> = {}, className = "") => block(name, modifiers, className)
    }
}

type Props = React.HTMLAttributes<HTMLDivElement> & { name: string }

export const bemDiv = (blockName: string): React.SFC<Props> => ({ name, children, ...props }) => (
    <div {...props} className={bindBem(blockName).element(name)}>
        {children}
    </div>
)

export const bemElement = (el: F1<string | string[], string>): React.SFC<Props> => ({ name, children, ...props }) => (
    <div {...props} className={el(name)}>
        {children}
    </div>
)

interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
    modifiers?: SMap<boolean | (() => boolean)>
    className?: string
}

export const bemBlock = (blockFunc: F2<SMap<boolean | (() => boolean)>, string, string>): React.SFC<ElementProps> => ({
    modifiers,
    className,
    children,
    ...props
}) => (
    <div {...props} className={blockFunc(modifiers || {}, className || "")}>
        {children}
    </div>
)

export const bind = (name: string) => {
    const bem = bindBem(name)
    return { ...bem, Element: bemElement(bem.element), Block: bemBlock(bem.block) }
}
