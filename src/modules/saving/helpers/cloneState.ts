export const cloneState = <T>(state: T): T => JSON.parse(JSON.stringify(state))
