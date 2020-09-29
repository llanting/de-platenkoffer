import React from 'react';
import {Link} from 'react-router-dom';
import './Sign.css';

export default function Signup(props) {

  return (
    <>
    <div className="signDiv">
      <form onSubmit={props.signUp} className="signDiv">
        <input type="text" name="username" placeholder="Choose a username"></input>
        <input type="email" name="email" placeholder="Enter your email"></input>
        <input type="password" name="password" placeholder="Choose a password"></input>
        <button type="submit">Sign Up</button>
      </form>
      <br></br>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
    </>
  )
}
