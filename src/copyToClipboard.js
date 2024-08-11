document.getElementById('copyBtn').addEventListener('click', async function() {
    try {
        const imgDataUrl = canvas.toDataURL('image/png');
        const data = await fetch(imgDataUrl);
        const blob = await data.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        alert('Image copied to clipboard.');
    } catch (error) {
        console.error('Error copying image to clipboard: ', error);
    }
});
