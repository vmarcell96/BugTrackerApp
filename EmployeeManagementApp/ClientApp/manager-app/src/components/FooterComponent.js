//Packages
import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//Css
import './footerComponent.css';

const FooterComponent = () => {
  return (
    <Container className="footer-container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span id="footer-logo"><FontAwesomeIcon icon={faBug} />Tracker</span> © Copyright 2022 BugTracker
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <FontAwesomeIcon icon={faGithubSquare} className="footer-icon" />
          </li>
          <li className="ms-3">
            <FontAwesomeIcon icon={faTwitterSquare} className="footer-icon" />
          </li>
          <li className="ms-3">
            <FontAwesomeIcon icon={faInstagramSquare} className="footer-icon" />
          </li>
          <li className="ms-3">
            <FontAwesomeIcon icon={faFacebookSquare} className="footer-icon" />
          </li>
        </ul>
      </footer>
    </Container>
  )
}

export default FooterComponent