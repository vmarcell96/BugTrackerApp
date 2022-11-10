import { Modal, Button } from "react-bootstrap";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import './deleteUserModal.css';
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";



const DeleteUserModal = forwardRef(({ users, setUsers }, ref) => {

    const { axiosFetch } = useAxiosFunction();
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(false);

    const handleDelete = () => {
        const filteredData = users.filter(u => u.id !== userId);
        axiosFetch({
            axiosInstance: axios,
            method: 'DELETE',
            url: `/api/users/${userId}`,
        })
        setUsers(filteredData);
        setShow(false);
    };

    //Now it is possible to set the child component's state from the parent component
    //Pushing one of the delete icons will invoke this function
    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
        alterUserId(id) {
            setUserId(id);
        }
    }));

    return (
        <Modal show={show} onHide={()=>{setShow(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
});

export default DeleteUserModal;