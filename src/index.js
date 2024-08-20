import canvas from './lib/elements/canvas.js';
import './copyToClipboard.js';
import './pasteToClipboard.js';
import './download.js';
import './dragAndDrop.js';
import './drawing.js';
import './imageLoader.js';
import './zoom.js';

let originalCanvasDataURL;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = canvas.getContext('2d');
    const text = 'Drag & Drop, Upload, or Paste an Image';
    const maxWidth = canvas.width * 0.8; // 80% of canvas width
    let fontSize = 20;

    // Adjust font size to fit the text within the canvas width
    do {
        ctx.font = `${fontSize}px Arial`;
        fontSize--;
    } while (ctx.measureText(text).width > maxWidth);

    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    console.log('Application initialized');

    // Store the original data URL of the canvas
    originalCanvasDataURL = canvas.toDataURL();
});

export { originalCanvasDataURL };
