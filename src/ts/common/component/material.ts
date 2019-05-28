import { TemplateResult, svg, SVGTemplateResult, Part } from "lit-html";
import { Subject, BehaviorSubject } from "rxjs";
import { materialMode } from "./interfaces";

declare function require<T>(path:string):T

type partFactory = (part:Part) => void

export class Material {
    private static images: {
        [key: string]: string
    } = {
        and: require("../../../assets/and_gate.jpg")
    }

    private static cached = new Map()

    public color = new BehaviorSubject<string>("rgba(0,0,0,0)")

    constructor (public mode: materialMode,public name:string) {
        const saved = Material.cached.get(mode + name)
        
        if (saved)
            return saved

        else Material.cached.set(mode + name,this)

        if (this.mode === "color")
            this.color.next(name)
    }

    innerHTML (x: partFactory, y: partFactory, w: partFactory, h: partFactory) {
        return svg`<foreignobject x=${x} y=${y} width=${w} height=${h}>
            <div class="component-container">
                <img src=${Material.images[this.name]} height="97%" width="97%" draggable=false class="component">
            </div>
        </foreignobject>`
    }
}