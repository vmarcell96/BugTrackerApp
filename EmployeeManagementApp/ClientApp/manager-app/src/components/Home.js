//Packages
import React from "react";
import { Card } from "react-bootstrap";
//Css
import './home.css'

const Home = () => {
  return (
    <Card className="pt-5">
      <h1>Welcome to BugTracker!</h1>
      <h4 style={{ color: "rgba(58, 65, 111, 0.95)" }}>Features:</h4>
      <ul>
        <li>Login/Logout</li>
        <li>Persisted users,employees</li>
        <li>CRUD operations on users and employees</li>
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

      <h4 style={{ color: "rgba(58, 65, 111, 0.95)" }}>TODO features(4th sprint):</h4>
      <ul>
        <li style={{ color: "red" }}>Conversion from employee manager application to a bugtracker</li>
        <li style={{ color: "rgba(58, 65, 111, 0.95)" }}>Implementing Footer</li>
        <li style={{ color: "rgba(58, 65, 111, 0.95)" }}>Deploy application to Azure to</li>
        <li>Create landing page</li>
        <li>Improve css</li>
        <li>Create profile page for logged in user</li>
      </ul>

    </Card>
  )
};

export default Home;
