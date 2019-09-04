export default class Notifications {
    static permission;
    static timeOut = 3000 //3 seconds
    static notify = ({ title, body, icon }) => {
        Notifications.checkPermissions()
        const notification = new Notification(title, { body, icon })
        return notification
    }
    static requestPermission = async () => {
        if (!("Notification" in window)) {
            console.warn("This browser does not support desktop notification")
            alert("This browser does not support desktop notification")
            return
        }
        const permission = Notification.requestPermission()
        if (permission === "granted") {
            new Notification("MDChem Notifications Now Activated.");
        }
    }
    static checkPermissions = () => {
        Notifications.permission = Notification.permission
    }
}