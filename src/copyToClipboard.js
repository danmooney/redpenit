import canvas from './lib/elements/canvas.js';
import { showNotification } from './lib/components/notification.js';

document.getElementById('copyBtn').addEventListener('click', async function() {
    try {
        const imgDataUrl = canvas.toDataURL('image/png');
        const data = await fetch(imgDataUrl);
        const blob = await data.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        showNotification('Image copied to clipboard.');
    } catch (error) {
        console.error('Error copying image to clipboard: ', error);
    }
});
