import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/session_actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(() => this.props.history.push('/greeting'))
  }

  handleDemo(e) {
    e.preventDefault();
    const demoUser = {email: "demo@user.com", password: "password123"}
    this.props.processForm(demoUser).then(() => this.props.history.push('/stocks'))
  }

  renderErrors(){
    if (this.props.errors[0].length > 0){
      return (
        <ul className="errors"> 
        {this.props.errors.map((error, idx) => (
          <li key={idx}>
            {error[idx]}
          </li>
        ))}
        </ul>
      )
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="login-container">
          <div className="login-form">
            <div className="login-box bx">
            <h2 className="signin">Sign In</h2>

          <div className="login">
            <div className="email">
              <label>Email: </label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.update("email")}
                required
                autoFocus
                className="email-input"
                />
            </div>

            <div className="password">
              <label>Password: </label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                required
                className="pword-input"
                />
            </div>

              {/* <Link to="/" className="forgot">Forgot your username/password?</Link> */}



          <div className="buttons">
            <input type="submit" value="Sign In" className="login-buttons" />
            <button onClick={this.handleDemo} className="login-buttons">Demo User</button>
          </div>
          <p className="started">Don't have an account? <Link className="signup" to="/signup">Sign up instead.</Link></p>
            <div className="login-errors">{this.renderErrors()}</div>
        </div>

          </div>
          </div>
        </form>
      </>
    )
  }
}
export default LoginForm;