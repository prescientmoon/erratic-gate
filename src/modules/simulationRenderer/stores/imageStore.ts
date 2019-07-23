import { imageQuality } from '../constants'
import { SimulationError } from '../../errors/classes/SimulationError'

/**
 * Creates an image from a given url
 *
 * @param url The url of the image
 */
export const toImage = (url: string) => {
    const image = new Image(...imageQuality)
    image.src = url

    return image
}

/**
 * Store to be sure no more than 1 image oer url is created
 */
export const ImageStore = {
    /**
     * Map holding the url - image pairs
     */
    memory: new Map<string, HTMLImageElement>(),

    /**
     * If the image doesnt exist it'll create it from the url.
     * If it does the method does nothing.
     *
     * @param url the url of the image
     */
    set(url: string) {
        if (!ImageStore.memory.has(url)) {
            ImageStore.memory.set(url, toImage(url))
        }
    },

    /**
     * Returns the image object from the given url
     *
     *
     * @throws SimulationError if the image doesnt exist
     *
     * @param url The url of the image
     */
    get(url: string) {
        const image = ImageStore.memory.get(url)

        if (!image) {
            throw new SimulationError(`Cannot get image ${url}`)
        }

        return image
    }
}
