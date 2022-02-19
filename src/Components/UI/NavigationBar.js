import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Navigationbar = (props) => {
  return (
    <>
      {/* Navbar starts*/}
      <Navbar bg="light" expand="lg" className="my-3">
        <Container>
          {/* <Navbar.Brand href="#home">Bootstrap React</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav className="me-auto className='align-right'">
            {props.whetherLoggedIn && (
              <Nav.Link href="#link" onClick={props.onLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
