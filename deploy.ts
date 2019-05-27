import { publish } from "gh-pages"
import { exec } from "child_process"

const args = process.argv.splice(2)
const argsNoFlags = args.filter(val => val[0] !== "-")


const mFlag = ((args.indexOf("--message") + 1) || (args.indexOf("-m") + 1)) - 1
const message = (mFlag) ? args[mFlag + 1] : "automated update"

console.log("Deploying...");

const run = (command: string): Promise<string> => {
    return new Promise((res, rej) => {
        console.log(`🏃  Running: '${command}'`)
        exec(command, (err, stdout, stderr) => {
            if (err != null)
                rej(err)
            else if (typeof (stderr) != "string")
                rej(new Error(stderr))
            else
                res(stdout)
        })
    })
}


(async () => {
    try {
        if (!args.includes("--skipBuild") && !args.includes("-sb"))
            await run("npm run build")
        await run("git add .")
        await run(`git commit -m "${message}"`)
        await run("git push origin master")
        await new Promise((res, rej) => {
            console.log("🏃  Updating github pages")
            publish("dist", (err) => {
                if (err)
                    rej(err)

                console.log(`😄  Succesfully published to github pages`)
                res(true)
            })
        })
    }
    catch (err) {
        console.log(`😭  Something went wrong: ${err}`)
    }
})()