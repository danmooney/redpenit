import { setImg } from './state.js';
import { scaleAndDrawImage } from './imageLoader.js';

document.addEventListener('paste', function(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
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
        }
    }
});
