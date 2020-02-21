import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <div className="login-box signup-box">
            <h2 className="signup">Sign Up</h2>
            <div className="fname">
              <label>First Name: </label>
              <input
                type="text"
                value={this.state.first_name}
                onChange={this.update("first_name")}
                placeholder={" First Name"}
                required
                />
            </div>

            <div className="lname">
              <label>Last Name: </label>
              <input
                type="text"
                value={this.state.last_name}
                onChange={this.update("last_name")}
                placeholder={" Last Name"}
                required
                />
            </div>

            <div className="email-lg">
              <label>Email: </label>
              <input
              type="email"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder={" Email address"}
              required
              />
            </div>

            <div className="pword">
            <label>Password: </label>
              <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder={" Password (min. 10 characters)"}
              required
              />
            </div>

            <div className="pword-conf">
              <label>Password Confirmation: </label>
              <input
                type="password"
                value={this.state.password_confirmation}
                onChange={this.update("password_confirmation")}
                placeholder={" Password (min. 10 characters)"}
                required
                />
            </div>

            <input type="submit" value="Continue" className="inputs signup-continue-button"/>
            <p className="started">Already signed up? <Link className="login" to="/login">Log in instead.</Link></p>
            
            <div className="login-errors">{this.renderErrors()}</div>
          </div>
        </form>
      </>
    )
  }
}
export default SignupForm;