import notification from "../elements/notification";

function showNotification(message, type = 'info', position = 'bottom') {
    notification.textContent = message;
    notification.className = `notification ${type} ${position} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

export { showNotification };
