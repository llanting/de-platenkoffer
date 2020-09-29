import React from 'react';
import {Link} from 'react-router-dom';
import './Sign.css';

export default function Signin(props) {


  return (
    <>
    <div className="signDiv">
      <form onSubmit={props.signIn} className="signDiv">
        <input type="email" name="email" placeholder="Enter your email"></input>
        <input type="password" name="password" placeholder="Choose a password"></input>
        <button type="submit">Sign In</button>
      </form>
      <br></br>
      <p>No account yet? <Link to="/signup">Sign Up</Link></p>
    </div>
    </>
  )
}