import './QuestionModal.scss'
import { useObservable } from 'rxjs-hooks'
import { QuestionSubject } from '../QuestionModalSubjects'
import React from 'react'

const QuestionModal = () => {
    const question = useObservable(() => QuestionSubject)

    if (!question) return <></>

    return <div className="questionModal">{question.text}</div>
}

export default QuestionModal
