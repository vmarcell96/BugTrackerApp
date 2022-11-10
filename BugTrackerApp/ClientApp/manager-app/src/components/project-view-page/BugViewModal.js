import { Modal, Form, Button } from "react-bootstrap";
import { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/axiosInstance";
import { useEffect } from "react";

const BugViewModal = forwardRef(({ project, setProject }, ref) => {

    const [show, setShow] = useState(false);
    const [bug, setBug] = useState();
    const [isEditMode, setIsEditMode] = useState(false);

    const { response, loading, error, axiosFetch } = useAxiosFunction();

    useEffect(() => {
        setUpdatedBug({
            id: bug?.id,
            title: bug?.title,
            details: bug?.details,
            priority: bug?.priority,
            assigneeId: bug?.assigneeId,
            fixed: bug?.fixed,
            creatorId: bug?.creatorId,
            projectId: bug?.projectId
        })
    }, [bug]);

    const [updatedBug, setUpdatedBug] = useState({});

    const onChange = (e) => {
        setUpdatedBug({ ...updatedBug, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axiosFetch({
            axiosInstance: axios,
            method: "PUT",
            url: "/api/projects/updatebug",
            requestConfig: updatedBug
        })
        //setting project view page's project object to the new object with the added bug
        setProject(resp);
        setIsEditMode(false);
        setShow(false);
    };

    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
        initBug(bug) {
            console.log(bug)
            setBug(bug);
        }
    }));

    return (
        <>
            {bug &&
                <Modal show={show} onHide={() => { setShow(false);setIsEditMode(false); }}>
                    <Modal.Title className="page-title">{isEditMode ? "Edit bug" : "Bug info"}</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit} className="form">
                            <Form.Group className="mb-3">
                                <Form.Label>Bug Title:</Form.Label>
                                <Form.Control
                                    disabled={!isEditMode}
                                    type="text"
                                    placeholder="Describe the bug in few words"
                                    id="title"
                                    required
                                    value={updatedBug.title}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bug Description:</Form.Label>
                                <Form.Control
                                    disabled={!isEditMode}
                                    type="text"
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter bug description"
                                    id="details"
                                    required
                                    value={updatedBug.details}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority:</Form.Label>
                                <Form.Select
                                    disabled={!isEditMode}
                                    id="priority"
                                    onChange={onChange}
                                    defaultValue={bug.priority}
                                >
                                    <option id={1} value={1}>1</option>
                                    <option id={2} value={2}>2</option>
                                    <option id={3} value={3}>3</option>
                                    <option id={4} value={4}>4</option>
                                    <option id={5} value={5}>5</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Assigned Developer:</Form.Label>
                                <Form.Select
                                    disabled={!isEditMode}
                                    id="assigneeId"
                                    onChange={onChange}
                                    defaultValue={bug.assigneeId}
                                >
                                    <option value={0}>Nobody yet</option>
                                    {project.teamMembers.map(dev =>
                                        <option id={dev.id} value={dev.id}>{dev.userName}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button className="button" onClick={() => { setIsEditMode(prev => !prev) }}>
                                    {isEditMode ? "Cancel" : "Edit"}
                                </Button>
                                {isEditMode &&
                                    <Button className="button" type="submit">
                                        Confirm Changes
                                    </Button>}
                            </div>


                            {loading && !error &&
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                        </Form>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
});

export default BugViewModal