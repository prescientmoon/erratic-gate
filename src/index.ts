import { Splash } from './modules/splash/classes/Splash'

async function main() {
    let splash: Splash | undefined = undefined

    try {
        splash = new Splash()
    } catch {}

    try {
        const app = await import('./main')

        await app.start()
    } catch (error) {
        if (splash) splash.setError(error)
        console.error(error.stack || error)
        return
    }

    if (splash) {
        splash.fade()
    }
}

main().catch(error => {
    console.error('Error loading app', error)
})
