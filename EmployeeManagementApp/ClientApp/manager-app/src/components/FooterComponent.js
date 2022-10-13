import React from 'react'
import { Navbar, Nav, Container, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  return (
    <footer className="footer">

      <p id="footer-content"><span id="footer-logo"><FontAwesomeIcon icon={faBug} />Tracker</span> © Copyright 2022 BugTracker</p>

    </footer>
  )
}

export default FooterComponent