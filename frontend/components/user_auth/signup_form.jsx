import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearErrors } from '../../actions/session_actions';

export const SignupForm = () => {
  const errors = useSelector(state => Object.values(state.errors))
  const dispatch = useDispatch();
  const history = useHistory();

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {first_name, last_name, email, password, password_confirmation}
    dispatch(signupUser(user)).then(() => history.push('/stocks'))
  }

  const renderErrors = () => {
    if (errors.length > 0){
      return (
        <ul className="errors"> 
        {errors.map((error, idx) => (
          <li key={idx}>
            {error[idx]}
          </li>
        ))}
        </ul>
      )
    }
  }

  return(
    <form onSubmit={handleSubmit} className="login-container">
    <div className="login-box signup-box">
      <h2 className="signup">Sign Up</h2>
      <div className="fname">
        <label>First Name: </label>
        <input
          className="s-inputs"
          type="text"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
          placeholder={" First Name"}
          required
          />
      </div>

      <div className="lname">
        <label>Last Name: </label>
        <input
          className="s-inputs"
          type="text"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
          placeholder={" Last Name"}
          required
          />
      </div>

      <div className="email-lg">
        <label>Email: </label>
        <input
        className="s-inputs"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={" Email address"}
        required
        />
      </div>

      <div className="pword">
      <label>Password: </label>
        <input
        className="s-inputs"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={" Password (min. 10 characters)"}
        required
        />
      </div>

      <div className="pword-conf">
        <label>Password Confirmation: </label>
        <input
          className="s-inputs"
          type="password"
          value={password_confirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          placeholder={" Password (min. 10 characters)"}
          required
          />
      </div>

      <input type="submit" value="Continue" className="inputs signup-continue-button"/>
      <p className="started">Already signed up? <Link className="login" to="/login">Log in instead.</Link></p>
      
      <div className="login-errors">{renderErrors()}</div>
    </div>
  </form>
  )
}