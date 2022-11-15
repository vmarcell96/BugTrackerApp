import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjectContext } from './index';

const ProjectTeamMembers = ({}) => {

    const { project, setProject } = useContext(ProjectContext);



    return (
        <Card className='project-card'>
            <Card.Header><Card.Title className='page-title'>Team members</Card.Title></Card.Header>
            <Card.Body>
                <ul>
                    {project.teamMembers?.map(memb => <li key={memb.userId}><Link className='link' to={`/profile/${memb.userId}`}>{memb.userName}</Link></li>)}
                </ul>
            </Card.Body>
        </Card>
    )
}

export default ProjectTeamMembers;