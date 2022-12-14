//Packages
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
//Hooks
import useLogoutFunction from '../hooks/useLogoutFunction'
import useAuth from '../hooks/useAuth';
//Css
import './navigation.css';


const Navigation = () => {
    const { auth } = useAuth();
    const logout = useLogoutFunction();

    return (
        <Navbar expand="md" className="mb-3 sticky" id="navbar">
            <LinkContainer to="/">
                <Navbar.Brand className="nav-item" id="nav-brand">
                    <FontAwesomeIcon icon={faBug} />Tracker
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=''>
                <Nav className="me-auto">
                    
                    {auth && auth.role === "Admin" &&
                        <LinkContainer to="/users">
                            <Nav.Link className="mt-1 nav-item align-self-center">
                                Users
                            </Nav.Link>
                        </LinkContainer>}
                    {auth &&
                        <LinkContainer to={`/profile/${auth.id}`}>
                            <Nav.Link className="mt-1 nav-item align-self-center">
                                Profile
                            </Nav.Link>
                        </LinkContainer>}
                    {auth &&
                        <LinkContainer to={`/projects/add`}>
                            <Nav.Link className="mt-1 nav-item align-self-center">
                                Create Project
                            </Nav.Link>
                        </LinkContainer>}

                </Nav>
                <Nav className='ml-auto'>
                    {!auth &&
                        <LinkContainer to="/login">
                            <Nav.Link className="mt-1 nav-item align-self-center">
                                Login
                            </Nav.Link>
                        </LinkContainer>}
                    {auth &&
                        <LinkContainer to="/">
                            <Nav.Link className="mt-1 nav-item align-self-center" onClick={logout}>
                                Logout
                            </Nav.Link>
                        </LinkContainer>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation