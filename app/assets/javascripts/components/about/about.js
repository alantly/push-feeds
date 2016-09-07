import React from 'react';

export default function Landing() {
  return (
    <div className="container">
      <h2>About</h2>
      <p>
        Push-Feeds is an RSS Notification Webservice. When a RSS feed updates, we will notify the user by pushing encrypted notifications directly to their device using the Push Notifications API. To receive updates on desktop, the supported browser is required to be running to listen for notification updates. For mobile, the supported browser will listen automatically in the background. For more information, please visit my <span><a target="_blank" href="https://github.com/alantly/push-feeds">github</a></span>.
      </p>
      <h3>Mimimum Requirements</h3>
      <p>
        The minimum browser requirement is that it supports service workers and supports the Push Notification API with encryption. Current supported browsers are Chrome v50+ for desktop and mobile.
      </p>
      <h3>IMPORTANT READ ME!!</h3>
      <p>
        Please note that this app is for demo purposes. The database will be dropped multiple times throughout the development progress. If you wish to use the app without worry, you are encouraged to fork on github.
      </p>
    </div>
  );
}
