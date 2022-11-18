import { assert, describe, test } from 'vitest'
import { element, nest, set } from './index'

describe('set function', () => {
  test('will generate the attribute pair string', () => {
    assert.equal(set({ key: 'value' }), ' key="value"')
  })

  test('will have space between pair strings', () => {
    assert.equal(
      set({ key1: 'value1', key2: 'value2' }),
      ' key1="value1" key2="value2"'
    )
  })

  test('will force values to be strings', () => {
    assert.equal(
      set({
        function: () => () => {},
        boolean: true,
        object: {
          string: 'string',
          boolean: true,
          object: { key: 'value' },
          array: [],
          function: () => {}
        },
        array: ['string', true, { key: 'value' }, () => {}]
      }),
      ` function="() => { }" boolean="true" object="{ string: 'string', boolean: true, object: { key: 'value' }, array: [], function: () => { } }" array="[ 'string', true, { key: 'value' }, () => { } ]"`
    )
  })
})

describe('nest function', () => {
  test('will generate string of children', () => {
    assert.equal(nest('text', '<child>'), 'text<child>')
  })
})

describe('element function', () => {
  test('will generate an element string', () => {
    assert.equal(element('element'), '<element></element>')
  })

  test('can generate a selfClosing element string', () => {
    assert.equal(element('element', true), '<element>')
  })

  test('can add attributes to an element string', () => {
    assert.equal(
      element('element', false, { key1: 'value1', key2: 'value2' }),
      '<element key1="value1" key2="value2"></element>'
    )
  })

  test('can add attributes to a selfClosing element string', () => {
    assert.equal(
      element('element', true, { key1: 'value1', key2: 'value2' }),
      '<element key1="value1" key2="value2">'
    )
  })

  test('can add children to an element string', () => {
    assert.equal(
      element(
        'element',
        false,
        { key1: 'value1', key2: 'value2' },
        'text',
        '<child>'
      ),
      '<element key1="value1" key2="value2">text<child></element>'
    )
  })

  test("won't add children to a selfClosing element string", () => {
    assert.equal(
      element(
        'element',
        true,
        { key1: 'value1', key2: 'value2' },
        'text',
        '<child>'
      ),
      '<element key1="value1" key2="value2">'
    )
  })
})
