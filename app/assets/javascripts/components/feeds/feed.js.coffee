@Feed = React.createClass
    getInitialState: ->
      edit: false

    handleToggle: (e) ->
      e.preventDefault()
      @setState edit: !@state.edit
    
    handleDelete: (e) ->
      e.preventDefault()
      $.ajax
        method: 'DELETE'
        url: "/feeds/#{ @props.feed.id }"
        dataType: 'JSON'
        success: () =>
          @props.handleDeleteFeed @props.feed

    handleEdit: (e) ->
      e.preventDefault()
      data =
        url: ReactDOM.findDOMNode(@refs.url).value
      $.ajax
        method: 'PUT'
        url: "/feeds/#{ @props.feed.id }"
        dataType: 'JSON'
        data:
          feed: data
        success: (data) =>
          @setState edit: false
          @props.handleEditFeed @props.feed, data

    render: ->
      if @state.edit
        @feedForm()
      else
        @feedRow()

    feedRow: ->
      React.DOM.tr null,
        React.DOM.td null, @props.feed.url
        React.DOM.td null,
          React.DOM.a
            className: 'btn btn-default'
            onClick: @handleToggle
            'Edit'
          React.DOM.a
            className: 'btn btn-danger'
            onClick: @handleDelete
            'Delete'

    feedForm: ->
      React.DOM.tr null,
        React.DOM.td null,
          React.DOM.input
            className: 'form-control'
            type: 'text'
            defaultValue: @props.feed.url
            ref: 'url'
        React.DOM.td null,
          React.DOM.a
            className: 'btn btn-default'
            onClick: @handleEdit
            'Update'
          React.DOM.a
            className: 'btn btn-danger'
            onClick: @handleToggle
            'Cancel'
