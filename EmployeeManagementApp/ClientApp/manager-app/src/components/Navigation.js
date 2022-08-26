import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                Home
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/employees">
                Employees
            </NavLink>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation