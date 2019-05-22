export type activationInput = any[]
export type activationOutput = boolean
export type activationFunctionParam = ( (data:activationInput) => activationOutput ) | string
export type activationFunction = (data:activationInput) => activationOutput