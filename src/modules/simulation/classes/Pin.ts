import { SubscriptionData } from '../types/SubscriptionData'
import { BehaviorSubject } from 'rxjs'

export class Pin {
    public state = new BehaviorSubject(false)
    public connectedTo = new Set<Pin>()

    private pairs = new Set<Pin>()
    private subscriptions: SubscriptionData<Pin>[] = []

    public addPair(pin: Pin) {
        this.pairs.add(pin)

        const rawSubscription = pin.state.subscribe(state => {
            this.state.next(state)
        })

        this.subscriptions.push({
            data: pin,
            subscription: rawSubscription
        })
    }

    public removePair(pin: Pin) {
        this.pairs.delete(pin)

        for (const subscription of this.subscriptions) {
            if (subscription.data === pin) {
                subscription.subscription.unsubscribe()
            }
        }

        this.subscriptions = this.subscriptions.filter(
            subscription => subscription.data !== pin
        )
    }

    public dispose() {
        for (const subscription of this.subscriptions) {
            subscription.subscription.unsubscribe()
        }
    }
}
