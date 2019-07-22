import { useObservable } from 'rxjs-hooks'
import currentLanguageSubject from '../subjects/currentLanguageSubject'
import { translations } from '../constants'

/**
 * Hook to get the current translation
 */
export const useTranslation = () => {
    const currentLanguage = useObservable(
        () => currentLanguageSubject,
        'english'
    )
    const translation = translations[currentLanguage]

    return translation
}
