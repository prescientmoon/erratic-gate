import { BehaviorSubject } from 'rxjs'
import { supportedLanguages } from '../types/supportedLanguages'

/**
 * Subject with the current language
 */
export default new BehaviorSubject<supportedLanguages>('english')
