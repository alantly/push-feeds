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
      url: @props.client.notification_address
      contentType: "application/json"
      headers: Authorization: "key=AIzaSyDWkWVCBzDgGMEND9BkYxfZM-XcU2t_VdY"
      data: {}
      dataType: 'JSON'
      success: (data) =>
        console.log('Post successful:', data)