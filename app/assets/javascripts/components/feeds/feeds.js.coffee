@Feeds = React.createClass
  getInitialState: ->
    feeds: @props.data

  getDefaultProps: ->
    feeds: []

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
      className: 'feeds'
      React.DOM.h1 null,
        "Push Feeds!"
        
      React.createElement FeedForm, handleNewFeed: @addFeed
      React.DOM.hr null

      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'feed source'
        React.DOM.tbody null,
          for feed in @state.feeds
            React.createElement Feed, key: feed.id, feed: feed, handleDeleteFeed: @deleteFeed, handleEditFeed: @updateFeed
  