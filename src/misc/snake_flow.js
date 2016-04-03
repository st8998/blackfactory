const { floor, random } = Math

export default function flow(step, amount, skip, list) {
  const limit = step * (amount - 1)
  let x = skip * step
  let y = 0
  let toRight = true
  const positions = {}

  for (let i = 0; i < list.length; i++) {
    const id = list[i].id

    positions[id] = { x, y }

    x = toRight ? x + step : x - step
    if (x > limit) {
      toRight = false
      x = limit
      y += step
    }
    if (x < 0) {
      toRight = true
      x = 0
      y += step
    }
  }

  return positions
}
