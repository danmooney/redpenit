import canvas from './lib/elements/canvas.js';
import './copyToClipboard.js';
import './pasteToClipboard.js';
import './download.js';
import './dragAndDrop.js';
import './drawing.js';
import './imageLoader.js';
import './ads.js';
// import './zoom.js';

let originalCanvasDataURL;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = canvas.getContext('2d');

    // On narrow viewports the default 800x600 canvas overflows horizontally
    // and forces a page-wide horizontal scrollbar. Shrink the empty canvas
    // to fit (preserving aspect ratio) so the initial placeholder fits the
    // screen. Image loads later go through scaleAndDrawImage which already
    // accounts for window.innerWidth.
    const availableWidth = window.innerWidth - 24; // form-container padding
    if (availableWidth < canvas.width) {
        const aspect = canvas.height / canvas.width;
        canvas.width = Math.max(240, availableWidth);
        canvas.height = Math.round(canvas.width * aspect);
    }

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
