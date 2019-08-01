import { recursiveCombinations } from '../../simulation/helpers/allCombinations'
import { fromChunks } from '../../colors/helpers/fromHex'

const _2i1oColumns = ['Input A', 'Input B', 'Output']
const delayerCols = ['Time', 'Input', 'Output']

const adderData = (half = true) => {
    return recursiveCombinations([0, 1], half ? 2 : 3).map(combination => {
        const a = combination[0] + combination[1] + (half ? 0 : combination[2])

        return [...combination, Number(a % 2 === 1), Number(a >= 2)]
    })
}

const coderData = (encode = true, depth = 4) => {
    return recursiveCombinations([0, 1], depth).map(combination => {
        const final = combination.join('')

        if (encode) {
            return [...combination, final]
        } else {
            return [final, ...combination]
        }
    })
}

export const ioTables: Record<
    string,
    {
        columns: string[]
        data: (string | number)[][]
    }
> = {
    not: {
        columns: ['Input', 'Output'],
        data: [[0, 1], [1, 0]]
    },
    and: {
        columns: _2i1oColumns,
        data: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
    },
    or: {
        columns: _2i1oColumns,
        data: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]
    },
    nor: {
        columns: _2i1oColumns,
        data: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]]
    },
    nand: {
        columns: _2i1oColumns,
        data: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0]]
    },
    xor: {
        columns: _2i1oColumns,
        data: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]]
    },
    xnor: {
        columns: _2i1oColumns,
        data: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
    },
    'half adder': {
        columns: ['x', 'y', 'sum', 'carry out'],
        data: adderData()
    },
    'full adder': {
        columns: ['carry in', 'x', 'y', 'sum', 'carry out'],
        data: adderData(false)
    },
    comparator: {
        columns: ['Input A', `Input B`, `A > b`, `A = b`, `A < B`],
        data: recursiveCombinations([0, 1], 2).map(combination => {
            const [a, b] = combination

            return [
                ...combination,
                Number(a > b),
                Number(a === b),
                Number(a < b)
            ]
        })
    },
    'parallel delayer': {
        columns: delayerCols,
        data: [[0, 1, 0], [500, 0, 0], [1000, 0, 1], [1500, 0, 0]]
    },
    'sequential delayer': {
        columns: delayerCols,
        data: [[0, 1, 0], [500, 0, 0], [1000, 0, 1], [1500, 0, 1], [2000, 0, 0]]
    },
    '4 bit encoder': {
        columns: ['Input A', 'Input B', 'Input C', 'Input D', `Output`],
        data: coderData()
    },
    '4 bit decoder': {
        columns: ['Input', 'Output A', 'Output B', 'Output C', `Output D`],
        data: coderData(false)
    },
    'bit merger': {
        columns: _2i1oColumns,
        data: coderData(true, 2)
    },
    'bit splitter': {
        columns: ['Input', 'Output A', 'Output B'],
        data: coderData(false, 2)
    },
    button: {
        columns: ['Previous', 'Output'],
        data: [0, 1].map(x => [x, Number(!x)])
    },
    'light bulb': {
        columns: ['Input', 'State'],
        data: [0, 1].map(x => [x, x ? 'on' : 'off'])
    },
    'rgb light': {
        columns: ['Red', 'Green', 'Blue', 'Color'],
        data: recursiveCombinations([0, 1], 3).map(combination => {
            return [
                ...combination,
                fromChunks(combination.map(value => (value ? 255 : 0)))
            ]
        })
    }
}
