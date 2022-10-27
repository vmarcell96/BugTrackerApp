import { Table, Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const ProjectBugs = (props) => {
    const fixedBugs = props.bugs?.filter(bug => bug.isFixed == true && bug.assigneeId != 0);
    const unFixedBugs = props.bugs?.filter(bug => bug.isFixed == false && bug.assigneeId != 0);
    const unassignedBugs = props.bugs?.filter(bug => bug.assigneeId == 0);


    return (
        <>
            {props.bugs &&
                <>
                    <Row>
                        <Col className="p-2 d-flex justify-content-center">
                            <Card className="project-card">
                                <Card.Title className="page-title">Bugs</Card.Title>
                                <Card.Body>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Title</th>
                                                <th>Priority</th>
                                                <th>Assigned Dev</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {unFixedBugs?.map(bug =>
                                                <tr key={bug.id}>
                                                    <td>{bug.id}</td>
                                                    <td><Link to={`/bugs/${bug.id}`} state={bug}>{bug.title}</Link></td>
                                                    <td>{bug.priority}</td>
                                                    <td><Link to={`/profile/${(props.teamMembers.find(t => t.id == bug.assigneeId)).userId}`}>{(props.teamMembers.find(t => t.id == bug.assigneeId)).userName}</Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Title className="page-title">Fixed Bugs</Card.Title>
                                <Card.Body>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Title</th>
                                                <th>Priority</th>
                                                <th>Assigned Dev</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fixedBugs?.map(bug =>
                                                <tr key={bug.id}>
                                                    <td>{bug.id}</td>
                                                    <td><Link to={`/bugs/${bug.id}`}>{bug.title}</Link></td>
                                                    <td>{bug.priority}</td>
                                                    <td><Link to={`/profile/${(props.teamMembers.find(t => t.id == bug.assigneeId)).userId}`}>{(props.teamMembers.find(t => t.id == bug.assigneeId)).userName}</Link></td>
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
                                    <Card.Title className="page-title">Unassigned Bugs</Card.Title>
                                    <Card.Body>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Title</th>
                                                    <th>Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {unassignedBugs?.map(bug =>
                                                    <tr key={bug.id}>
                                                        <td>{bug.id}</td>
                                                        <td><Link to={`/bugs/${bug.id}`}>{bug.title}</Link></td>
                                                        <td>{bug.priority}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>}
                </>}
        </>
    )
}

export default ProjectBugs