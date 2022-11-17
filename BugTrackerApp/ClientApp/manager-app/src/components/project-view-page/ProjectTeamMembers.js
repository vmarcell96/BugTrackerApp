import { useRef } from 'react';
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddTeamMemberModal from './AddTeamMemberModal';
import { ProjectContext } from './index';

const ProjectTeamMembers = ({ }) => {

    const { project, setProject, isTeamMember } = useContext(ProjectContext);
    const addTeamMemberModalRef = useRef(null);



    return (
        <>
        <Card className='project-card'>
            <Card.Header><Card.Title className='page-title'>Team members</Card.Title></Card.Header>
            <Card.Body>
                <ul>
                    {project.teamMembers?.map(memb => <li key={memb.userId}><Link className='link' to={`/profile/${memb.userId}`}>{memb.userName}</Link></li>)}
                </ul>
            </Card.Body>
            <Card.Footer>
                {isTeamMember && <div className="d-flex justify-content-center">
                    <Button className="button" type="submit" onClick={() => { addTeamMemberModalRef.current.alterShow(); }}>
                        Add New Team Member
                    </Button>
                </div>}
            </Card.Footer>
        </Card>
        <AddTeamMemberModal ref={addTeamMemberModalRef} />
        </>
    )
}

export default ProjectTeamMembers;