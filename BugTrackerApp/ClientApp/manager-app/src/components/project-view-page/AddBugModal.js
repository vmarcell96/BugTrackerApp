//Packages
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
//Css


const AddBugModal = forwardRef(({ project, setProject }, ref) => {

    const { error, loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();

    const [newBug, setNewBug] = useState({
        title: "",
        details: "",
        priority: 1,
        assigneeId: 0,
        fixed: false,
        creatorId: `${auth?.id}`,
        projectId: `${project?.id}`
    });
    const [show, setShow] = useState(false);



    const onChange = (e) => {
        setNewBug({ ...newBug, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: "/api/projects/addbug",
            requestConfig: newBug
        })
        //setting project view page's project object to the new object with the added bug
        setProject(resp);
        setNewBug({
            title: "",
            details: "",
            priority: 1,
            assigneeId: 0,
            fixed: false,
            creatorId: `${auth?.id}`,
            projectId: `${project?.id}`
        });
        setShow(false);
    };

    //Now it is possible to set the child component's state from the parent component
    //Pushing the add bug button will invoke this function
    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
    }));

    return (
        <>
            {project && 
                <Modal show={show} onHide={() => { setShow(false) }}>
                    <Modal.Title className="page-title"><h3>Add new bug</h3></Modal.Title>
                    {!loading && !error &&
                        <Modal.Body>
                            <Form onSubmit={handleSubmit} className="form">
                                <Form.Group className="mb-3">
                                    <Form.Label>Bug Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Describe the bug in few words"
                                        id="title"
                                        required
                                        value={newBug.title}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bug Description:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter bug description"
                                        id="details"
                                        required
                                        value={newBug.details}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Priority:</Form.Label>
                                    <Form.Select id="priority" onChange={onChange}>
                                        <option id={1} value={1}>1</option>
                                        <option id={2} value={2}>2</option>
                                        <option id={3} value={3}>3</option>
                                        <option id={4} value={4}>4</option>
                                        <option id={5} value={5}>5</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Assigned Developer:</Form.Label>
                                    <Form.Select id="assigneeId" onChange={onChange}>
                                        <option value={0}>Nobody yet</option>
                                        {project.teamMembers.map(dev =>
                                            <option id={dev.id} value={dev.id}>{dev.userName}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button className="button" type="submit">
                                        Add Bug
                                    </Button>
                                </div>


                                {loading && !error &&
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>}
                            </Form>
                        </Modal.Body>}
                </Modal>}
        </>
    )
});

export default AddBugModal