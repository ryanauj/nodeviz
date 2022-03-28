const radius = 10

function getContext() {
  const canvas = document.getElementById('main')
  if (canvas.getContext) {
    return canvas.getContext('2d')
  }

  throw 'No context available'
}

function draw() {
  const ctx = getContext()
  clear(ctx)
  _draw(ctx)
}

function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function _draw(ctx) {
  const ax = Number(document.getElementById("ax").value)
  const ay = Number(document.getElementById("ay").value)
  const bx = Number(document.getElementById("bx").value)
  const by = Number(document.getElementById("by").value)

  console.log(ax)
  console.log(ay)
  console.log(bx)
  console.log(by)
  ctx.beginPath()
  const one = node(ax, ay, 1)
  const two = node(bx, by, 2)

  render(ctx, one)
  render(ctx, two)

  connect(ctx, one, two)

  ctx.stroke()
}

function node(x, y, num) {
  return { x, y, num }
}

function render(ctx, {x, y, num}) {
  ctx.moveTo(x+radius, y)
  ctx.arc(x, y, radius, 0, Math.PI * 2, true)
  const text = { x: x-3, y: y+3 }
  ctx.moveTo(text.x, text.y)
  ctx.fillText(num, text.x, text.y)
}

function getAngle(a, b) {
  return Math.atan((a.y - b.y) / (a.x - b.x))
}

function connect(ctx, a, b) {
  const angle = getAngle(a, b)

  const aMult = a.x < b.x ? 1 : -1
  const edgeA = {
    mult: aMult,
    x: a.x + (aMult * (radius * Math.cos(angle))),
    y: a.y + (aMult * (radius * Math.sin(angle)))
  }

  const bMult = b.x < a.x ? 1 : -1
  const edgeB = {
    mult: bMult,
    x: b.x + (bMult * (radius * Math.cos(angle))),
    y: b.y + (bMult * (radius * Math.sin(angle)))
  }

  console.log('a', edgeA)
  console.log('b', edgeB)

  ctx.moveTo(edgeA.x, edgeA.y)
  ctx.lineTo(edgeB.x, edgeB.y)
}

