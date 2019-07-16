import { Singleton } from '@eix-js/utils'
import { MouseSubject } from '../../core/types/MouseSubject'
import { clamp } from '../helpers/clamp'

@Singleton
export class MouseManager {
    private history: number[] = []
    private total = 0
    private limit = 10
    private lastPosition = 0
    private lastDirection = 0
    private minimumDifference = 10

    private lastMove = performance.now()
    private resetLimit = 500

    // mouseMoveInput is optional because we want to be able to get
    // the instance even if we don't have a subject
    // (as long as we passed one the first time)
    public constructor(public mouseMoveInput?: MouseSubject) {
        if (this.mouseMoveInput) {
            this.mouseMoveInput.subscribe(event => {
                this.lastMove = performance.now()

                const position = event.position[0]
                const dx = position - this.lastPosition

                if (Math.abs(dx) < this.minimumDifference) {
                    this.lastPosition = position
                    return
                }

                if (dx === 0) {
                    this.lastDirection = 0
                } else {
                    this.lastDirection = Math.abs(dx) / dx
                }

                this.lastPosition = event.position[0]
            })
        } else {
            throw new Error(
                'You need to pass a MouseMoveInput the first time you instantiate this class!'
            )
        }
    }

    public getDirection() {
        if (this.history.length) {
            return clamp(-1, 1, this.total / this.history.length)
        }
        return 0
    }

    public update(maybeAgain = true) {
        if (this.lastDirection === 0) {
            return 0
        }

        if (
            this.lastDirection !== 0 &&
            performance.now() - this.lastMove > this.resetLimit
        ) {
            this.lastDirection = 0
        }

        this.history.push(this.lastDirection)

        this.total += this.lastDirection

        if (this.history.length > this.limit) {
            const removed = this.history.shift()

            if (removed !== undefined) {
                this.total -= removed
            }
        }
    }

    public clear(value?: number) {
        if (value) {
            this.lastPosition = value
        }
        this.history = []
        this.total = 0
        this.lastMove = performance.now()
        this.lastDirection = 0
    }
}
