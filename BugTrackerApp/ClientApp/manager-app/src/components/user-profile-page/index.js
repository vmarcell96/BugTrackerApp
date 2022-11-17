//Packages
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
//Components
import ProfileForm from './ProfileForm';
import UserProjects from './UserProjects';
import ProfileCard from './ProfileCard';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './profile.css'
import { useState } from 'react';
import UserFriends from './UserFriends';
import { createContext } from 'react';

export const UserContext = createContext({});

const Profile = () => {
    const { id } = useParams();
    const {  loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();

    const [user, setUser] = useState();
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [users, setUsers] = useState([]);

    const isUserLoggedIn = auth?.id === id;


    const getUserData = async () => {
        const user = await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/users/${id}`,
        });
        setUser(user);
        const usersFriends = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/users/GetFriends?userId=${id}`,
        });
        setFriends(usersFriends);
        const pendingRequests = await axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: `/api/users/GetPendingFriendRequests?userId=${user.id}`,
        });
        setPendingRequests(pendingRequests);
        const users = await axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/users`,
        });
        setUsers(users);
    };

    useEffect(() => {
        getUserData()
    }, [id])

    return (
        <>
            {/* Loading Spin */}
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {/* Loading Spin */}
            {!loading && user && friends && pendingRequests &&
                <UserContext.Provider value={{ user, setUser, friends, setFriends, isUserLoggedIn, pendingRequests, setPendingRequests, users }} >
                    <Container className=''>
                        <Row className=''>
                            <Col xs={12} md={6}>
                                <Row>
                                    <Col className='p-2 d-flex justify-content-center'>
                                        <ProfileCard />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={6}>
                                {isUserLoggedIn && <Row >
                                    <Col className='p-2 d-flex justify-content-center'>
                                        <ProfileForm />
                                    </Col>
                                </Row>}
                                <Row>
                                    <Col className='p-2 d-flex justify-content-center'>
                                        <UserProjects />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='p-2 d-flex justify-content-center'>
                                        <UserFriends />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </UserContext.Provider>}
        </>
    )
}

export default Profile