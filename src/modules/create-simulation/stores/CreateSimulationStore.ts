import { BehaviorSubject, Subject } from 'rxjs'
import { take } from 'rxjs/operators'
import { simulationMode } from '../../saving/types/SimulationSave'
import { InputStore } from '../../input/stores/InputStore'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'

export type CreateSimulationStoreAction = 'quit' | 'submit'

export const CreateSimulationStore = {
    create: async () => {
        CreateSimulationStore.open()

        const action = await CreateSimulationStore.actions
            .pipe(take(1))
            .toPromise()

        const translation = CurrentLanguage.getTranslation()

        CreateSimulationStore.close()

        if (action === 'quit') {
            return null
        }

        const name = await InputStore.get(
            translation.createSimulation.name.question
        )

        if (!name) {
            return null
        }

        return {
            mode: CreateSimulationStore.data.output.value,
            name
        }
    },
    open() {
        CreateSimulationStore.data.open.next(true)
    },
    close() {
        CreateSimulationStore.data.open.next(false)
    },
    data: {
        open: new BehaviorSubject(false),
        output: new BehaviorSubject<simulationMode>('project')
    },
    actions: new Subject<CreateSimulationStoreAction>()
}
