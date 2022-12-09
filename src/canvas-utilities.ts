/**
 * @param ctx
 * @param text
 * @param x
 * @param y
 * @param width
 * @param lineHeight
 */
export const addMultilineTextToCanvas = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number = 1
): void => {
  let line = '';
  let yText = y;
  const words = text
    .split(' ')
    .map((word) => word.trim())
    .filter((w) => w.length > 0);
  for (const word of words) {
    const newLine = `${line} ${word}`;
    const metrics = ctx.measureText(newLine.trim());
    const metricsWidth = metrics.width;
    const height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    if (metricsWidth > width) {
      ctx.fillText(line.trim(), x, yText);
      line = '';
      yText += height * lineHeight;
    }
    line += `${word} `;
  }
  ctx.fillText(line.trim(), x, yText);
};
