import { Transform, vector2 } from './Transform'

export class Gate {
    public static lastId = 0
    public transform = new Transform()
    public id = Gate.lastId++
    public shadow: vector2 = [0, 0]

    public constructor(public color = 'blue') {}
}
