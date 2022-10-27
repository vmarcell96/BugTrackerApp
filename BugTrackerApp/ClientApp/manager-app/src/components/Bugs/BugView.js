import { useLocation } from "react-router"
import useDateFormat from "../../hooks/useDateFormat";
import {Col,Row,Card,Container} from "react-bootstrap";

const BugView = () => {

    const location = useLocation();
    const bug = location.state;
    const dateFormat = useDateFormat();

    return (
        <Container>
            <Row>
                <Col className="p-2 d-flex justify-content-center">
                    <Card className='project-card'>
                        <Card.Title className='page-title'><h3>{bug.title}</h3></Card.Title>
                        <Card.Body>
                            <div>{bug.details}</div>
                        </Card.Body>
                        <Card.Body>
                            <ul>
                                <li>Project Id: {bug.projectId}</li>
                                <li>Assignee Id: {bug.assigneeId}</li>
                                <li>Fixed: {bug.isFixed}</li>
                                <li>Creator Id: {bug.creatorId}</li>
                                <li>Post Date: {dateFormat(bug.postDate)}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default BugView