//Packages
import { useNavigate, useLocation } from "react-router-dom";
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


const AddBug = () => {

    const [bugTitle, setBugTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState(1);
    const [assigneeId, setAssigneeId] = useState(0);
    let navigate = useNavigate();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const { auth } = useAuth();
    const location = useLocation();
    const projectState = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: "/api/projects/addbug",
            requestConfig: {
                Title: `${bugTitle}`,
                Details: `${details}`,
                Priority: `${priority}`,
                AssigneeId: `${assigneeId}`,
                Fixed: false,
                CreatorId: `${auth?.id}`,
                ProjectId: `${projectState.id}`
            },
        });
        navigate(-1);
    };

    return (
        <Container>
            <Row>
                <Col className="p-2 d-flex justify-content-center">
                    {!loading && 
                    <Card className="form-card">
                        <Card.Title className="page-title"><h3>Add new bug</h3></Card.Title>
                        {!loading && !error &&
                            <Card.Body>
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} className="form">
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>Bug Title:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Describe bug in few words"
                                            required
                                            value={bugTitle}
                                            onChange={(e) => setBugTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>Bug Description:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter bug description"
                                            required
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Priority:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { setPriority(e.target.value) }}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Assigned Developer:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { setAssigneeId(e.target.value) }}>
                                            <option value={0}></option>
                                            {projectState.teamMembers.map(dev =>
                                                <option value={dev.id}>{dev.userName}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <Button className="button" type="submit">
                                            Add Bug
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
                    </Card>}
                </Col>
            </Row>
        </Container>
    )
}

export default AddBug