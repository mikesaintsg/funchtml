import { assert, describe, test } from 'vitest'
import { element, nest, set } from './index'

describe('set function', () => {
  test('will generate an attribute pair string', () =>
    assert.equal(set({ key: 'value' }), ' key="value"'))

  test('will generate with space between two attribute pair strings', () =>
    assert.equal(
      set({ key1: 'value1', key2: 'value2' }),
      ' key1="value1" key2="value2"'
    ))

  test('will force the returned function into a string', () =>
    assert.equal(
      set({
        function: () => (param) => {
          return param
        }
      }),
      ` function="(param) => { return param; }"`
    ))

  test('will force a boolean into a string', () =>
    assert.equal(
      set({
        boolean: true
      }),
      ` boolean="true"`
    ))

  test('will force an array and its nested values into a string', () =>
    assert.equal(
      set({
        array: ['string', true, { key: 'value' }, ['array', 'array'], () => {}]
      }),
      ` array="[ 'string', true, { key: 'value' }, [ 'array', 'array' ], () => { } ]"`
    ))

  test('will force an object and its nested values to be string', () =>
    assert.equal(
      set({
        object: {
          string: 'string',
          boolean: true,
          object: { key: 'value' },
          array: ['array', 'array'],
          function: () => {}
        }
      }),
      ` object="{ string: 'string', boolean: true, object: { key: 'value' }, array: [ 'array', 'array' ], function: () => { } }"`
    ))
})

describe('nest function', () =>
  test('will generate string of children', () =>
    assert.equal(nest('text', '<child>'), 'text<child>')))

describe('element function', () => {
  test('will generate an element string', () =>
    assert.equal(element('element')(), '<element></element>'))

  test('can generate a selfClosing element string', () =>
    assert.equal(element('element', true)(), '<element>'))

  test('can add attributes to an element string', () =>
    assert.equal(
      element('element', false)( { key1: 'value1', key2: 'value2' }),
      '<element key1="value1" key2="value2"></element>'
    ))

  test('can add attributes to a selfClosing element string', () =>
    assert.equal(
      element('element', true)({ key1: 'value1', key2: 'value2' }),
      '<element key1="value1" key2="value2">'
    ))

  test('can add children to an element string', () =>
    assert.equal(
      element(
        'element',
        false)({ key1: 'value1', key2: 'value2' },
        'text',
        '<child>'
      ),
      '<element key1="value1" key2="value2">text<child></element>'
    ))

  test("won't add children to a selfClosing element string", () =>
    assert.equal(
      element(
        'element',
        true)({ key1: 'value1', key2: 'value2' },
        'text',
        '<child>'
      ),
      '<element key1="value1" key2="value2">'
    ))
})
