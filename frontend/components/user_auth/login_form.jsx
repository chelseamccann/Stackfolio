import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loginUser, clearErrors} from '../../actions/session_actions';

export const LoginForm = () => {
  const errors = useSelector(state => Object.values(state.errors))
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password})).then(() => history.push('/stocks'))
  }

  const handleDemo = (e) => {
    e.preventDefault();
    const demoUser = {email: "demo@user.com", password: "password123"}
    dispatch(loginUser(demoUser)).then(() => history.push('/stocks'))
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
    <div className="login-form">
      <div className="login-box bx">
      <h2 className="signin">Sign In</h2>

    <div className="login">
      <div className="email">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          className="email-input"
          placeholder={" Email address"}
          />
      </div>

      <div className="password">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="pword-input"
          placeholder={" Password"}
          />
      </div>

    <div className="buttons">
      <input type="submit" value="Sign In" className="login-buttons" />
      <button onClick={handleDemo} className="login-buttons">Demo User</button>
    </div>
    <p className="started">Don't have an account? <Link className="signup" to="/signup">Sign up instead.</Link></p>
      <div className="login-errors">{renderErrors()}</div>
  </div>

    </div>
    </div>
  </form>
  )
}