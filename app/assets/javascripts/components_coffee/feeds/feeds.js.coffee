@Feeds = React.createClass
  getInitialState: ->
    feeds: @props.data
    errorMessage: ""

  getDefaultProps: ->
    feeds: []

  setError: (error) ->
    @setState errorMessage: error

  removeError: ->
    @setState errorMessage: ""

  addFeed: (feed) ->
    feeds = React.addons.update(@state.feeds, { $push: [feed] })
    @setState feeds: feeds

  updateFeed: (feed, data) ->
    index = @state.feeds.indexOf feed
    feeds = React.addons.update(@state.feeds, { $splice: [[index, 1, data]] })
    @setState feeds: feeds

  deleteFeed: (feed) ->
    index = @state.feeds.indexOf feed
    feeds = React.addons.update(@state.feeds, { $splice: [[index, 1]] })
    @setState feeds: feeds

  render: ->
    React.DOM.div
      className: 'container'
      if @state.errorMessage
        React.createElement AlertBox, type: "danger", message: @state.errorMessage, remove: @removeError

      React.DOM.div
        className: 'row'
        React.DOM.h1
          className: 'col-md-11'
          "Push-Feeds"
        React.createElement Logout

      React.DOM.div
        className: 'row'
        React.DOM.hr
          className: 'style-one'

      React.DOM.div
        className: 'row'
        React.DOM.div
          className: 'col-md-10 col-md-offset-2'
          React.DOM.h3 null,
            "Instructions"
          React.DOM.div null,
            "1. Enter a RSS feed url into the Feed Endpoint text box."
          React.DOM.div null,
            "2. Subscribe to Push Notifications from Push-Feeds."
          React.DOM.div null,
            "3. Enjoy instant Chrome push notifications on your favorite Feed updates."

      React.DOM.div
        className: 'row'
        React.DOM.hr
          className: ''

      React.DOM.div
        className: 'row'
        React.DOM.h2
          className: 'col-md-4'
          "My Subscribed Feeds"
        React.createElement FeedForm, handleNewFeed: @addFeed, handleError: @setError
      React.DOM.div
        className: 'row'
        React.DOM.div
          className: 'col-md-12'
          React.DOM.table
            className: 'table table-bordered'
            React.DOM.thead null,
              React.DOM.tr null,
                React.DOM.th null, 'Feed Endpoints'
                React.DOM.th null, 'Actions'
            React.DOM.tbody null,
              for feed in @state.feeds
                React.createElement Feed, key: feed.id, feed: feed, handleDeleteFeed: @deleteFeed, handleEditFeed: @updateFeed, handleError: @setError

      React.createElement SubscribeBtn
