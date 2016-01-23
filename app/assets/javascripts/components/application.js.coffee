@Application = React.createClass
  getInitialState: ->
    errorMessages: []
    showLoginPanel: @props.current_path == 'login'

  setUserSession: (data) ->
    window.location.replace("/feeds");
    @setState errorMessages: []

  setErrors: (errors) ->
    @setState errorMessages: errors

  handleUrl: (newUrl) ->
    history.pushState(null, null, newUrl)

  toggleLogin: (e) ->
    e.preventDefault()
    @setState showLoginPanel: !@state.showLoginPanel

  showSuccessfulLogin: ->
    window.location.replace("/feeds");

  showLoginSignupForm: ->
    React.DOM.div
      className: 'login-signup-container'
      React.DOM.h1
        className: 'app-title'
        'Welcome'
      React.createFactory(React.addons.CSSTransitionGroup)
        transitionName: 'login-transition'
        transitionLeave: false
        if @state.showLoginPanel
          switchText = 'Signup'
          urlText = '/users/sign_in'
          React.createElement Login, key: 10001, setUser: @setUserSession, handleErrorResponse: @setErrors
        else
          switchText = 'Login'
          urlText = '/users/sign_up'
          React.createElement Signup, key: 10000, setUser: @setUserSession, handleErrorResponse: @setErrors

      @handleUrl(urlText)
      React.DOM.a
        className: 'btn btn-danger btn-block'
        id: 'toggle-login-signup-btn'
        href: urlText
        onClick: @toggleLogin
        "Click here to #{ switchText }"

  showPrettyLoginWall: ->
    React.DOM.div
      className: 'container'
      React.DOM.div
        className: 'row'
        React.DOM.div
          className: 'col-md-4 col-md-offset-4'
          React.DOM.div
            className: 'login-wall'
            @showLoginSignupForm()

  render: ->
    React.DOM.div
      className: 'application-wrapper'
      if @state.errorMessages.length > 0
        @displayErrors()
      @showPrettyLoginWall()

  displayErrors: ->
    i = 0
    for message in @state.errorMessages
      React.createElement AlertBox, key: i++, type: "danger", message: message