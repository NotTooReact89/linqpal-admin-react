import React from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

export default (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/dashboard">
        <Navbar.Brand>Linqpal</Navbar.Brand>
      </LinkContainer>
      {!props.isLogin && (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/dashboard">
                <Button variant="dark">Dashboard</Button>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer
                to={{
                  pathname: '/',
                  state: { signOut: true },
                }}
              >
                <Button variant="dark">Sign out</Button>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};
