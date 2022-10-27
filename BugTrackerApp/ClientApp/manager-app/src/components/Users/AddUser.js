//Packages
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Dropdown, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
//Css
import './addUser.css'

function AddUser() {
  const [postFirstName, setPostFirstName] = useState("");
  const [postLastName, setPostLastName] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [postRole, setPostRole] = useState("User");
  let navigate = useNavigate();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/api/users",
      requestConfig: {
        FirstName: `${postFirstName}`,
        LastName: `${postLastName}`,
        Username: `${postUsername}`,
        Password: `${postPassword}`,
        Role: `${postRole}`,
      },
    });
    navigate(-1);
  };

  return (
    <Container>
      <Row>
        <Col className="p-2 d-flex justify-content-center">
          <Card className="form-card">
            <Card.Title className="page-title"><h3>Add new user</h3></Card.Title>
            {!loading && !error &&
              <Card.Body>
                <Form onSubmit={(e) => { e.preventDefault();handleSubmit(e) }} className="form">
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      required
                      value={postFirstName}
                      onChange={(e) => setPostFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      required
                      value={postLastName}
                      onChange={(e) => setPostLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      required
                      value={postUsername}
                      onChange={(e) => setPostUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      value={postPassword}
                      onChange={(e) => setPostPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>User's role:</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle className="" id="dropdown-basic">
                          {postRole}
                        </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item value="User" onClick={(e) => setPostRole("User")}>User</Dropdown.Item>
                        <Dropdown.Item value="Admin" onClick={(e) => setPostRole("Admin")}>Admin</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button className="button" type="submit">
                      Add user
                    </Button>
                  </div>


                  {loading && !error &&
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>}
                </Form>
              </Card.Body>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddUser;
