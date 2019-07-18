export class SimulationError extends Error {
    public constructor(public mesagge: string = '') {
        super()
    }

    public toString() {
        return `SimulationError: ${this.mesagge}`
    }
}
