import { SimulationRenderer } from '../classes/SimulationRenderer'

export const updateSimulation = (
    renderer: SimulationRenderer,
    delta: number
) => {
    const selected = renderer.getSelected()

    if (selected && renderer.movedSelection) {
        renderer.mouseManager.update()
        selected.transform.rotation =
            renderer.mouseManager.getDirection() * renderer.options.dnd.rotation
    } else {
        if (selected) {
            selected.transform.rotation = 0
        }
        renderer.mouseManager.update()
    }
}
