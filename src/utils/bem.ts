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
