import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const MandarinTranslation: Translation = {
    language: '中文',
    sidebar: {
        createSimulation: '创作',
        logicGates: '逻辑门',
        openSimulation: '打开模拟',
        simulation: '模拟',
        language: '语言',
        backToSimulation: '回到模拟',
        backToGates: '回到逻辑门'
    },
    createSimulation: {
        mode: {
            question: '你想要创造什么样的模拟？',
            options: {
                ic: '集成电路',
                project: '项目'
            }
        },
        name: {
            question: '你希望你的模拟交什么？'
        }
    },
    actions: {
        save: '存盘',
        clean: '清理',
        refresh: '刷新',
        undo: '消除',
        paste: '粘贴',
        copy: '重做',
        duplicate: '复制',
        cut: '剪切',
        'select all': '全选',
        'delete selection': '删去选着',
        'delete simulation': '删去模拟'
    },
    messages: {
        createdSimulation: name => `成功创建了模拟 '${name}'`,
        switchedToSimulation: name => `成功切换到模拟 '${name}'`,
        savedSimulation: name => `成功存盘了模拟 '${name}'`,
        compiledIc: name => `成功编译了电路 '${name}'`,
        cleaned: name => `成功清理了模拟 '${name}'`,
        refreshed: name => `成功刷新了模拟 '${name}'`,
        undone: name => `成功消除了模拟 '${name}'`,
        deletedSimulation: name => `成功删去了模拟 '${name}'`,
        addedGate: name => `成功加了逻辑门 '${name}'`
    }
}
