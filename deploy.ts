import { publish } from "gh-pages"

console.log("Deploying...");

(async () => {
    await new Promise((res, rej) => {
        console.log("Updating github pages")
        publish("dist", (err) => {
            if (err)
                rej(err)

            console.log(`😄  Succesfully published to github pages`)
            res(true)
        })
    })
})()