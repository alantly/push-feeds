@FeedForm = React.createClass
    getInitialState: ->
      source: ''

    handleChange: (e) ->
      name = e.target.name
      @setState "#{ name }": e.target.value

    valid: ->
      @state.source

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
            placeholder: 'Source'
            name: 'source'
            value: @state.source
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Create feed'
            