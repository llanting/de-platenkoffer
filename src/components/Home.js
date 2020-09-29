import React, {useState} from 'react';
import './Home.css';
import {Modal, Button} from 'react-bootstrap';
import Signin from './User/Signin';
import Signup from './User/Signup';
import {Redirect} from 'react-router-dom';

export default function Home(props) {

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showSignIn = () => setSignIn(true);
  const closeSignIn = () => setSignIn(false);
  const showSignUp = () => setSignUp(true);
  const closeSignUp = () => setSignUp(false);

  if (props.toMyHome) {
    return <Redirect to={'/myhome'} />
  }

  const btnStyle = {
    width: '100px',
    margin: 'auto 0',
    padding: '5px',
  }

  return (
    <div className="home">
      <div className="text">
        <h3>De Platenkoffer helps you keep track of your LP-collection</h3>
        <br></br>
        <p><button onClick={showSignIn}>Sign In</button> or <button onClick={showSignUp}>Sign Up</button> to use the app</p>
        <Modal centered show={signIn}>
          <Signin signIn={props.signIn}/>
          <Button style={btnStyle} onClick={closeSignIn}>Close</Button>
        </Modal>
        <Modal centered show={signUp}>
          <Signup signUp={props.signUp}/>
          <Button style={btnStyle} onClick={closeSignUp}>Close</Button>
        </Modal>
      </div>
    </div>
  )
}
