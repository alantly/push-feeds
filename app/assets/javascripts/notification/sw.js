console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);
  event.waitUntil(
    fetch("/feeds/updated", {
      credentials: 'same-origin',
      mode: 'same-origin'
    }).then(function(response) {
      if (!response.ok) {
        return;
      }
      response.json().then(function(data) {
        showNotification(data.title, data.message, data.url);
      });
    }).catch(function(error) {
      console.log("There was an error", error);
      showNotification("Push-Feeds","A wild notification has appeared!","https://www.google.com");
    })
  );
});

function showNotification(title, message, url) {

  self.addEventListener('notificationclick', function(event) {
      console.log('Notification click: tag ', event.notification.tag);
      event.notification.close();
      event.waitUntil(
          clients.matchAll({
              type: 'window'
          })
          .then(function(windowClients) {
              for (var i = 0; i < windowClients.length; i++) {
                  var client = windowClients[i];
                  if (client.url === url && 'focus' in client) {
                      return client.focus();
                  }
              }
              if (clients.openWindow) {
                  return clients.openWindow(url);
              }
          })
      );
  });

  self.registration.showNotification(title, {
    body: message,
    // icon: 'images/icon.png',
  });
}
