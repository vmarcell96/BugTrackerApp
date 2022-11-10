//Packages
import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useMemo } from 'react';
//Components
import ProjectBugs from './ProjectBugs';
import AddBugModal from './AddBugModal';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './projectView.css'

const ProjectView = () => {

    const { id } = useParams();
    const { response: project, setResponse: setProject, error, loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();
    const navigate = useNavigate();
    //Using imperative handle to set modal component's show state
    const addBugRef = useRef(null);

    // Logged in user is member of the projects's team
    const isTeamMember = useMemo(() => {
        return project?.teamMembers.filter(tm => tm.userId === +(auth?.id)).length > 0;
    }, [project]);


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

    return (
        <>
            {!loading && project && (isTeamMember || project.isPublic) &&
                <Container>
                    <Row>
                        <Col xs={12} md={6} >
                            <Row>
                                <Col className="p-2 d-flex justify-content-center">
                                    <Card className='project-card'>
                                        <Card.Header><Card.Title className='page-title'><h3>{project.name}</h3></Card.Title></Card.Header>
                                        <Card.Body>
                                            <div>{project.description}</div>
                                        </Card.Body>
                                        <Card.Footer>
                                            {isTeamMember && <div className="d-flex justify-content-center">
                                                <Button className="button" type="submit" onClick={() => { addBugRef.current.alterShow(); }}>
                                                    Add Bug
                                                </Button>
                                            </div>}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col className="p-2 d-flex justify-content-center">
                                    <Card className='project-card'>
                                        <Card.Header><Card.Title className='page-title'>Team members</Card.Title></Card.Header>
                                        <Card.Body>
                                            <ul>
                                                {project.teamMembers?.map(memb => <li key={memb.userId}><Link className='link' to={`/profile/${memb.userId}`}>{memb.userName}</Link></li>)}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {project && isTeamMember &&
                                <ProjectBugs
                                    project={project}
                                    setProject={setProject}
                                />
                            }
                        </Col>
                    </Row>
                    {!loading && project && !(isTeamMember || project.isPublic) &&
                        <div>This is a private project, and you are not a team member.</div>
                    }
                </Container>}
            {!loading && project && (isTeamMember || project.isPublic) &&
                <AddBugModal
                    project={project}
                    setProject={setProject}
                    ref={addBugRef}
                />

            }
        </>
    )
}

export default ProjectView