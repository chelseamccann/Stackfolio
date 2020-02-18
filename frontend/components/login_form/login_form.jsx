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
    const demoUser = {email: "demo@user.com", password: "password123", buying_power: 0.00, total_portfolio_value: 0.00}
    this.props.processForm(demoUser).then(() => this.props.history.push('/greeting'))
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
            <div className="login-box">
            <h2>Welcome to Stockfolio</h2>
      
            <label>Email or Username</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.update("email")}
              required
              autoFocus
              //email field?
              />
            <br/>
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              required
              />

              
            <Link to="/" className="forgot">Forgot your username/password?</Link>
            <div className="login-errors">{this.renderErrors()}</div>



          <div className="lb">
            <input type="submit" value="Sign In" className="login-buttons" />
            <button onClick={this.handleDemo} className="login-buttons">Demo User</button>
          </div>


          </div>
          </div>
        </form>
      </>
    )
  }
}
export default LoginForm;