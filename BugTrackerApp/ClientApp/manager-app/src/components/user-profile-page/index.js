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

const Profile = () => {
    const { id } = useParams();
    const { response: user, setResponse: setUser, error, loading, axiosFetch } = useAxiosFunction();
    const { auth } = useAuth();

    const isUserLoggedIn = auth?.id === id;


    const getUserData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/users/${id}`,
        });
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
            {/* Error */}
            {!loading && error && <p style={{ color: "red" }}>{error}</p>}
            {/* Error */}
            {!loading && user && 
            <Container className=''>
                <Row className=''>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col className='p-2 d-flex justify-content-center'>
                                <ProfileCard user={user} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        {isUserLoggedIn && <Row >
                            <Col className='p-2 d-flex justify-content-center'>
                                <ProfileForm isUserLoggedIn={isUserLoggedIn} user={user} setUser={setUser} />
                            </Col>
                        </Row>}
                        <Row>
                            <Col className='p-2 d-flex justify-content-center'>
                                <UserProjects user={user} isUserLoggedIn={isUserLoggedIn} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>}
        </>
    )
}

export default Profile