const radius = 10

function draw() {
  var canvas = document.getElementById('main');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    _draw(ctx)
  }
}

function _draw(ctx) {
  ctx.beginPath()
  const one = node(105, 55, 1)
  const two = node(55, 75, 2)

  connect(ctx, one, two)
  render(ctx, one)
  render(ctx, two)

  ctx.stroke()
}

function clearCircle(ctx, x, y) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2*Math.PI, true)
  ctx.clip()
  ctx.clearRect(x-radius, y-radius, radius*2, radius*2)
  ctx.restore()
}

function node(x, y, num) {
  return { x, y, num }
}

function getAngle(a, b) {
  return Math.atan((a.y - b.y) / (a.x - b.x))
}

function render(ctx, {x, y, num}) {
  ctx.moveTo(x+radius, y)
  ctx.arc(x, y, radius, 0, Math.PI * 2, true)
  const text = { x: x-3, y: y+3 }
  ctx.moveTo(text.x, text.y)
  ctx.fillText(num, text.x, text.y)
}

function connect(ctx, a, b) {
  const aToBAngle = getAngle(a, b)
  const bToAAngle = getAngle(b, a)
  const axMult = a.x < b.x ? 1 : -1
  const ayMult = a.x < b.x ? 1 : -1
  const edgeA = {
    x: a.x + (axMult * (radius * Math.cos(aToBAngle))),
    y: a.y + (ayMult * (radius * Math.sin(aToBAngle)))
  }
  const bxMult = b.x < a.x ? 1 : -1
  const byMult = b.x < a.x ? 1 : -1
  const edgeB = {
    x: b.x + (bxMult * (radius * Math.cos(bToAAngle))),
    y: b.y + (byMult * (radius * Math.sin(bToAAngle)))
  }
  console.log(edgeA)
  console.log(edgeB)
  ctx.moveTo(edgeA.x, edgeA.y)
  ctx.lineTo(edgeB.x, edgeB.y)
}

