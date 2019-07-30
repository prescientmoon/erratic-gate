import { BehaviorSubject, Subject } from 'rxjs'

export const open = new BehaviorSubject<boolean>(false)
export const id = new BehaviorSubject<number>(0)
