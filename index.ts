import * as util from "util";

export const toString = function(item: any): string {
    if(item.constructor === Object || Array.isArray(item)) return util.inspect(item)
    return item.toLocaleString()
}

export const set = function (attributes: Object | (() => Object)): string {
    return Object.entries(attributes).reduce((acc, [key, value]) => `${acc} ${key}="${
        typeof value === 'function' ? toString(value()) : toString(value)
    }"`,'')
}

export const nest = function (...children: (string | (() => string))[]): string {
    return children.map(child => typeof child === 'function' ? child() : child).join('')
}

export const element = function (
    tagName: string,
    selfClose: boolean = false,
    attributes?: Object | (() => Object),
    ...children: (string | (() => string))[]
): string {
    return selfClose ? `<${tagName + set(attributes ?? {})}>` : `<${tagName + set(attributes ?? {})}>${nest(...children)}</${tagName}>`
}