import canvas from './lib/elements/canvas.js';
import downloadButton from "./lib/elements/downloadButton";

downloadButton.addEventListener('click', function() {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'); // TODO - png only okay?
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = image;
    link.click();
});
