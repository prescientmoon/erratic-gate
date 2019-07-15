export const clamp = (low: number, high: number, current: number) => {
    if (current < low) return low
    if (current > high) return high

    return current
}
