import { BehaviorSubject } from 'rxjs'
import { supportedLanguage } from '../types/supportedLanguages'

/**
 * Subject with the current language
 */
export default new BehaviorSubject<supportedLanguage>('english')
