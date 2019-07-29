import { BehaviorSubject, Subject } from 'rxjs'

export const open = new Subject<boolean>()
export const id = new BehaviorSubject<number>(0)
