export function drawRect (ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function drawCircle (ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill()
}

export function drawText (ctx, text, x, y, color) {
  ctx.fillStyle = color
  ctx.font = '20px helvetica'
  ctx.fillText(text, x, y)
}