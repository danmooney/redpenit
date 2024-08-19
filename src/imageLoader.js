import canvas from './lib/elements/canvas.js';
import fileInput from './lib/elements/fileInput.js';
import { setImg } from './state.js';

function scaleAndDrawImage(img) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = Math.min(viewportWidth / img.width, viewportHeight / img.height, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function handleImageInput(e) {
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

export {
    scaleAndDrawImage
}
