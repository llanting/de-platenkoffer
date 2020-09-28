import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar sticky='top' variant="dark" style={{height: '50px', backgroundColor: '#3baada'}}>
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to={'/'}><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>Home</Button></Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={'/myhome'}><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>My LP's</Button></Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={'/add-album'}><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>Add LP</Button></Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={'/stats'}><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>Stats</Button></Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}
