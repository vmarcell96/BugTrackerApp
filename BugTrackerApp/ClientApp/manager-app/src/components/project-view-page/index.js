//Packages
import { useEffect, useRef, createContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useMemo } from 'react';
//Components
import ProjectBugs from './ProjectBugs';
import AddBugModal from './AddBugModal';
import ProjectTeamMembers from './ProjectTeamMembers';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './projectView.css'
import ProjectInfo from './ProjectInfo';
import { useState } from 'react';

export const ProjectContext = createContext({});

const ProjectView = () => {

    const { id } = useParams();
    const { response, setResponse, error, loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();
    const navigate = useNavigate();
    //Using imperative handle to set modal component's show state
    const addBugRef = useRef(null);
    const [project, setProject] = useState();
    const [user, setUser] = useState();
    const [friends, setFriends] = useState();

    // Logged in user is member of the projects's team
    const isTeamMember = useMemo(() => {
        return project?.teamMembers.filter(tm => tm.userId === +(auth?.id)).length > 0;
    }, [project]);



    const getProjectData = async () => {
        const user = await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/users/${auth.id}`,
        });
        if (user !== undefined) {
            setUser(user);
            const currentProject = user.contributedProjects.find(p => p.id == id);
            setProject(currentProject);
        }
        const friends = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/users/getfriends?userId=${auth.id}`,
        });
        if (friends !== undefined) {
            setFriends(friends);
        }
        
    };

    useEffect(() => {
        getProjectData();
    }, [])

    return (
        <>
            {/* Loading Spin */}
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {/* Loading Spin */}
            {!loading && project && user &&
            <ProjectContext.Provider value={{ project, setProject, isTeamMember, user, friends }}>
                {(isTeamMember || project.isPublic) &&
                    <Container>
                        <Row>
                            <Col xs={12} md={6} >
                                <Row>
                                    <Col className="p-2 d-flex justify-content-center">
                                        <ProjectInfo 
                                            addBugRef={addBugRef} 
                                            isTeamMember={isTeamMember}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={6}>
                                <Row>
                                    <Col className="p-2 d-flex justify-content-center">
                                        <ProjectTeamMembers />
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
                {(isTeamMember || project.isPublic) &&
                    <AddBugModal
                        project={project}
                        setProject={setProject}
                        ref={addBugRef}
                    />

                }
            </ProjectContext.Provider>}
        </>
    )
}

export default ProjectView