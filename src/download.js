import canvas from './lib/elements/canvas.js';

document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = image;
    link.click();
});
