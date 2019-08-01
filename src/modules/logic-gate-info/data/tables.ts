import {
    allCombinations,
    recursiveCombinations
} from '../../simulation/helpers/allCombinations'

const _2i1oColumns = ['Input A', 'Input B', 'Output']

const adderData = (half = true) => {
    return recursiveCombinations([0, 1], half ? 2 : 3).map(combination => {
        const a = combination[0] + combination[1] + (half ? 0 : combination[2])

        return [...combination, Number(a % 2 === 1), Number(a >= 2)]
    })
}

export const ioTables: Record<
    string,
    {
        columns: string[]
        data: number[][]
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
    }
}
