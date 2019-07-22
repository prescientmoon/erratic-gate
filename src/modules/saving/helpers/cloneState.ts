/**
 * Very basic JSON based object cloning
 *
 * @param state The object to clone
 */
export const cloneState = <T>(state: T): T => JSON.parse(JSON.stringify(state))
