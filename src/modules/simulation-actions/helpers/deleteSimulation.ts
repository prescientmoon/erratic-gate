import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { saveStore } from '../../saving/stores/saveStore'
import { removeElement } from '../../../common/lang/arrays/helpers/removeElement'
import { initSimulation } from '../../saving/helpers/initSimulation'
import { defaultSimulationName } from '../../saving/constants'
import { randomItem } from '../../internalisation/helpers/randomItem'
import { switchTo } from '../../saving/helpers/switchTo'

export const deleteSimulation = (renderer: SimulationRenderer) => {
    const current = renderer.simulation.name

    const others = saveStore.ls()
    removeElement(others, current)

    if (!others.length) {
        initSimulation(defaultSimulationName, 'project')
    }

    const switchTarget = randomItem(others)
    switchTo(switchTarget)

    // actually delete simulation
    saveStore.delete(current)
}
