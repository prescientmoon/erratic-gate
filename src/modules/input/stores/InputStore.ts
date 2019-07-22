import { Subject, BehaviorSubject } from 'rxjs'
import { take } from 'rxjs/operators'

export type InputAction = 'quit' | 'submit'

export const InputStore = {
    async get(text: string) {
        InputStore.open(text)

        const action = await InputStore.actions.pipe(take(1)).toPromise()

        InputStore.close()

        if (action === 'quit') {
            return null
        }

        return InputStore.data.output.value
    },
    open(text: string) {
        InputStore.data.open.next(true)
        InputStore.data.output.next('')
        InputStore.data.question.next(text)
    },
    close() {
        InputStore.data.open.next(false)
    },
    data: {
        question: new BehaviorSubject(''),
        output: new BehaviorSubject(''),
        open: new BehaviorSubject(false)
    },
    actions: new Subject<InputAction>()
}
