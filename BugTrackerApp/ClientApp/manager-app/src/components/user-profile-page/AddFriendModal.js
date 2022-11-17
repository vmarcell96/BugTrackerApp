import { useContext } from "react";
import { forwardRef } from "react";
import { useState, useImperativeHandle } from "react";
import { Modal, Form, Button, Stack, ListGroup } from "react-bootstrap";
import { UserContext } from ".";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/axiosInstance";
import { useEffect } from "react";


const AddFriendModal = forwardRef(({ }, ref) => {

    const { loading, error, axiosFetch } = useAxiosFunction();
    const { user, setUser, friends, setFriends, pendingRequests, users, setPendingRequests } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [notFriends, setNotFriends] = useState([]);
    const [userId, setUserId] = useState(0);


    const onChange = (e) => {
        if (e.target.value === userId) {
            setUserId(0);
        }
        else {
            setUserId(e.target.value);
        }
    };

    useImperativeHandle(ref, () => ({
        alterShow() {
            setShow(!show);
        },
    }));

    const getData = () => {

        //current user's friends's ids
        const friendIds = friends.map(f => f.id);
        //getting ids from users who are in pending friendship with current user
        const pendingSenderUserIds = pendingRequests.map(req => req.senderId);
        const pendingReceiverUserIds = pendingRequests.map(req => req.receiverId);
        //getting users who are not in a pending request with current user
        const notFriendNotPendingFriendUsers = users.filter(user => {
            if (friendIds.includes(user.id) || pendingSenderUserIds.includes(user.id) || pendingReceiverUserIds.includes(user.id)) {
                return false;
            }
            return true;
        });
        setNotFriends(notFriendNotPendingFriendUsers);
    };


    useEffect(() => {
        getData();
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/users/SendFriendRequest?senderId=${user.id}&receiverId=${userId}`,
        });
        if (res !== undefined) {
            setNotFriends([...notFriends.filter(f => f.id !== userId)])
            setPendingRequests([...pendingRequests, res])
        }
        setShow(false);
        setUserId(0);
    };



    return (
        <>
            {!loading && !error && user &&
                <Modal show={show} onHide={() => { setShow(false); setUserId(0); }}>
                    <Modal.Title className="page-title">Add Friends</Modal.Title>
                    <Modal.Body>
                        <ListGroup as="ul">
                            {
                                notFriends.map(u => {
                                    return (
                                        <ListGroup.Item as="li" value={u.id} active={u.id === userId} onClick={onChange}>{u.userName}</ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                        <div className="d-flex justify-content-center">
                            <Button disabled={userId === 0} className="button mt-2" onClick={handleSubmit}>
                                Send Request
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>}
        </>
    );
});

export default AddFriendModal;