import React from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import '../home.css'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4 mt-2 p-3">
            <h1>Welcome to BugTracker!</h1>
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Card className="info-card">
            <Card.Title style={{ color: "#61DAFb"}}>Features:</Card.Title>
            <Card.Body>
              <Card.Text>
                <ul>
                  <li>Login/Logout</li>
                  <li>Persisted users,employees</li>
                  <li>CRUD operations on users and employees</li>
                  <li>Protected react routes</li>
                  <li>Protected API routes</li>
                  <li>JWT access, refresh token validation</li>
                  <li>Login/Logout</li>
                </ul>
                </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card className="info-card">
            <Card.Title style={{ color: "#61DAFb"}}>Login information:</Card.Title>
            <Card.Body>
              <Card.Text>
                <h6>"Admin" role user:</h6>
                <ul>
                  <li>Username: Admin</li>
                  <li>Password: 12345678</li>
                </ul>
                <h6>"User" role user:</h6>
                <ul>
                  <li>Username: User</li>
                  <li>Password: 12345678</li>
                </ul>
                </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Card className="info-card">
            <Card.Title style={{ color: "#61DAFb"}}>Current 4th sprint features:</Card.Title>
            <Card.Body>
              <Card.Text>
                <ul>
                  <li style={{ color: "brown"}}>Conversion from employee manager application to a bugtracker</li>
                  <li style={{ color: "#61DAFb"}}>Implementing Footer</li>
                  <li style={{ color: "#61DAFb"}}>Deploy application to Azure to</li>
                  <li>Create landing page</li>
                  <li>Improve css</li>
                  <li>Create profile page for logged in user</li>
                </ul>
                </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        
        </Col>
      </Row>

    </Container>
  )
};

export default Home;
