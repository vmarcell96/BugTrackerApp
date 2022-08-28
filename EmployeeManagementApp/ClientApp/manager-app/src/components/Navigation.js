import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap'
import useAuth from '../hooks/useAuth';

const Navigation = () => {
    const { auth, logout } = useAuth();
  return (
    <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Home
                </NavLink>
                {!auth &&<NavLink className="d-inline p-2 bg-dark text-white" to="/login">
                    Login
                </NavLink>}
                {auth &&<NavLink className="d-inline p-2 bg-dark text-white" to="/employees">
                    Employees
                </NavLink>}
                {auth && auth.role === "Admin" &&
                <NavLink className="d-inline p-2 bg-dark text-white" to="/users">
                    Users
                </NavLink>}
                {auth && <Nav.Link className="d-inline p-2 bg-dark text-white" onClick={logout}>Logout</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation