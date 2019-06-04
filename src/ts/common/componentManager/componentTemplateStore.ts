import { Singleton } from "@eix/utils";
import { Store } from "../store";
import { ComponentTemplate } from "./interfaces";
import { ComponentManager } from "./componentManager";
import { success, error } from "toastr"

@Singleton
export class ComponentTemplateStore {
    public store = new Store<ComponentTemplate>("componentTemplate")

    public commands = {
        template: (ctx: ComponentManager, args: string[], flags: string[]) => {
            const command = args[0]
            switch (command) {
                case (undefined):
                    for (let i of flags) {
                        if (i === "--version" || i === "-v")
                            return success("1.0.1", "", ctx.alertOptions)
                    }

                    error(`Welcome to the component template program!
                        To get started, try running this basic commands:
                            ${["--version", "ls"].map(val => `${val}`).join(" ")}
                    `, "", {
                            ...ctx.alertOptions,
                            timeOut: 7500
                        })

                    break
                case ("ls"):
                    success(`Here is a list of all the current registered component templates (including ics):
                        <ul>
                            ${this.store.ls().map(val => `
                                <li>
                                    ${val}
                                </li>
                            `).join(" ")}
                        </ul>
                    `, "", ctx.alertOptions)
                    break
                case ("info"):
                    if (!args[1])
                        return error("You need to specify a template name", "", ctx.alertOptions)

                    const data = this.store.get(args[1])

                    if (!data)
                        return error(`Component ${args[1]} doesnt exist`, "", ctx.alertOptions)

                    const showFunction = flags.find(value =>
                        value === "-sf" || value === "--showFunctions"
                    )

                    success(`
                        Name: ${data.name} <br>
                        Inputs: ${data.inputs} <br>
                        Outputs: ${data.outputs}
                        ${showFunction ? `<br> Activation: ${data.activation}` : ""}
                    `, "", ctx.alertOptions)
                    break
                default:
                    error(`${command} is not a valid command for the template program`, "", ctx.alertOptions)
            }
        }
    }

    constructor() {
        this.store.set("buffer", {
            inputs: 1,
            outputs: 1,
            name: "buffer",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = ctx.inputs[0].value
            `.trim(),
            material: {
                mode: "color",
                data: "blue"
            }
        })
        this.store.set("not", {
            inputs: 1,
            outputs: 1,
            name: "buffer",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = !ctx.inputs[0].value
            `.trim(),
            material: {
                mode: "color",
                data: "red"
            }
        })
        this.store.set("and", {
            inputs: 2,
            outputs: 1,
            name: "and",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = ctx.inputs[0].value && ctx.inputs[1].value
            `.trim(),
            material: {
                mode: "standard_image",
                data: "and"
            }
        })
        this.store.set("or", {
            inputs: 2,
            outputs: 1,
            name: "or",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = ctx.inputs[0].value || ctx.inputs[1].value
            `.trim(),
            material: {
                mode: "standard_image",
                data: "or"
            }
        })
         this.store.set("xor", {
            inputs: 2,
            outputs: 1,
            name: "xor",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = (ctx.inputs[0].value || ctx.inputs[1].value) && !(ctx.inputs[0].value && ctx.inputs[1].value)
            `.trim(),
            material: {
                mode: "standard_image",
                data: "xor"
            }
        })
        this.store.set("true", {
            inputs: 0,
            outputs: 1,
            name: "true",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = true
            `.trim(),
            material: {
                mode: "color",
                data: "green"
            }
        })
        this.store.set("false", {
            inputs: 0,
            outputs: 1,
            name: "false",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = false
            `.trim(),
            material: {
                mode: "color",
                data: "yellow"
            }
        })
        this.store.set("light", {
            inputs: 1,
            outputs: 0,
            name: "light",
            version: "1.0.0",
            activation: `
                if (ctx.inputs[0].value)
                    ctx.color("yellow")
                else
                    ctx.color("white")
            `.trim(),
            material: {
                mode: "color",
                data: "white"
            }
        })
        this.store.set("button", {
            inputs: 0,
            outputs: 1,
            name: "button",
            version: "1.0.0",
            activation: `
                ctx.outputs[0].value = ctx.outputs[0].memory.value
            `.trim(),
            material: {
                mode: "color",
                data: "red"
            },
            onclick: `
                ctx.outputs[0].memory.value = !ctx.outputs[0].memory.value
                if (ctx.outputs[0].memory.value)
                    ctx.color("#550000")
                else
                    ctx.color("red")
            `
        })
    }
}