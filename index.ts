import * as util from 'util'

export const interpolateUtilInspectedFunctions = function (acc: string, curr) {
  curr = Array.isArray(curr) ? curr[1] : curr
  return typeof curr === 'function'
    ? acc.replace(util.inspect(curr), curr.toString())
    : acc
}

export const toStrictString = function (item: any): string {
  return (
    item.constructor === Object
      ? Object.entries(item).reduce(
          interpolateUtilInspectedFunctions,
          util.inspect(item)
        )
      : Array.isArray(item)
      ? item.reduce(interpolateUtilInspectedFunctions, util.inspect(item))
      : item.toString()
  ).replace(/\s+/gm, ' ')
}

export type SetParam = Object | (() => Object)
export const set = function (attributes: SetParam): string {
  return typeof attributes === 'function'
    ? set(attributes())
    : Object.entries(attributes).reduce(
        (acc, [key, value]) =>
          `${acc} ${key}="${
            typeof value === 'function'
              ? toStrictString(value())
              : toStrictString(value)
          }"`,
        ''
      )
}

export type NestParam = any | (() => any)
export const nest = function (...children: NestParam[]): string {
  return children
    .map((child) =>
      typeof child === 'function'
        ? toStrictString(child())
        : toStrictString(child)
    )
    .join('')
}

export const element = function (tagName: string, selfClose = false) {
  return function (attributes?: SetParam, ...children: NestParam[]): string {
    return selfClose
      ? `<${tagName + set(attributes ?? {})}>`
      : `<${tagName + set(attributes ?? {})}>${nest(...children)}</${tagName}>`
  }
}
