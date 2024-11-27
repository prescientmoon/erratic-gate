const carryExplanation = (half = true) => `
    The carry out is necessary to preserve the bit count
    (the maximum sum of 2 n-bit integers ${
      half ? '' : 'and a carry'
    } beeing 1 << (n + 1) - ${half ? 2 : 1})
`

const output = `General purpouse output component.`
const delay = `
    The delay is a property of the gate and can be modified by left clicking on the gate in the simulation view.
`

export const descriptions: Record<string, string> = {
  not: `
        The not gate is one of the most basic logic gates.
        It outputs the inverse of the input
    `,
  and: `
        The and gate outputs true only if both inputs are true.
        The and gate is the logic equivalent of f(x, y) = x * y
    `,
  or: `
        The or gate outputs true if any of the inputs is true.
        The or gate is the logic equivalent of f(x, y) = x + y - x * y
    `,
  nand: `
        The nand gate only outputs true if none or one of the inputs is true.
        The nand gate is the logic equivalent of f(x, y) = 1 - x * y
    `,
  nor: `
        The nor gate only outputs true if none of the inputs is true.
        The nor gate is the logic equivalent of f(x, y) = 1 + x * y - (x + y)
    `,
  xor: `
        The xor gate (also known as the 'exclusive or' gate) only outputs true if one and only one of the inputs is true.
        The xor gate is the logic equivalent of f(x, y) = x + y - 2 * x * y
    `,
  xnor: `
        The xnor gate (also known as the 'not exlusive or' gate) only outputs true if none or both the inputs are true.
        The xnor gate is the logic equivalent of f(x, y) = 1 - |x - y|
    `,
  'half adder': `
        The half adder is used to add 2 numbers. It outputs a result and a carry.
        ${carryExplanation()}
        The half adder is the logic equivalent of f(x, y) = { x + y - 2 * x * y, x * y }
    `,
  'full adder': `
        The full adder is the building block for almos all math related circuit.
        The full adder is used to add 2 number and a carry. It outputs a result and a carry.
        ${carryExplanation(false)}
        The full adder is the logic equivalent of f(x, y, z) = {
            x + y + z + 4 * x * y * z - 2 * (x * y + y * z + z * x),
            x * y + y * z + z * x - 2 * x * y * z
        }
    `,
  comparator: `
        Compares the 2 inputs. The first input is only true if a > b, the second input is
        only true if a === b and the 3rd input is only true if a < b.
    `,
  'parallel delayer': `
        Delays the inputs by a amount of time. ${delay}
    `,
  'sequential delayer': `
        Delays the input by a certain amount of time relative to the last change. ${delay}
    `,
  '4 bit encoder': `
        Encodes the 4 inputs into a single output
    `,
  '4 bit decoder': `
        Splits the input into 4 outputs
    `,
  'bit merger': `
        Merges the bits of both inputs into 1 output
    `,
  'bit splitter': `
        Splits the bits from the input into 2 chunks of the same length
    `,
  button: `
        Outputs either 0 or 1. Has no inputs. You can change its value by left clicking on it.
    `,
  'light bulb': `
        ${output} The color changes based on the input.
    `,
  'rgb light': `
        ${output} The color is a based on the 3 inputs. The first input means red, the second green and the third blue.
    `,
  incrementor: `
        Outputs the input + 1
    `,
  constant: `
        Outputs a numeric constant configured (like any other property) by right-clicking the component
    `
}
