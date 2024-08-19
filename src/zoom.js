import canvas from './lib/elements/canvas.js';
import { getImg } from './state.js';

let currentScale = 1;
const initialCanvasHeight = canvas.height;

function zoomImage(canvasImgSource, wheelEvent) {
    wheelEvent.preventDefault();

    const zoomIntensity = 0.1;
    const wheelDirection = Math.sign(wheelEvent.deltaY);
    currentScale *= (1 - wheelDirection * zoomIntensity);
    currentScale = Math.max(currentScale, 0.1);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = canvasImgSource.width * currentScale;
    const scaledHeight = canvasImgSource.height * currentScale;

    canvas.width = scaledWidth;
    canvas.height = Math.min(scaledHeight, initialCanvasHeight);
    ctx.drawImage(canvasImgSource, 0, 0, scaledWidth, scaledHeight);
}

canvas.addEventListener('wheel', e => {
    const img = getImg();
    if (img) {
        zoomImage(img, e);
    }
});
