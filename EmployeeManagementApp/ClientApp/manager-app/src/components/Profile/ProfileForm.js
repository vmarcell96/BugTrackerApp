import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
//Misc
import axios from "../../apis/axiosInstance";

const ProfileForm = (props) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [updateFirstName, setUpdateFirstName] = useState(props.user.firstName);
    const [updateLastName, setUpdateLastName] = useState(props.user.lastName);
    const [updateUsername, setUpdateUsername] = useState(props.user.userName);
    const [updatePassword, setUpdatePassword] = useState(props.user.password);
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

    const btnVariant = isEditMode ? "secondary" : "primary";

    const handleUpdate = (e) => {
        e.preventDefault();
        axiosFetch({
            axiosInstance: axios,
            method: "PUT",
            url: `/api/users/${props.user.id}`,
            requestConfig: {
                Id: `${props.user.id}`,
                FirstName: `${updateFirstName}`,
                LastName: `${updateLastName}`,
                Username: `${updateUsername}`,
                Password: `${updatePassword}`,
            },
        });
    };

    return (
        <Card className=" profile-card py-2">
            <Card.Title className='page-title'><h3>Update profile</h3></Card.Title>
            {!loading && !error && <Card.Body>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(e);
                        props.setIsDataChanged(prev => !prev);
                    }}
                    className="form"
                >
                    <Form.Group controlId="formBasicText">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            required
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
                            value={updateUsername}
                            onChange={(e) => setUpdateUsername(e.target.value)}
                        />
                    </Form.Group>
                    {isEditMode && <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            required
                            disabled={!isEditMode}
                            value={updatePassword}
                            onChange={(e) => setUpdatePassword(e.target.value)}
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
            </Card.Body>}
            {loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
            {props.isUserLoggedIn &&
                <div className="d-flex justify-content-center">
                    <Button className='mb-3' variant={btnVariant} onClick={() => { setIsEditMode(!isEditMode); }}>
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </Button>
                </div>}
        </Card>
    )
}

export default ProfileForm