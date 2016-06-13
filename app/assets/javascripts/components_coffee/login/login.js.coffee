@Login = React.createClass
  getInitialState: ->
    email: ''
    password: ''
    remember_me: 1

  handleChange: (e) ->
    name = e.target.name
    @setState "#{ name }": e.target.value

  valid: ->
    @state.email && @state.password

  handleSubmit: (e) ->
    e.preventDefault()
    $.ajax
      url: "/users/sign_in.json"
      type: "post"
      data: { user: @state }
      dataType: "json"
      success: (data) =>
        @props.setUser data
      error: (data) =>
        error = [data.responseJSON.error]
        @props.handleErrorResponse error

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
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary btn-block'
        disabled: !@valid()
        'Login'
