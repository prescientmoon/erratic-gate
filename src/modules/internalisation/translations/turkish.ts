import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const TurkishTranslation: Translation = {
    language: 'türkçe',
    sidebar: {
        createSimulation: 'defter yaziyor',
        logicGates: 'kapilar',
        openSimulation: 'defter açiyor',
        simulation: 'defter',
        language: 'dil',
        backToSimulation: "defter'e geri dön",
        backToGates: 'kapilara geri dön'
    },
    createSimulation: {
        mode: {
            question: 'bu defter türü ne?',
            options: {
                ic: 'defter gibi kapi',
                project: 'Proje'
            }
        },
        name: {
            question: 'bu defter ad ne?'
        }
    },
    actions: {
        save: 'kayit',
        clean: 'temizleyor',
        refresh: 'feranlatiyor',
        undo: 'geri almc',
        paste: 'yapistirıyor',
        copy: 'tuturuyor',
        duplicate: 'klonuyor',
        cut: 'kırpıyor',
        'select all': 'seç her şey',
        'delete selection': 'seçım siliyor',
        'delete simulation': 'Defter siliyor'
    },
    messages: {
        createdSimulation: name => `dizüstü çizdi '${name}'`,
        switchedToSimulation: name => `açılan not defteri'${name}'`,
        savedSimulation: name => `kaydedilmiş defter '${name}'`,
        compiledIc: name => `derlenmiş kapı '${name}'`,
        cleaned: name => `temizlenmiş defter '${name}'`,
        refreshed: name => `yenilenmiş defter '${name}'`,
        undone: name => `geri alındı '${name}'`,
        deletedSimulation: name => `silinmiş defter '${name}'`,
        addedGate: name => `eklenen kapı '${name}'`
    }
}
