import { useContext } from "react";
import { forwardRef } from "react";
import { useState, useImperativeHandle } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ProjectContext } from ".";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/axiosInstance";
import { useEffect } from "react";


const AddTeamMemberModal = forwardRef(({ }, ref) => {

    const { loading, error, axiosFetch } = useAxiosFunction();
    const { project, setProject, user, friends } = useContext(ProjectContext);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(0);
    const [notTeamMemberFriends, setNotTeamMemberFriends] = useState([]);


    const onChange = (e) => {
        setUserId(e.target.value);
        console.log(e.target.value);
    };

    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
    }));

    useEffect(() => {
        const friendsWhoAreNotTeamMembers = friends.filter(f => {
            return project?.teamMembers.filter(tm => tm.userId === f.id).length === 0;
        })
        setNotTeamMemberFriends(friendsWhoAreNotTeamMembers);
    }, [project])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/projects/addmember?userId=${userId}&projectId=${project.id}`,
        });
        if (resp !== undefined) {
            setProject(resp);
        }
        setShow(false);
    };

    

    return (
        <>
            {!loading && !error && project &&
                <Modal show={show} onHide={() => { setShow(false) }}>
                    <Modal.Title className="page-title">Add Team Member</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit} className="form">
                            <Form.Group className="mb-3">
                                <Form.Label>Friends:</Form.Label>
                                <Form.Select id="userId" onChange={onChange}>
                                    <option value={0}></option>
                                    {notTeamMemberFriends.map(friend =>
                                        <option id={friend.id} value={friend.id}>{friend.userName}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button disabled={userId===0} className="button" type="submit">
                                    Add Member
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>}
        </>
    );
});

export default AddTeamMemberModal;