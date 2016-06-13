@Signup = React.createClass
  getInitialState: ->
    email: ''
    password: ''
    password_confirmation: ''

  handleChange: (e) ->
    name = e.target.name
    @setState "#{ name }": e.target.value

  valid: ->
    @state.email && @state.password && (@state.password == @state.password_confirmation)

  handleSubmit: (e) ->
    e.preventDefault()
    $.ajax
      url: "/users.json"
      type: "post"
      data: { user: @state }
      dataType: "json"
      success: (data) =>
        @props.setUser data
      error: (data) =>
        errors = []
        for key, value of data.responseJSON.errors
          err_msg = key + " " + value.toString()
          errors.push(err_msg)
        @props.handleErrorResponse errors

  render: ->
    React.DOM.form
      onSubmit: @handleSubmit
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'text'
          className: 'form-control'
          placeholder: 'Email'
          name: 'email'
          value: @state.email
          onChange: @handleChange
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'password'
          className: 'form-control'
          placeholder: 'Password'
          name: 'password'
          value: @state.password
          onChange: @handleChange
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'password'
          className: 'form-control'
          placeholder: 'Password Confirmation'
          name: 'password_confirmation'
          value: @state.password_confirmation
          onChange: @handleChange
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary btn-block'
        disabled: !@valid()
        'Signup'


