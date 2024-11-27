import { Splash } from './modules/splash/classes/Splash'

/**
 * The function wich is run when the app is loaded
 */
async function main() {
  // Create splash screen variable
  let splash: Splash | undefined = undefined

  try {
    // instantiate splash screen
    splash = new Splash()
  } catch {}

  try {
    // import main app
    const app = await import('./main')

    // wait for app to start
    await app.start()
  } catch (error) {
    // show the error to the client
    if (splash) splash.setError(error)

    // log the error to the console
    console.error(error.stack || error)
    return
  }

  // hide splash screen if it exists
  if (splash) {
    splash.fade()
  }
}

new EventSource('/esbuild').addEventListener('change', () => location.reload())

// Call entry
main().catch((error) => {
  // if the error handling error has an error, log that error
  console.error('Error loading app', error)
})
