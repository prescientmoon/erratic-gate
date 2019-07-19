import { BehaviorSubject } from 'rxjs'

export type Question = null | {
    text: string
    options: {
        text: string
        icon: string
    }[]
}

export const QuestionSubject = new BehaviorSubject<Question>(null)
