import { Gate } from '../../simulation/classes/Gate'
import { renderPins } from './renderPins'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { useTransform } from '../../../common/canvas/helpers/useTransform'
import { roundRect } from '../../../common/canvas/helpers/drawRoundedSquare'
import { roundImage } from '../../../common/canvas/helpers/drawRoundedImage'
import { ImageStore } from '../stores/imageStore'
import { gatesInSelection } from './gatesInSelection'
import { idIsSelected } from './idIsSelected'
import { textSettings } from '../data/textSettings'

export const renderGate = (
  ctx: CanvasRenderingContext2D,
  renderer: SimulationRenderer,
  gate: Gate
) => {
  const { active, normal } = gate.template.material.stroke

  const selected =
    (renderer.mouseState >> 2 &&
      !!gatesInSelection(renderer.selectedArea, [gate]).length) ||
    idIsSelected(renderer, gate.id)

  renderPins(ctx, renderer, gate, selected)

  if (selected) {
    ctx.strokeStyle = active
  } else {
    ctx.strokeStyle = normal
  }

  ctx.lineWidth = renderer.options.gates.gateStroke.width

  ctx.save()

  const relativeTransform = useTransform(ctx, gate.transform)
  const renderingParameters = [
    relativeTransform.x,
    relativeTransform.y,
    relativeTransform.width,
    relativeTransform.height,
    gate.template.shape.rounded ? gate.template.shape.radius : 0
  ]

  if (gate.template.material.type === 'image') {
    roundImage(
      ctx,
      ImageStore.get(gate.template.material.fill),
      ...renderingParameters
    )
  }

  roundRect(ctx, ...renderingParameters)

  if (gate.template.material.type === 'color') {
    ctx.fillStyle = gate.template.material.fill

    ctx.fill()
  }

  ctx.stroke()

  if (gate.template.tags.includes('integrated')) {
    ctx.textBaseline = 'top'
    ctx.fillStyle = textSettings.fill
    ctx.fillText(
      gate.template.metadata.name,
      relativeTransform.center[0],
      relativeTransform.maxY + textSettings.offset
    )
  }

  const text = gate.text.inner.value
  if (text !== null) {
    ctx.textBaseline = 'middle'
    ctx.fillStyle = textSettings.fill

    let size = 30
    if (text.length >= 8) {
      size = 15
    } else if (text.length >= 6) {
      size = 20
    }

    ctx.font = `${size}px monospace`
    ctx.fillText(
      text,
      relativeTransform.center[0],
      relativeTransform.center[1] + 2
    )
  }

  ctx.restore()
}
