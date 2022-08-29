import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { Button, Card, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

function AddUser() {
  const [isPendingAdd, setIsPendingAdd] = useState(false);
  const [postFirstName, setPostFirstName] = useState("");
  const [postLastName, setPostLastName] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [postRole, setPostRole] = useState("User");
  let navigate = useNavigate();
  const [users, error, loading, axiosFetch] = useAxiosFunction();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPendingAdd(true);
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
    setTimeout(() => {
      setIsPendingAdd(false);
    }, 1000);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <Card body>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="form"
      >
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
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {postRole}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item value="User" onClick={(e) => setPostRole("User")}>User</Dropdown.Item>
              <Dropdown.Item value="Admin" onClick={(e) => setPostRole("Admin")}>Admin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {!isPendingAdd && (
          <Button variant="primary" type="submit">
            Add user
          </Button>
        )}
        {isPendingAdd && (
          <button>
            <LoadingSpin />
          </button>
        )}
      </Form>
    </Card>
  );
}

export default AddUser;
