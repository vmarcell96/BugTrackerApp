import { useState } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import '../login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }

    return (
        <Container fluid>

            <Row className='d-flex justify-content-center align-items-center h-100'>
                <Col col='12'>

                    <Card className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
                            <Form className="form-floating" onSubmit={handleSubmit}>
                                <Form.Group className="mb-4 w-100">
                                    <div className="form-floating" style={{ color: "black" }}>
                                        <Form.Control placeholder="Username" type="text" onInput={e => setUsername(e.target.value)} required />
                                        <Form.Label>Username</Form.Label>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4 w-100">
                                    <div className="form-floating" style={{ color: "black" }}>
                                        <Form.Control placeholder="Password" type="password" onInput={e => setPassword(e.target.value)} required />
                                        <Form.Label>Password</Form.Label>
                                    </div>
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button className="button" type="submit">Login</Button>
                                </div>
                            </Form>

                            <div className='d-flex flex-row mt-3 mb-5'>
                                <Button className='m-3 button login-icon-button' style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faTwitterSquare} className="login-icon" />
                                </Button>

                                <Button className='m-3 button login-icon-button' style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faFacebookSquare} className="login-icon" />
                                </Button>

                                <Button className='m-3 button login-icon-button' style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faInstagramSquare} className="login-icon" />
                                </Button>
                                <Button className='m-3 button login-icon-button' style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faGithubSquare} className="login-icon" />
                                </Button>
                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

                            </div>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>

        </Container>
    );
}

export default Login;