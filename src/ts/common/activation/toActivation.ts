import { activationFunctionParam, activationFunction } from "./interfaces";

export const toActivationFunction = (original: activationFunctionParam) => {
    const stringified = (typeof original == "string") ? original : original.toString()
    const final = new Function(`return ${stringified}`) as () => activationFunction

    return final()
}