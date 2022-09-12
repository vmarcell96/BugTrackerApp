import React from "react";
import { Button, Form, Card, Row, Col} from "react-bootstrap";
import '../home.css'

const Home = () => {
  return (
    <Row className='d-flex justify-content-center align-items-center h-100'>
    <Col col='12'>
        <Card className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <Card.Body className='p-5 w-100 d-flex flex-column'>
                <Col>
                  <div className="d-flex justify-content-center">
                      Welcome to my page!
                  </div>
                </Col>
            </Card.Body>
        </Card>
    </Col>
  </Row>
  )
};

export default Home;
