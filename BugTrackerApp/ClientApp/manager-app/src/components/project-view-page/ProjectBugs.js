import { useState } from "react";
import { forwardRef } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useMemo } from "react";
import { Table, Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import BugViewModal from "./BugViewModal";
import { useRef } from "react";
import { ProjectContext } from './index';
import { useContext } from "react";

const ProjectBugs = forwardRef(({ }, ref) => {

    const { project, setProject } = useContext(ProjectContext);
    const [fixedBugs, setFixedBugs] = useState([]);
    const [unFixedBugs, setUnFixedBugs] = useState([]);
    const [unassignedBugs, setUnassignedBugs] = useState([]);
    const viewBugRef = useRef(null);

    useEffect(() => {
        setFixedBugs(project.bugs?.filter(bug => bug.isFixed === true && bug.assigneeId !== 0));
        setUnFixedBugs(project.bugs?.filter(bug => bug.isFixed === false && bug.assigneeId !== 0));
        setUnassignedBugs(project.bugs?.filter(bug => bug.assigneeId === 0));
    }, [project]);

    const handleClick = (bug) => {
        viewBugRef.current.initBug(bug);
        viewBugRef.current.alterShow();
    }

    return (
        <>
            {project &&
                <>
                    <Row>
                        <Col className="p-2 d-flex justify-content-center">
                            <Card className="project-card">
                                <Card.Header><Card.Title className="page-title">Bugs</Card.Title></Card.Header>
                                <Card.Body className="p-2 d-flex justify-content-center">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Priority</th>
                                                <th>Assigned Dev</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {unFixedBugs?.map(bug =>
                                                <tr key={bug.id}>
                                                    <td className="link" onClick={() => { handleClick(bug) }}>{bug.title}</td>
                                                    <td>{bug.priority}</td>
                                                    <td><Link className="link" to={`/profile/${(project.teamMembers.find(t => t.id == bug.assigneeId)).userId}`}>{(project.teamMembers.find(t => t.id == bug.assigneeId)).userName}</Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-2 d-flex justify-content-center">
                            <Card className="project-card">
                                <Card.Header><Card.Title className="page-title">Fixed Bugs</Card.Title></Card.Header>
                                <Card.Body>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Priority</th>
                                                <th>Assigned Dev</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fixedBugs?.map(bug =>
                                                <tr key={bug.id}>
                                                    <td className="link" onClick={() => { handleClick(bug) }}>{bug.title}</td>
                                                    <td>{bug.priority}</td>
                                                    <td><Link className="link" to={`/profile/${(project.teamMembers.find(t => t.id == bug.assigneeId)).userId}`}>{(project.teamMembers.find(t => t.id == bug.assigneeId)).userName}</Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {unassignedBugs?.length > 0 &&
                        <Row>
                            <Col className="p-2 d-flex justify-content-center">
                                <Card className="project-card">
                                    <Card.Header><Card.Title className="page-title">Unassigned Bugs</Card.Title></Card.Header>
                                    <Card.Body>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {unassignedBugs?.map((bug, id) =>
                                                    <tr key={id}>
                                                        <td className="link" onClick={() => { handleClick(bug) }}>{bug.title}</td>
                                                        <td>{bug.priority}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>}
                    <BugViewModal
                        project={project}
                        setProject={setProject}
                        ref={viewBugRef}
                    />
                </>}
        </>
    )
});

export default ProjectBugs