import React from 'react'
import { useMemo } from 'react'
import { Card, Table, Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import useDateFormat from '../../hooks/useDateFormat'
import ReceivedRequestsModal from './ReceivedRequestsModal'
import SentRequestsModal from './SentRequestsModal'
//Misc
import axios from "../../apis/axiosInstance";
import AddFriendModal from './AddFriendModal'
import { useRef } from 'react'
import { useContext } from 'react'
import { UserContext } from '.'

const UserFriends = () => {

    const { user, isUserLoggedIn, friends } = useContext(UserContext);
    const addFriendModalRef = useRef(null);
    const receivedRequestsModal = useRef(null);
    const sentRequestsModal = useRef(null);

    return (
        <>
            {user && friends &&
                <>
                    <Card className="profile-card">
                        <Card.Header><Card.Title className='page-title'>
                            <h3>{user?.firstName}'s Friends</h3>
                        </Card.Title></Card.Header>
                        <Card.Body>
                            <Table className="striped">
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* If we are at the logged in user's profile page we can add friends */}
                                    {friends.map((f) => {
                                        return (
                                            <tr key={f.id}>
                                                <td><Link className='link' to={`/profile/${f.id}`}>{f.userName}</Link></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </Table>

                        </Card.Body>
                        <Card.Footer>
                            {isUserLoggedIn &&
                                <div className="d-flex justify-content-center">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Actions
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { addFriendModalRef.current.alterShow() }}>
                                                    Browse Users
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => { receivedRequestsModal.current.alterShow() }}>
                                                    Received Requests
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => { sentRequestsModal.current.alterShow() }}>
                                                    Sent requests
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>}
                        </Card.Footer>
                    </Card>
                    <AddFriendModal ref={addFriendModalRef} />
                    <ReceivedRequestsModal ref={receivedRequestsModal} />
                    <SentRequestsModal ref={sentRequestsModal} />
                </>}
        </>
    )
}

export default UserFriends;