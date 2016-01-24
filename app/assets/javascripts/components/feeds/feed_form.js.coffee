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
      $.post '/feeds', { feed: @state }, (data) =>
        @props.handleNewFeed data
        @setState @getInitialState()
      , 'JSON'

    render: ->
      React.DOM.form
        className: 'form-inline'
        onSubmit: @handleSubmit
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'text'
            className: 'form-control'
            placeholder: 'Url'
            name: 'url'
            value: @state.url
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Create feed'
            