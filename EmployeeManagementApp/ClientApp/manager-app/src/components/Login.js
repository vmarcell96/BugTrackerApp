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
                <Card className='card' style={{ maxWidth: '500px'}}>
                    <Card.Body className='p-5 w-100 d-flex flex-column'>
                        <Form className="form-floating" onSubmit={handleSubmit}>
                            <Form.Group className="mb-4 w-100">
                                <div className="form-floating">
                                    <Form.Control placeholder="Username" type="text" onInput={e => setUsername(e.target.value)} required />
                                    <Form.Label>Username</Form.Label>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-4 w-100">
                                <div className="form-floating">
                                    <Form.Control placeholder="Password" type="password" onInput={e => setPassword(e.target.value)} required />
                                    <Form.Label>Password</Form.Label>
                                </div>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button className="button" type="submit">Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
    );
}

export default Login;