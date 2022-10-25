export const showNotification = (title, body) => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      new Notification(title, {
        body,
        icon: "./logo_transparent.png",
      });
    }
  });
};
