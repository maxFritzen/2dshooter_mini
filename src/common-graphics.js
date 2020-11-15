// @ts-check
import { ctx } from './index.js';

export function drawRect (x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function drawCircle (x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill()
}

export function drawText (text, x, y, color) {
  ctx.fillStyle = color
  ctx.font = '8px helvetica'
  ctx.fillText(text, x, y)
}

export function drawStandardText(text) {
  drawText(text, 30, 30, 'black')
}