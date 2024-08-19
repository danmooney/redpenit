import canvas from './lib/elements/canvas.js';

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

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}
