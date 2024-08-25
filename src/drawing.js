import canvas from './lib/elements/canvas.js';
import { showNotification } from "./lib/components/notification";
import { originalCanvasDataURL } from './index.js';
import downloadButton from "./lib/elements/downloadButton";

let isDrawing = false;
let shouldClearCanvas = false;
let touchPoints = 0;
const ctx = canvas.getContext('2d');
const undoStack = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add touch event listeners
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
canvas.addEventListener('touchcancel', handleTouchEnd);

function handleTouchStart(e) {
    touchPoints = e.touches.length;
    updateTouchPointsDisplay();
    setTimeout(() => { // necessary to evaluate pinch and zoom; necessary to NOT use in handleTouchMove to be able to evaluate scroll
        if (touchPoints > 1) return; // Allow pinch and zoom to
        startDrawing(e);
    });
}

function handleTouchMove(e) {
    touchPoints = e.touches.length;
    updateTouchPointsDisplay();
    if (touchPoints > 1) return; // Allow pinch and zoom
    e.preventDefault(); // Prevent scrolling while drawing
    draw(e);
}

function handleTouchEnd(e) {
    touchPoints = e.touches.length;
    updateTouchPointsDisplay();
    stopDrawing(e);
}

function startDrawing(e) {
    if (touchPoints > 1) return; // If more than one touch point, do not start drawing
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
    if (touchPoints > 1) return; // If more than one touch point, do not stop drawing
    e.preventDefault();
    if (isDrawing) {
        ctx.stroke();
        ctx.closePath();
        isDrawing = false;
    }
    touchPoints = 0; // Reset touch points
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

// Create an element to display the number of touch points
const touchPointsDisplay = document.createElement('div');
touchPointsDisplay.id = 'touchPointsDisplay';
touchPointsDisplay.style.position = 'fixed';
touchPointsDisplay.style.bottom = '10px';
touchPointsDisplay.style.right = '10px';
touchPointsDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
touchPointsDisplay.style.color = 'white';
touchPointsDisplay.style.padding = '5px 10px';
touchPointsDisplay.style.borderRadius = '5px';
// document.body.appendChild(touchPointsDisplay);

function updateTouchPointsDisplay() {
    touchPointsDisplay.textContent = `Touch Points: ${touchPoints}`;
}

export {
    startDrawing,
    draw,
    stopDrawing,
    undo
};
