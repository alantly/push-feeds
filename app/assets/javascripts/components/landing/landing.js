import React from 'react';

export default function Landing() {
  return (
    <div className="container">
      <h2>Getting Started</h2>
      <p>
        Push-Feeds is an RSS Notification Webservice. When a RSS feed updates, we will notify the user by pushing encrypted notifications directly to their device using the Push Notifications API. To receive updates on desktop, the supported browser is required to be running to listen for notification updates. For mobile, the supported browser will listen automatically in the background. For more information, please visit my <span><a href="https://github.com/alantly/push-feeds">github</a></span>.
      </p>
      <h3>Installation</h3>
      <p>
        No Installation is required. All of this is done through the browser. The minimum browser requirement is that it supports service workers and supports the Push Notification API with encryption. Current supported browsers are Chrome v50+ for desktop and mobile.
      </p>
      <h3>Browser Accounts</h3>
      <p>
        The app can be used without a user account. When subscribing to push notifications, a browser account will be created. When a user unsubscribes, the browser account will be removed, and all linked feeds will be gone.
      </p>
      <h3>Syncing Devices</h3>
      <p>
        Creating an account allows the user to link their feeds to their user account instead of the browser. This allows better RSS feed link syncing across multiple browsers.
      </p>
    </div>
  );
}
