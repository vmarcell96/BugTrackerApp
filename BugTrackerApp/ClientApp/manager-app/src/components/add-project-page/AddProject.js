//Packages
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Dropdown, Container, Row, Col, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
//Css

function AddProject() {
    const [isPublic, setIsPublic] = useState(true);
    const { response, error, loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();
    let navigate = useNavigate();

    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        creatorId: `${auth.id}`,
        isPublic: isPublic,
    });

    const onChange = (e) => {
        setNewProject({ ...newProject, [e.target.id]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/projects/addproject`,
            requestConfig: newProject
        });
        navigate(`/profile/${auth.id}`);
    };

    return (
        <Container>
            <Row>
                <Col className="p-2 d-flex justify-content-center">
                {!loading && !error &&
                    <Card className="form-card">
                        <Card.Header><Card.Title className="page-title"><h3>Create Project</h3></Card.Title></Card.Header>
                        
                            <Card.Body>
                                <Form onSubmit={handleSubmit} className="form">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Project Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter project name"
                                            id="name"
                                            required
                                            value={newProject.name}
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Project Description:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter project description"
                                            id="description"
                                            required
                                            value={newProject.description}
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-check form-switch">
                                        <Form.Control
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isPublic"
                                            value={isPublic}
                                            onChange={() => { setIsPublic(prev => !prev); }}
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
                                </Card.Body>
                    </Card>}
                </Col>
            </Row>
        </Container>
    );
}

export default AddProject;
