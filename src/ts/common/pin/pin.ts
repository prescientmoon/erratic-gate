import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators"
import clamp from "../clamp/clamp";
import { Component } from "../component";

export class Pin {
    private static lastId = 0

    public pairs: Pin[] = []
    private subscriptions: {
        subscription: Subscription
        key: Pin
    }[] = []

    public id: number
    public _value = 0
    public color = new BehaviorSubject<[number, number, number, number]>([0, 0, 0, 0])
    public memory: any = {}
    public valueChanges = new Subject<number>()

    public svgColor = this.color.pipe(map(val =>
        `rgba(${val.join(",")})`
    ))

    constructor(public allowWrite = true, public of: Component) {
        this.setValue(0)
        this.id = Pin.lastId++
    }

    get value() {
        return this._value
    }

    set value(value: number) {
        if (!this.allowWrite) return
        this.setValue(value)
    }

    public setValue(value: number) {
        this._value = clamp(value, 0, 1)
        this.valueChanges.next(this._value)

        const color: [number, number, number, number] = (value > 0.5) ?
            [255, 216, 20, 1] :
            [90, 90, 90, 1]

        this.color.next((this.pairs.length) ? color : [0, 0, 0, 0])
    }

    public bindTo(pin: Pin) {
        this.pairs.push(pin)
        const subscription = pin.valueChanges.subscribe(val => this.setValue(val))

        this.subscriptions.push({
            subscription,
            key: pin
        })
    }

    public unbind(pin: Pin) {
        if (this.pairs.includes(pin)) {
            this.pairs = this.pairs.filter(val => val !== pin)
            this.subscriptions.filter(val => val.key === pin).forEach(({ subscription }) => subscription.unsubscribe())
        }
    }

    public update() {
        this.setValue(this._value)
    }
}