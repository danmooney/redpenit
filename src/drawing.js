import canvas from './lib/elements/canvas.js';
import { showNotification } from "./lib/components/notification";
import { originalCanvasDataURL } from './index.js';
import downloadButton from "./lib/elements/downloadButton";

let isDrawing = false;
let shouldClearCanvas = false;
const ctx = canvas.getContext('2d');
const undoStack = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add touch event listeners
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

function startDrawing(e) {
    e.preventDefault();
    if (undoStack.length === 0 && canvas.toDataURL() === originalCanvasDataURL) {
        shouldClearCanvas = true; // Set the flag to clear the canvas on the first drag
    }
    isDrawing = true;
    ctx.strokeStyle = 'red'; // Set the stroke style to red
    ctx.fillStyle = 'red'; // Set the fill style to red
    ctx.lineWidth = 2; // Set the line width
    ctx.beginPath();
    // Save the current state to the undo stack
    undoStack.push(canvas.toDataURL());
}

function draw(e) {
    if (isDrawing) {
        e.preventDefault();
        if (shouldClearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas on the first drag
            shouldClearCanvas = false; // Reset the flag
        }
        const rect = canvas.getBoundingClientRect();
        const x = e.touches ? e.touches[0].clientX - rect.left : e.offsetX;
        const y = e.touches ? e.touches[0].clientY - rect.top : e.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopDrawing(e) {
    e.preventDefault();
    if (isDrawing) {
        ctx.stroke();
        ctx.closePath();
        isDrawing = false;
    }
}

function undo() {
    if (undoStack.length > 0) {
        const previousState = undoStack.pop();
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
            ctx.drawImage(img, 0, 0);
        };
        img.src = previousState;
    } else {
        showNotification('No more actions to undo.', 'info', 'top');
    }
}

document.getElementById('undoBtn').addEventListener('click', undo);

document.addEventListener('keydown', function(event) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isUndo = (isMac && event.metaKey && event.key === 'z') || (!isMac && event.ctrlKey && event.key === 'z');
    const isSave = (isMac && event.metaKey && event.key === 's') || (!isMac && event.ctrlKey && event.key === 's');

    if (isUndo) {
        event.preventDefault();
        undo();
    }

    if (isSave) {
        event.preventDefault();
        downloadButton.click();
    }
});

export {
    startDrawing,
    draw,
    stopDrawing,
    undo
};
