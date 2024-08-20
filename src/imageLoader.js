import canvas from './lib/elements/canvas.js';
import fileInput from './lib/elements/fileInput.js';
import { showNotification } from "./lib/components/notification";
import { setImg } from './state.js';

const initialCanvasHeight = canvas.height;

function scaleAndDrawImage(img) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = Math.min(viewportWidth / img.width, viewportHeight / img.height, 1);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    canvas.width = scaledWidth;
    canvas.height = Math.min(scaledHeight, initialCanvasHeight);
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
}

function handleImageInput(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
        showNotification('Please upload a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            setImg(img);
            scaleAndDrawImage(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = ''; // Clear the file input
}

fileInput.addEventListener('change', handleImageInput, false);

document.getElementById('uploadBtn').addEventListener('click', function() {
    fileInput.click();
});

export {
    scaleAndDrawImage
}
