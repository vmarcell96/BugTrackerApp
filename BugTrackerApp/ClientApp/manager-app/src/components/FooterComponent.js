//Packages
import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//Css
import './footerComponent.css';

const FooterComponent = () => {
  return (
    <Container className="footer-container mt-3 border-top">
      <Row className="p-2 m-0">
        <Col className='d-flex justify-content-start p-0 footer-col'>
          <Row className="p-0 m-0">
            <Col className=' p-0 m-1 align-self-center' id="footer-logo" xs={6} md>
              <FontAwesomeIcon icon={faBug} />Tracker
            </Col>
            <Col className=' p-0 m-1 align-self-center' id="copyright" xs={6} md>
              ©Copyright 2022 BugTracker
            </Col>
          </Row>
        </Col>
        <Col className='d-flex justify-content-end p-0 no-wrap footer-col' xs={6}>
          <Row className="p-0 m-0">
            <Col className=' p-0 m-1 align-self-center' >
              <FontAwesomeIcon icon={faTwitterSquare} className="footer-icon" />
            </Col>
            <Col className=' p-0 m-1 align-self-center'>
              <FontAwesomeIcon icon={faFacebookSquare} className="footer-icon" />
            </Col>
            <Col className=' p-0 m-1 align-self-center'>
              <FontAwesomeIcon icon={faInstagramSquare} className="footer-icon" />
            </Col>
            <Col className=' p-0 m-1 align-self-center'>
              <FontAwesomeIcon icon={faGithubSquare} className="footer-icon" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default FooterComponent