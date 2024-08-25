import canvas from './lib/elements/canvas.js';
import fileInput from './lib/elements/fileInput.js';
import pasteInput from './lib/elements/pasteInput.js';
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
        showNotification('Please upload a valid image file.', 'error', 'top');
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
    setTimeout(
        () => e.target.value = '',
        0
    ); // clear the input value; bind in the next tick for other events to use the value
}

function handlePaste() {
    navigator.clipboard.read().then(items => {
        for (const item of items) {
            if (item.types.includes('image/png')) {
                item.getType('image/png').then(blob => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = new Image();
                        img.onload = function() {
                            setImg(img);
                            scaleAndDrawImage(img);
                        };
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(blob);
                });
            }
        }
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}

fileInput.addEventListener('change', handleImageInput, false);

document.getElementById('uploadBtn').addEventListener('click', function() {
    fileInput.click();
});

pasteInput.addEventListener('click', handlePaste);

export {
    scaleAndDrawImage
}
