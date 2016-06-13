@AlertBox = React.createClass
  render: ->
    React.DOM.div
      className: "alert alert-#{ @props.type }"
      role: "alert"
      onClick: @props.remove
      @props.message