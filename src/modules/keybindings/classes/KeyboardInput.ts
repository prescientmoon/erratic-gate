import { fromEvent, Subject, Subscription } from 'rxjs'
import keycode from 'keycode'

export class KeyboardInput {
    /**
     * boolean showing the state of the event
     */
    public value = false

    /**
     * array with all the pressed keys
     */
    private pressed: Array<string> = []

    /**
     * the keys to listen for events to
     */
    private keys: Array<string>

    /**
     * an observable of the state o the event
     */
    public valueChanges = new Subject<boolean>()

    /**
     * keeps track of the subscriptions for disposing
     */
    private subscription: Array<Subscription> = []

    /**
     * Check if a key is pressed
     */
    private isPressed(key: string, event: KeyboardEvent) {
        return (key === 'ctrl' && event.metaKey) || keycode(event) === key
    }

    /**
     * use for keyboard events
     * @param params the keys to listen to
     */
    public constructor(...params: string[]) {
        //save the keys
        this.keys = params

        //push a new subscription to the subscriptions array
        this.subscription.push(
            fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
                //remember the length of the pressed array
                //used to see if anything changed
                const last = this.pressed.length
                //iterate over the keys it listens to
                //if the key is pressed and it isnt already pressed,
                //then add it to the pressed array
                for (let i of this.keys)
                    if (this.isPressed(i, e) && this.pressed.indexOf(i) == -1)
                        this.pressed.push(i)

                //if there was no key pressd before, and now there is
                //then change the state of the event and emit it
                if (last == 0 && this.pressed.length != 0) {
                    this.value = true
                    this.valueChanges.next(this.value)
                }
            })
        )

        //push a new subscription to the subscriptions array
        this.subscription.push(
            fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
                //remember the length of the pressed array
                //used to see if anything changed
                const last = this.pressed.length

                //iterate over the keys it listens to
                //if the key is released and it was pressed,
                //then remove it from the pressed array
                for (let i of this.keys)
                    if (this.isPressed(i, e) && this.pressed.indexOf(i) != -1)
                        this.pressed.splice(this.pressed.indexOf(i), 1)

                //if there was at least a key pressd before, and now there isnt
                //also, if the state was true
                //then change the state of the event and emit it
                if (this.value && last > 0 && this.pressed.length == 0) {
                    this.value = false
                    this.valueChanges.next(this.value)
                }
            })
        )
    }

    /**
     * ends the listening
     */
    public dispose() {
        this.subscription.forEach((e) => e.unsubscribe())
        this.value = false
        this.valueChanges.next(false)
        this.valueChanges.complete()
    }
}
