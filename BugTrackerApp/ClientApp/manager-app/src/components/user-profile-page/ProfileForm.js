import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
//Misc
import axios from "../../apis/axiosInstance";

const ProfileForm = ({ user, setUser }) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const { error, loading, axiosFetch } = useAxiosFunction();

    const [updatedUser, setUpdatedUser] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        role: user.role,
        password: "",
    });

    const onChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const resp = await axiosFetch({
            axiosInstance: axios,
            method: "PUT",
            url: `/api/users`,
            requestConfig: updatedUser,
        });
        setUser(resp);
    };

    return (
        <>
            <Card className=" profile-card">
                <Card.Header><Card.Title className='page-title'><h3>Update profile</h3></Card.Title></Card.Header>
            {loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
                {!loading && !error && <Card.Body>
                    <Form
                        onSubmit={handleUpdate}
                        className="form"
                    >
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={!isEditMode}
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
                                disabled={!isEditMode}
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
                                disabled={!isEditMode}
                                placeholder="Enter username"
                                id="userName"
                                required
                                value={updatedUser.userName}
                                onChange={onChange}
                            />
                        </Form.Group>
                        {isEditMode && <Form.Group className="mb-3">
                            <Form.Label>Confirm changes with password:</Form.Label>
                            <Form.Control
                                type="password"
                                disabled={!isEditMode}
                                placeholder="Enter current password"
                                id="password"
                                required
                                value={updatedUser.password}
                                onChange={onChange}
                            />
                        </Form.Group>}
                        {!loading && isEditMode && (
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Update profile
                                </Button>
                            </div>
                        )}

                    </Form>
                        <div className="d-flex justify-content-center">
                            <Button className='mb-3' variant={isEditMode ? "secondary" : "primary"} onClick={() => { setIsEditMode(!isEditMode); }}>
                                {isEditMode ? 'Cancel' : 'Edit'}
                            </Button>
                        </div>
                </Card.Body>}
            </Card>
        </>
    )
}

export default ProfileForm