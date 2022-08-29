import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

function UpdateUser() {
  let navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const { id } = useParams();
  const [employees, error, loading, axiosFetch] = useAxiosFunction();

  const [updateFirstName, setUpdateFirstName] = useState(user.firstName);
  const [updateLastName, setUpdateLastName] = useState(user.lastName);
  const [updateUsername, setUpdateUsername] = useState(user.username);
  const [updatePassword, setUpdatePassword] = useState(user.password);

  const [isPendingUpdate, setIsPendingUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsPendingUpdate(true);
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
    setTimeout(() => {
      setIsPendingUpdate(false);
    }, 1000);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <Card body>
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
        {!isPendingUpdate && (
          <Button variant="primary" type="submit">
            Update user
          </Button>
        )}
        {isPendingUpdate && (
          <button>
            <LoadingSpin />
          </button>
        )}
      </Form>
    </Card>
  );
}

export default UpdateUser;
