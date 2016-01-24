@PushBtn = React.createClass
  getDefaultProps: ->
    client: null

  render: ->
    React.DOM.button
      className: "btn btn-primary"
      disabled: if @props.client then false else true
      onClick: @handleClick
      "Notify me!"

  handleClick: ->
    $.ajax
      method: "POST"
      url: "/clients/send_notification"
      data: @props.client
      dataType: 'JSON'
      success: () =>
        console.log('Send successful')