import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import useAuth from '../hooks/useAuth';
import '../index.css';

const Navigation = () => {
    const { auth, logout } = useAuth();
  return (
    <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <LinkContainer to="/">
                    <Navbar.Brand className="d-inline p-2 bg-dark text-white">EmployeeManager</Navbar.Brand>
                </LinkContainer>
                {!auth && <LinkContainer to="/login">
                    <Nav.Link className="d-inline p-2 bg-dark text-white">
                        Login
                    </Nav.Link></LinkContainer>}
                {auth &&<LinkContainer to="/employees"><Nav.Link className="d-inline p-2 bg-dark text-white" >
                    Employees
                </Nav.Link></LinkContainer>}
                {auth && auth.role === "Admin" &&
                <LinkContainer to="/users"><Nav.Link className="d-inline p-2 bg-dark text-white"> 
                    Users
                </Nav.Link></LinkContainer>}
                {auth && <Nav.Link className="d-inline p-2 bg-dark text-white" onClick={logout}>Logout</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation