//Packages
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//Css
import './home.css'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col className="">
          <Card className="p-3">
            <Card.Title className="page-title"><h1>Welcome to BugTracker!</h1></Card.Title>
            <Card.Body>
            <h4 style={{ color: "rgba(58, 65, 111, 0.95)" }}>Features:</h4>
            <ul>
              <li>Login/Logout</li>
              <li>Persisted users,projects,bugs,team members</li>
              <li>You can create your own project</li>
              <li>You can add bugs to your projects</li>
              <li>User profile page(you can access your projects on the profile page)</li>
              <li>Protected react routes</li>
              <li>Protected API routes</li>
              <li>JWT access, refresh token validation</li>
              <li>Login/Logout</li>
            </ul>
            <h4 style={{ color: "rgba(58, 65, 111, 0.95)" }}>Login information:</h4>
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

            <h4 style={{ color: "rgba(58, 65, 111, 0.95)" }}>TODO features:</h4>
            <ul>
              <li style={{ color: "red" }}>Conversion from employee manager application to a bugtracker</li>
              <li>Assign developers to bugs</li>
              <li>Add developers to existing project</li>
              <li>Edit project,bug</li>
              <li>Send notifications to users</li>
            </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Home;
