import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
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

  render() {

    return (
      <>
        <form onSubmit={this.handleSubmit} className="sign-up-container">
          <div className="sign-up-form">
            
            <div className="name">
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder={" Name"}
                className="inputs lname"
                required
              />
              {/* <input
                type="text"
                value={this.state.firstName}
                onChange={this.update("firstName")}
                placeholder={" First Name"}
                className="inputs fname"
                required
                />

              <input
                type="text"
                value={this.state.lastName}
                onChange={this.update("lastName")}
                placeholder={" Last Name"}
                className="inputs lname"
                required
                /> */}
            </div>

            <p></p>
              <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder={" Email address"}
              className="inputs"
              required
              />

              <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder={" Password (min. 10 characters)"}
              className="inputs"
              required
              />

            <div className="login-errors">{this.renderErrors()}</div>
            <input type="submit" value="Continue" className="inputs signup-continue-button"/>
            <p className="started">Already started? <Link className="login" to="/login">Log in to complete your application.</Link></p>
            
          </div>
        </form>
      </>
    )
  }
}
export default SignupForm;