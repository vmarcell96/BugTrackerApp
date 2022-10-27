//Packages
import { useState } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//Hooks
import useAuth from "../hooks/useAuth";
//Css
import './login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }

    return (
        <Container>
            <Row>
                <Col className="p-2 d-flex justify-content-center">
                    <Card className='form-card'>
                        <Card.Body className='p-5 d-flex flex-column align-items-center'>
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="mb-5">Please enter your login and password!</p>
                            <Form className="form-floating" onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <div className="form-floating">
                                        <Form.Control placeholder="Username" type="text" onInput={e => setUsername(e.target.value)} required />
                                        <Form.Label>Username</Form.Label>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <div className="form-floating">
                                        <Form.Control placeholder="Password" type="password" onInput={e => setPassword(e.target.value)} required />
                                        <Form.Label>Password</Form.Label>
                                    </div>
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button className="button" type="submit">Login</Button>
                                </div>
                            </Form>

                            <div className='d-flex flex-row mt-3 mb-5'>

                            </div>

                            <div>
                                {/* <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p> */}

                            </div>
                        </Card.Body>
                        <Card.Footer className="profile-footer">
                            <Button className='my-1 mx-3 login-icon-button'>
                                <FontAwesomeIcon icon={faTwitterSquare} className="login-icon" />
                            </Button>

                            <Button className='my-1 mx-3 login-icon-button'>
                                <FontAwesomeIcon icon={faFacebookSquare} className="login-icon" />
                            </Button>

                            <Button className='my-1 mx-3 login-icon-button'>
                                <FontAwesomeIcon icon={faInstagramSquare} className="login-icon" />
                            </Button>
                            <Button className=' my-1 mx-3 login-icon-button'>
                                <FontAwesomeIcon icon={faGithubSquare} className="login-icon" />
                            </Button>
                        </Card.Footer>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}

export default Login;