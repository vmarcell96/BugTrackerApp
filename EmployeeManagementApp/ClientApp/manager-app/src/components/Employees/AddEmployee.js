//Packages
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
//Misc
import axios from '../../apis/axiosInstance';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useDateFormat from '../../hooks/useDateFormat';
//Css
import './addEmployee.css'

function AddEmployee(props) {

    const dateFormat = useDateFormat();
    const [postFirstName, setPostFirstName] = useState('');
    const [postLastName, setPostLastName] = useState('');
    const [postDate, setPostDate] = useState(dateFormat(Date.now()));
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/api/employees',
            requestConfig: {
                "FirstName": `${postFirstName}`,
                "LastName": `${postLastName}`,
                "HiringDate": `${dateFormat(postDate)}`
            }
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
                            <Form.Label>Hiring Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={postDate}
                                onChange={(e) => setPostDate(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="button" type="submit">Add employee</Button>


                    </Form>
                </Card.Body>}
                {loading && !error &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
            </Card>
        </Container>
    )
}

export default AddEmployee

