import { Singleton } from "@eix/utils";
import { ComponentManager } from "../componentManager";
import { success, error } from "toastr"

@Singleton
export class Settings {
    version = "1.0.0"

    commands = (ctx: ComponentManager, args: string[], flags: string[]) => {
        //important flags
        for (let i of flags) {
            if (i === "--version" || i === "-v")
                return success(`${this.version}`, "", ctx.alertOptions)
        }

        const command = args[0]

        if (command === undefined)
            return success(
                `Welcome to the settings cli. You can use this to tweak settings in any way imaginable!`,
                "",
                ctx.alertOptions)

        //nothing here
        error(`Commands ${args} couldnt be found`,"",ctx.alertOptions)
    }

    constructor() { }
}