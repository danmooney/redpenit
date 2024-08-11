const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let currentScale = 1;

function zoomImage(event) {
    event.preventDefault();
    const zoomIntensity = 0.1;
    const wheelDirection = Math.sign(event.deltaY);
    currentScale *= (1 - wheelDirection * zoomIntensity);
    currentScale = Math.max(currentScale, 0.1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaledWidth = canvas.width * currentScale;
    const scaledHeight = canvas.height * currentScale;
    canvas.style.width = `${scaledWidth}px`;
    canvas.style.height = `${scaledHeight}px`;
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
}

canvas.addEventListener('wheel', zoomImage);
