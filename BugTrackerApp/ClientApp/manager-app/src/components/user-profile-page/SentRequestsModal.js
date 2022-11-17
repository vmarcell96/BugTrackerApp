import { useContext } from "react";
import { forwardRef } from "react";
import { useState, useImperativeHandle } from "react";
import { Modal, Form, Button, Stack, ListGroup } from "react-bootstrap";
import { UserContext } from ".";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/axiosInstance";
import { useEffect } from "react";


const SentRequestsModal = forwardRef(({ }, ref) => {

    const { loading, error, axiosFetch } = useAxiosFunction();
    const { user, setUser, friends, setFriends, pendingRequests, users } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [requestId, setRequestId] = useState(0);
    const [pendingUsers, setPendingUsers] = useState([]);


    const onChange = (e) => {
        if (e.target.value === requestId) {
            setRequestId(0);
        }
        else {
            setRequestId(e.target.value);
        }
    };

    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
    }));


    const handleSubmit = async (e) => {
        // e.preventDefault();
        // await axiosFetch({
        //     axiosInstance: axios,
        //     method: "POST",
        //     url: `/api/users/AcceptFriendRequest?requestId=${requestId}`,
        // });
        // setShow(false);
        // setRequestId(0);
    };

    useEffect(()=>{
        const sentRequests = pendingRequests.filter(req => req.senderId === user.id);
        const pendingUsers = sentRequests.map(req => {
            let pendUser = users.find(u => u.id === req.receiverId);
            pendUser.requestId = req.id;
            return pendUser;
        })
        console.log(user)
        console.log(sentRequests)
        console.log(pendingUsers)
        setPendingUsers(pendingUsers);
    }, [pendingRequests]);

    return (
        <>
            {pendingUsers &&
                <Modal show={show} onHide={() => { setShow(false);setRequestId(0); }}>
                    <Modal.Title className="page-title">Sent Requests</Modal.Title>
                    <Modal.Body>
                        <ListGroup as="ul">
                            {
                                pendingUsers?.map(u => {
                                    return (
                                        <ListGroup.Item as="li" value={u.requestId} active={u.requestId === requestId} onClick={onChange}>{u.userName}</ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                        {/* <div className="d-flex justify-content-center">
                            <Button disabled={requestId === 0} className="button mt-2" onClick={handleSubmit}>
                                Accept Request
                            </Button>
                        </div> */}
                </Modal.Body>
                </Modal>}
        </>
    );
});

export default SentRequestsModal;