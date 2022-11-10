//Packages
import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
//Css
import './updateUser.css'

const UpdateUserModal = forwardRef(({ users, setUsers }, ref) => {

  const { error, loading, axiosFetch } = useAxiosFunction();

  //first updateduser's value is set to the user's we want to update with the alterUserToUpdate function
  const [updatedUser, setUpdatedUser] = useState({});
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
  };

  //Now it is possible to set the child component's state from the parent component
  //Pushing the update icon will invoke this functions
  useImperativeHandle(ref, () => ({
    alterShow() {
      setShow(!show);
    },
    //first updateduser's value is set to the user's we want to update
    alterUserToUpdate(user) {
      setUpdatedUser(user);
    }
  }));

  //When the admin updates a user's information there is no need to check password validity on the backend
  const handleUpdate = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: `/api/users/adminupdate`,
      requestConfig: updatedUser
    });
    //switching the old user with the updated one
    setUsers([...(users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
      return user;
    }))]);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => { setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title className="page-title"><h3>Update user</h3></Modal.Title>
      </Modal.Header>
      {!loading && !error &&
        <Modal.Body>
          <Form onSubmit={handleUpdate} className="form">
            <Form.Group className="mb-3">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                id="firstName"
                required
                value={updatedUser.firstName}
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
                value={updatedUser.lastName}
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
                value={updatedUser.userName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User's role:</Form.Label>
              <Form.Select id="role" onChange={onChange}>
                <option id={0} value={updatedUser.role}>{updatedUser.role}</option>
                <option id={1} value={updatedUser.role === "Admin" ? "User" : "Admin"}>{updatedUser.role === "Admin" ? "User" : "Admin"}</option>
              </Form.Select>
            </Form.Group>
            {!loading && (
              <div className="d-flex justify-content-center">
                <Button className="button" type="submit">
                  Update user
                </Button>
              </div>
            )}

          </Form>
        </Modal.Body>}
      {loading &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>}
    </Modal>
  );
});

export default UpdateUserModal;
