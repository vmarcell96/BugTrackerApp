import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjectContext } from './index';

const ProjectInfo = ({ addBugRef, isTeamMember }) => {

    const { project, setProject } = useContext(ProjectContext);

    return (
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
    );
}

export default ProjectInfo;