import { Singleton } from "@eix/utils";
import { activationFunction, activationFunctionParam } from "./interfaces"
import { toActivationFunction } from "./toActivation";

@Singleton
export class FunctionStore {
    functions = new Map<string, activationFunction>()

    private storageKeyword: string

    constructor(name="activation") {
        this.storageKeyword  =`/${name}`
        for (let i in localStorage) {
            if (i.indexOf(this.storageKeyword) == 0)
                this.register(i.substr(this.storageKeyword.length), localStorage[i])
        }
    }

    register(name: string, activation: activationFunctionParam) {
        this.functions.set(name, toActivationFunction(activation))
        localStorage[`${this.storageKeyword.substr(1)}/${name}`] = activation
    }
}