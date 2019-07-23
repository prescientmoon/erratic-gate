/**
 *
 * @param ctx The context to draw on
 * @param x the x of the rect
 * @param y the y of the rect
 * @param width the width of the rect
 * @param height the height of the rect
 * @param radius the radius of the corners
 */
export function roundImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number = 0,
    y: number = 0,
    width: number = 100,
    height: number = 100,
    radius: number = 5
) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()

    ctx.save()
    ctx.clip()
    ctx.drawImage(image, x, y, width, height)
    ctx.restore()
}
