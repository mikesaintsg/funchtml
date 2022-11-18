import * as util from 'util'

export const toString = function (item: any): string {
  if (item.constructor === Object)
    return Object.entries(item).reduce(
      (acc, [_key, value]) =>
        typeof value === 'function'
          ? acc.replace(util.inspect(value), value.toString())
          : acc,
      util.inspect(item)
    )
  if (Array.isArray(item))
    return item.reduce(
      (acc, curr) =>
        typeof curr === 'function'
          ? acc.replace(util.inspect(curr), curr.toString())
          : acc,
      util.inspect(item)
    )
  return item.toString()
}

export const set = function (attributes: Object | (() => Object)): string {
  return Object.entries(attributes).reduce(
    (acc, [key, value]) =>
      `${acc} ${key}="${
        typeof value === 'function'
          ? toString(value()).replace(/\s+/gm, ' ')
          : toString(value).replace(/\s+/gm, ' ')
      }"`,
    ''
  )
}

export const nest = function (
  ...children: (string | (() => string))[]
): string {
  return children
    .map((child) => (typeof child === 'function' ? child() : child))
    .join('')
}

export const element = function (
  tagName: string,
  selfClose: boolean = false,
  attributes?: Object | (() => Object),
  ...children: (string | (() => string))[]
): string {
  return selfClose
    ? `<${tagName + set(attributes ?? {})}>`
    : `<${tagName + set(attributes ?? {})}>${nest(...children)}</${tagName}>`
}
