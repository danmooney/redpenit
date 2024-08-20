import canvas from './lib/elements/canvas.js';
import { showNotification } from "./lib/components/notification";
import { originalCanvasDataURL } from './index.js';

let isDrawing = false;
let shouldClearCanvas = false;
const ctx = canvas.getContext('2d');
const undoStack = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
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
        if (shouldClearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas on the first drag
            shouldClearCanvas = false; // Reset the flag
        }
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}

function stopDrawing() {
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

export {
    startDrawing,
    draw,
    stopDrawing,
    undo
};
