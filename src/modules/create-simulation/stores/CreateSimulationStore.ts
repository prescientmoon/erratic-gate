import { BehaviorSubject, Subject } from 'rxjs'
import { take } from 'rxjs/operators'
import { simulationMode } from '../../saving/types/SimulationSave'
import { InputStore } from '../../input/stores/InputStore'

export type CreateSimulationStoreAction = 'quit' | 'submit'

export const CreateSimulationStore = {
    create: async () => {
        CreateSimulationStore.open()

        const action = await CreateSimulationStore.actions
            .pipe(take(1))
            .toPromise()

        CreateSimulationStore.close()

        if (action === 'quit') {
            return null
        }

        const name = await InputStore.get(
            'What do you want your simulation to be called?'
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
