import { Singleton } from '@eix-js/utils'
import { Observable, fromEvent, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { multiply } from '../../vector2/helpers/basic'

@Singleton
export class Screen {
    public width = new BehaviorSubject<number>(window.innerWidth)
    public height = new BehaviorSubject<number>(window.innerHeight)

    public constructor() {
        const resize = fromEvent(window, 'resize')

        resize
            .pipe(map(() => window.innerWidth))
            .subscribe(val => this.width.next(val))
        resize
            .pipe(map(() => window.innerHeight))
            .subscribe(val => this.height.next(val))
    }

    public get x() {
        return this.width.value
    }

    public get y() {
        return this.height.value
    }

    public get center() {
        return multiply([this.x, this.y], 0.5)
    }
}
