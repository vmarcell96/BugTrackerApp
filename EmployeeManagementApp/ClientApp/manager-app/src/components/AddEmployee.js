import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from '../apis/axiosInstance';
import useAxiosFunction from '../hooks/useAxiosFunction';


function AddEmployee() {
    const [isPendingAdd, setIsPendingAdd] = useState(false);
    const [postFirstName, setPostFirstName] = useState('');
    const [postLastName, setPostLastName] = useState('');
    const [postDate, setPostDate] = useState(new Date());
    let navigate = useNavigate();
    const [employees, error, loading, axiosFetch] = useAxiosFunction();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPendingAdd(true);
        console.log({
            "FirstName": `${postFirstName}`,
            "LastName": `${postLastName}`,
            "HiringDate": `${postDate}`
        });
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/api/employees',
            requestConfig: {
                "FirstName": `${postFirstName}`,
                "LastName": `${postLastName}`,
                "HiringDate": `${postDate}`
            }
        })
        setTimeout(() => { setIsPendingAdd(false) }, 1000);
        setTimeout(() => { navigate(-1) }, 1000);
    };


    return (
        <Card body>
        <Form onSubmit={(e)=>{handleSubmit(e)}} className="form">
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
                <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Hiring Date"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
                />
            </Form.Group>
            {!isPendingAdd && <Button variant="primary" type="submit">Add partner</Button>}
            {isPendingAdd && <button><LoadingSpin /></button>}
        </Form>
        </Card>
    )
}

export default AddEmployee

