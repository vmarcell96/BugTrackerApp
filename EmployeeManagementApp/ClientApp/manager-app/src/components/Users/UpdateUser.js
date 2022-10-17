import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

function UpdateUser() {
  let navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const { id } = useParams();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const [updateFirstName, setUpdateFirstName] = useState(user.firstName);
  const [updateLastName, setUpdateLastName] = useState(user.lastName);
  const [updateUsername, setUpdateUsername] = useState(user.userName);
  const [updatePassword, setUpdatePassword] = useState(user.password);

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: `/api/users/${id}`,
      requestConfig: {
        Id: `${id}`,
        FirstName: `${updateFirstName}`,
        LastName: `${updateLastName}`,
        Username: `${updateUsername}`,
        Password: `${updatePassword}`,
      },
    });
    navigate(-1);
  };

  return (
    <Container>
      <Card className="w-100">
        <Card.Title>Update user</Card.Title>
        {!loading && !error && <Card.Body>
          <Form
            onSubmit={(e) => {
              handleUpdate(e);
            }}
            className="form"
          >
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                required
                value={updateFirstName}
                onChange={(e) => setUpdateFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                required
                value={updateLastName}
                onChange={(e) => setUpdateLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
              />
            </Form.Group>
            {!loading && (
              <Button variant="primary" type="submit">
                Update user
              </Button>
            )}

          </Form>
        </Card.Body>}
        {loading &&
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
      </Card>
    </Container>
  );
}

export default UpdateUser;
