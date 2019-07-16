import { Subscription } from 'rxjs'

export interface SubscriptionData<T> {
    subscription: Subscription
    data: T
}
