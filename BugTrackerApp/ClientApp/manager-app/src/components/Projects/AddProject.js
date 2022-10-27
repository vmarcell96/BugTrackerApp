//Packages
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Dropdown, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
//Css
// import './addUser.css'

function AddProject() {
    const [projectName, setProjectName] = useState("");
    const [desc, setDesc] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    let navigate = useNavigate();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const { auth } = useAuth();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/projects/addproject`,
            requestConfig: {
                Name: `${projectName}`,
                Description: `${desc}`,
                IsPublic: true,
                CreatorId: `${auth.id}`
            },
        });
        // Refactor
        navigate(-1);
    };

    return (
        <Container>
            <Row>
                <Col className="p-2 d-flex justify-content-center">
                    <Card className="form-card">
                        <Card.Title className="page-title"><h3>Create Project</h3></Card.Title>
                        {!loading && !error &&
                            <Card.Body>
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} className="form">
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>Project Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter project name"
                                            required
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>Project Description:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter project description"
                                            required
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-check form-switch" controlId="formBasicText">
                                        <Form.Control
                                            type="checkbox"
                                            className="form-check-input"
                                            value={isPublic}
                                            onChange={(e) => {setIsPublic(prev => !prev);}}
                                            />
                                            <Form.Label>Private</Form.Label>
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <Button className="button" type="submit">
                                            Create
                                        </Button>
                                    </div>


                                    {loading && !error &&
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>}
                                </Form>
                            </Card.Body>}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProject;
