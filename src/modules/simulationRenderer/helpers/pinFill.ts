import { Pin } from '../../simulation/classes/Pin'

export const pinFill = (pin: Pin) => {
    let color = 'rgba(0,0,0,0)'

    if (pin.connectedTo.size) {
        if (pin.state) {
            color = 'yellow'
        } else {
            color = 'grey'
        }
    }

    return color
}
