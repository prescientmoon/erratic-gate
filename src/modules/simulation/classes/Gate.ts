import { Transform } from './Transform'

export class Gate {
    public static lastId = 0
    public transform = new Transform()
    public id = Gate.lastId++

    public constructor(public color = 'blue') {}
}
