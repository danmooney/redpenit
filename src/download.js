import canvas from './lib/elements/canvas.js';
import downloadButton from "./lib/elements/downloadButton";
import fileInput from './lib/elements/fileInput.js';

let uploadedFileName = '';

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        uploadedFileName = fileInput.files[0].name;
    }
});

downloadButton.addEventListener('click', function() {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let fileName = 'redpenit-';
    let fileExtension = '.png';

    if (uploadedFileName) {
        const uploadedFileExtension = uploadedFileName.substring(uploadedFileName.lastIndexOf('.'));
        fileName += uploadedFileName.substring(0, uploadedFileName.lastIndexOf('.'));
        fileExtension = uploadedFileExtension;
    } else {
        fileName += Date.now().toString();
    }

    // Ensure the filename does not exceed 255 characters
    if (fileName.length + fileExtension.length > 255) {
        fileName = fileName.substring(0, 255 - fileExtension.length);
    }

    fileName += fileExtension;

    const link = document.createElement('a');
    link.download = fileName;
    link.href = image;
    link.click();
});
