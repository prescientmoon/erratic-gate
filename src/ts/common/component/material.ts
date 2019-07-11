import { svg, Part } from 'lit-html'
import { BehaviorSubject } from 'rxjs'
import { materialMode } from './interfaces'

declare function require<T>(path: string): T

type partFactory = (part: Part) => void

export class Material {
    private static images: {
        [key: string]: string
    } = {
        and: require('../../../assets/and_gate.jpg'),
        or: require('../../../assets/or_gate.png'),
        xor: require('../../../assets/xor_gate.png'),
        nor: require('../../../assets/nor_gate.png')
    }

    public color = new BehaviorSubject<string>('rgba(0,0,0,0)')

    constructor(public mode: materialMode, public data: string) {
        if (this.mode === 'color') this.color.next(data)
    }

    innerHTML(x: partFactory, y: partFactory, w: partFactory, h: partFactory) {
        const src =
            this.mode === 'standard_image'
                ? Material.images[this.data]
                : this.data

        return svg`<foreignobject x=${x} y=${y} width=${w} height=${h}>
            <div class="component-container">
                <img src=${src} height="97%" width="97%" draggable=false class="component">
           </div>
        </foreignobject>`
    }
}
