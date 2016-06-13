@FeedForm = React.createClass
    getInitialState: ->
      url: ''

    handleChange: (e) ->
      name = e.target.name
      @setState "#{ name }": e.target.value

    valid: ->
      @state.url

    handleSubmit: (e) ->
      e.preventDefault()
      $.ajax
        method: 'post'
        url: '/feeds/subscribe'
        data: { feed: @state }
        dataType: 'JSON'
        success: (data) =>
          @props.handleNewFeed data
          @setState @getInitialState()
        error: (reply) =>
          @props.handleError reply.responseJSON.error

    render: ->
      React.DOM.div
        className: 'col-md-4 col-md-offset-4 pull-right'
        id: 'feed-form'
        React.DOM.form
          className: 'form-inline'
          onSubmit: @handleSubmit
          React.DOM.div
            className: 'form-group'
            React.DOM.input
              type: 'text'
              id: 'feed-submit-input'
              className: 'form-control'
              placeholder: 'Feed Endpoint'
              name: 'url'
              value: @state.url
              onChange: @handleChange
            React.DOM.button
              type: 'submit'
              className: 'btn btn-primary'
              disabled: !@valid()
              'Subscribe to feed'
