import canvas from './lib/elements/canvas.js';
import fileInput from './lib/elements/fileInput.js';

let img;

function scaleAndDrawImage(img) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = Math.min(viewportWidth / img.width, viewportHeight / img.height, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function handleImageInput(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            scaleAndDrawImage(img);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

fileInput.addEventListener('change', handleImageInput, false);

export {
    scaleAndDrawImage
}
