import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import useAuth from '../hooks/useAuth';
import '../index.css';
import Logo from '../bug2.png';

const Navigation = () => {
    const { auth, logout } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand className="d-inline p-2 bg-light text-black align-self-center">
                    <img 
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block bg-light align-top"
                    />
                     EmployeeManager
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                        {!auth && <LinkContainer to="/login">
                            <Nav.Link className="d-inline p-2 bg-light text-black align-self-center">
                                Login
                            </Nav.Link></LinkContainer>}
                        {auth &&<LinkContainer to="/employees"><Nav.Link className="d-inline p-2 bg-light text-black align-self-center" >
                            Employees
                        </Nav.Link></LinkContainer>}
                        {auth && auth.role === "Admin" &&
                        <LinkContainer to="/users"><Nav.Link className="d-inline p-2 bg-light text-black align-self-center"> 
                            Users
                        </Nav.Link></LinkContainer>}
                        {auth && <Nav.Link className="d-inline p-2 bg-light text-black" onClick={logout}>Logout</Nav.Link>}
                    </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation