import notification from "../elements/notification";

let notificationTimer;

function showNotification(message, type, position) {
    notification.textContent = message;
    notification.className = `notification ${type} ${position} show`;

    // Clear the existing timer if it exists
    if (notificationTimer) {
        clearTimeout(notificationTimer);
    }

    // Set a new timer to remove the notification
    notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Adjust the timeout duration as needed
}

export { showNotification };
