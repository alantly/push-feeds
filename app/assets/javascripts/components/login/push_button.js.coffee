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
      url: "https://android.googleapis.com/gcm/send"
      contentType: "application/json"
      headers: Authorization: "key=AIzaSyDWkWVCBzDgGMEND9BkYxfZM-XcU2t_VdY"
      data: { registration_ids: [@props.client.subscription_id] }
      dataType: 'JSON'
      success: (data) =>
        console.log('Post successful:', data)