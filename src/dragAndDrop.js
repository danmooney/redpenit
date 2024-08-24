import { scaleAndDrawImage } from './imageLoader.js';
import { setImg } from './state.js';

document.body.addEventListener('dragover', handleDragOver, false);
document.body.addEventListener('dragenter', handleDragEnter, false);
document.body.addEventListener('dragleave', handleDragLeave, false);
document.body.addEventListener('drop', handleDrop, false);

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDragEnter(e) {
    e.preventDefault();
    document.body.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();

    const isLeavingWindow = e.clientX === 0 && e.clientY === 0;

    if (isLeavingWindow) {
        document.body.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    document.body.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                setImg(img);
                scaleAndDrawImage(img);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(files[0]);
    }
}
