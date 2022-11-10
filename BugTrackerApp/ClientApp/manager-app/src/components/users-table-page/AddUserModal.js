//Packages
import React from "react";
import { useImperativeHandle, forwardRef } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
//Css
import './addUser.css'

const AddUserModal = forwardRef(({ users, setUsers }, ref) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    role: "",
  });
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const { error, loading, axiosFetch } = useAxiosFunction();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/api/users",
      requestConfig: newUser,
    });
    setShow(false);
    setUsers([...users, newUser]);
  };

  //Now it is possible to set the child component's state from the parent component
  //Pushing the add icon will invoke this function
  useImperativeHandle(ref, () => ({
    alterShow() {
      setShow(!show);
    },
  }));

  return (
    <Modal show={show} onHide={() => { setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title className="page-title"><h3>Add new user</h3></Modal.Title>
      </Modal.Header>
      {!loading && !error &&
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="mb-3">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                id="firstName"
                required
                value={newUser.firstName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                id="lastName"
                required
                value={newUser.lastName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                id="userName"
                required
                value={newUser.userName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                id="password"
                required
                value={newUser.password}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User's role:</Form.Label>
              <Form.Select id="role" onChange={onChange}>
                <option id={0} value={""}></option>
                <option id={1} value={"Admin"}>Admin</option>
                <option id={2} value={"User"}>User</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button 
                className="button" 
                type="submit"
                disabled={!newUser.role}
              >
                Add User
              </Button>
            </div>


            {loading && !error &&
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>}
          </Form>
        </Modal.Body>}
    </Modal>
  );
});

export default AddUserModal;
