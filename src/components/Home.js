import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <div className="text">
        <h3>NAME helps you keep track of your LP-collection</h3>
        <br></br>
        <p><Link to={'/signin'}>Sign In</Link> or <Link to={'/signup'}>Sign Up</Link> to use the app</p>
      </div>
    </div>
  )
}
