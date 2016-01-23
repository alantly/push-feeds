@Logout = React.createClass

  handleSubmit: (e) ->
    e.preventDefault()
    $.ajax
      url: '/users/sign_out.json'
      type: 'delete'
      success: () =>
        window.location.replace("/");
        console.log("Terminated Session")

  render: ->
    React.DOM.form
      className: 'form'
      onSubmit: @handleSubmit
      React.DOM.button
        type: 'submit'
        className: 'btn btn-danger'
        'Logout'