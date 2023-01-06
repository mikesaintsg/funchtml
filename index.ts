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
          value === '*'
            ? ` ${key}`
            : `${acc} ${key}="${
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

export const comment = (...children: NestParam): string =>
  `\<\!--${nest(...children)}-->`
export const doctype = (type: string = 'html'): string => `<!DOCTYPE ${type}>`
export const html = (attributes?: SetParam, ...children: NestParam[]): string =>
  doctype() + element('html')(attributes, ...children)
export const area = element('area', true)
export const base = element('base', true)
export const br = element('br', true)
export const col = element('col', true)
export const embed = element('embed', true)
export const hr = element('hr', true)
export const img = element('img', true)
export const input = element('input', true)
export const link = element('link', true)
export const meta = element('meta', true)
export const param = element('param', true)
export const source = element('source', true)
export const track = element('track', true)
export const wbr = element('wbr', true)
export const a = element('a')
export const abbr = element('abbr')
export const address = element('address')
export const article = element('article')
export const aside = element('aside')
export const audio = element('audio')
export const b = element('b')
export const bdi = element('bdi')
export const bdo = element('bdo')
export const blockquote = element('blockquote')
export const body = element('body')
export const button = element('button')
export const canvas = element('canvas')
export const caption = element('caption')
export const cite = element('cite')
export const code = element('code')
export const colgroup = element('colgroup')
export const data = element('data')
export const datalist = element('datalist')
export const dd = element('dd')
export const del = element('del')
export const details = element('details')
export const dfn = element('dfn')
export const dialog = element('dialog')
export const div = element('div')
export const dl = element('dl')
export const dt = element('dt')
export const em = element('em')
export const fieldset = element('fieldset')
export const figcaption = element('figcaption')
export const figure = element('figure')
export const footer = element('footer')
export const form = element('form')
export const h1 = element('h1')
export const h2 = element('h2')
export const h3 = element('h3')
export const h4 = element('h4')
export const h5 = element('h5')
export const h6 = element('h6')
export const head = element('head')
export const header = element('header')
export const hgroup = element('hgroup')
export const i = element('i')
export const iframe = element('iframe')
export const ins = element('ins')
export const kbd = element('kbd')
export const label = element('label')
export const legend = element('legend')
export const li = element('li')
export const main = element('main')
export const map = element('map')
export const mark = element('mark')
export const menu = element('menu')
export const meter = element('meter')
export const nav = element('nav')
export const noscript = element('noscript')
export const object = element('object')
export const ol = element('ol')
export const optgroup = element('optgroup')
export const option = element('option')
export const output = element('output')
export const p = element('p')
export const picture = element('picture')
export const pre = element('pre')
export const progress = element('progress')
export const q = element('q')
export const rp = element('rp')
export const rt = element('rt')
export const ruby = element('ruby')
export const s = element('s')
export const samp = element('samp')
export const script = element('script')
export const section = element('section')
export const select = element('select')
export const slot = element('slot')
export const small = element('small')
export const span = element('span')
export const strong = element('strong')
export const style = element('style')
export const sub = element('sub')
export const summary = element('summary')
export const sup = element('sup')
export const table = element('table')
export const tbody = element('tbody')
export const td = element('td')
export const template = element('template')
export const textarea = element('textarea')
export const tfoot = element('tfoot')
export const th = element('th')
export const thead = element('thead')
export const time = element('time')
export const title = element('title')
export const tr = element('tr')
export const u = element('u')
export const ul = element('ul')
export const video = element('video')
