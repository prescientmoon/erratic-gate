import { ComponentManager } from "./componentManager";
import { success } from "toastr"
import { saveAs } from "file-saver" 

const version = "1.0.0"

export const download = (ctx: ComponentManager, args: string[], flags:string[]) => {
    //important flags
    for (let i of flags) {
        if (i === "--version" || i === "-v")
            return success(`${version}`, "", ctx.alertOptions)
        else if (i === "--help" || i === "-h")
            return success(`Run "download" to download the save as a json file.
            Flags:<ul>
                <li>-v or --version to get the version.</li>
                <li>-h or --help to get help (ou are reading that right now)</li>
                <li>-s or --save to automatically save before downloading</li>
            </ul>`,"",ctx.alertOptions)
    }

    const command = args[0]

    if (command === undefined){
        if (flags.includes("-s") || flags.includes("--save"))
            ctx.save()

        const data = JSON.stringify(ctx.state)
        saveAs(new Blob([data]), `${ctx.name}.json`)

    }
} 