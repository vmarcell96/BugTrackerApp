//Packages
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
//Components
import ProjectBugs from './ProjectBugs';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './projectView.css'
import { useState } from 'react';

const ProjectView = () => {

    const { id } = useParams();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const { auth } = useAuth();
    const navigate = useNavigate();


    // If user is logged in and part of the project team can modify thing
    // If project is private only team members can see project page
    // If public you just need to be logged in
    const isUserLoggedIn = auth?.id === id;
    // Logged in user is member of the projects's team
    const isTeamMember = true;



    const getProjectData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/projects/${id}`,
        });
    };

    useEffect(() => {
        getProjectData();
    }, [])

    const navToAddBug = () => {
        navigate(`/bugs/add`, { state: data });
      };



    return (
        <Container>
            {!loading && 
            <Row>
                <Col xs={12} md={6} >
                    <Row>
                        <Col className="p-2 d-flex justify-content-center">
                            <Card className='project-card'>
                                <Card.Title className='page-title'><h3>{data.name}</h3></Card.Title>
                                <Card.Body>
                                    <div>{data.description}</div>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-flex justify-content-center">
                                        <Button className="button" type="submit" onClick={() => {navToAddBug()}}>
                                            Add Bug
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>

                </Col>
                <Col xs={12} md={6}>
                    <Row>
                        <Col className="p-2 d-flex justify-content-center">
                            <Card className='project-card'>
                                <Card.Title className='page-title'><h3>Team members</h3></Card.Title>
                                <Card.Body>
                                    <ul>
                                        {data.teamMembers?.map(memb => <li key={memb.userId}><Link to={`/profile/${memb.userId}`}>{memb.userName}</Link></li>)}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {isTeamMember && data &&
                        <ProjectBugs bugs={data.bugs} teamMembers={data.teamMembers} />}
                </Col>
            </Row>}
        </Container>
    )
}

export default ProjectView