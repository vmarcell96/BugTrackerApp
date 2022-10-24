import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import pic from "./def2.jpg"
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const ProfileCard = (props) => {

    return (
        <Card className="p-0 profile-card">
            <Card.Img variant="top" src={pic} />
            <Card.Body className="infopart">
                <h1 id="name">{props.user.firstName} {props.user.lastName}</h1>
                <h4 id="profession">Fullstack Developer</h4>
                <p id="email">vajdam96@gmail.com</p>
                <div id="button-box">
                    <Button className='button'><FontAwesomeIcon icon={faMailBulk} id="icon" /> Email</Button>
                    <Button className='button'><FontAwesomeIcon icon={faLinkedin} id="icon" /> LinkedIn</Button>
                </div>
            </Card.Body>
            <Card.Body className="about">
                <h3>About</h3>
                <p>I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.</p>
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
    )
}

export default ProfileCard