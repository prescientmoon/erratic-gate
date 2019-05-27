export interface WireStateVal {
    from: {
        owner: number
        index: number
    },
    to: {
        owner: number
        index: number
    }
}

export type WireState = WireStateVal[]