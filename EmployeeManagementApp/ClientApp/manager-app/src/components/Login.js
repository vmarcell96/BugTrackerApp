import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import '../login.css'; 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }

    return (
        <Row className='d-flex justify-content-center align-items-center h-100'>
            <Col col='12'>
                <Card className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <Card.Body className='p-5 w-100 d-flex flex-column'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4 w-100">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onInput={e => setUsername(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-4 w-100">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onInput={e => setPassword(e.target.value)} required />
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;