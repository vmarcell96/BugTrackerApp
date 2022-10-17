import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Dropdown, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

function AddUser() {
  const [postFirstName, setPostFirstName] = useState("");
  const [postLastName, setPostLastName] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [postRole, setPostRole] = useState("User");
  let navigate = useNavigate();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosFetch({
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
      <Card className="w-100">
        <Card.Title>Add new employee</Card.Title>
        {!loading && !error && <Card.Body>
          <Form onSubmit={(e) => { handleSubmit(e) }} className="form">
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
              <Dropdown>
                <Dropdown.Toggle className="button" id="dropdown-basic">
                  {postRole}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="User" onClick={(e) => setPostRole("User")}>User</Dropdown.Item>
                  <Dropdown.Item value="Admin" onClick={(e) => setPostRole("Admin")}>Admin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button className="button" type="submit">
              Add user
            </Button>

            {loading && !error &&
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>}
          </Form>
        </Card.Body>}
      </Card>
    </Container>
  );
}

export default AddUser;
