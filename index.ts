import * as util from 'util'

export type SetParam = Object | (() => Object)
export type NestParam = string | (() => string)

export const interpolateUtilInspectedFunctions = (acc: string, curr) => {
  curr = Array.isArray(curr) ? curr[1] : curr
  return typeof curr === 'function'
    ? acc.replace(util.inspect(curr), curr.toString())
    : acc
}

export const toStrictString = (item: any): string =>
  (item.constructor === Object
    ? Object.entries(item).reduce(
        interpolateUtilInspectedFunctions,
        util.inspect(item)
      )
    : Array.isArray(item)
    ? item.reduce(interpolateUtilInspectedFunctions, util.inspect(item))
    : item.toString()
  ).replace(/\s+/gm, ' ')

export const set = (attributes: SetParam): string =>
  typeof attributes === 'function'
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

export const nest = (...children: NestParam[]): string =>
  children
    .map((child) => (typeof child === 'function' ? child() : child))
    .join('')

export const element =
  (tagName: string, selfClose: boolean = false) =>
  (attributes?: SetParam, ...children: NestParam[]): string =>
    selfClose
      ? `<${tagName + set(attributes ?? {})}>`
      : `<${tagName + set(attributes ?? {})}>${nest(...children)}</${tagName}>`
