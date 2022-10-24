//Packages
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
//Components
import ProfileForm from './ProfileForm';
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './profile.css'
import ProfileCard from './ProfileCard';
import { useState } from 'react';
import UserProjects from './UserProjects';

const Profile = () => {
    const { id } = useParams();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const [isDataChanged, setIsDataChanged] = useState(false);
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
    }, [id, isDataChanged])

    return (
        <>
            {!loading && <Container className=''>
                <Row className=''>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col className='p-2 d-flex justify-content-center'>
                                <ProfileCard user={data} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row >
                            <Col className='p-2 d-flex justify-content-center'>
                                <ProfileForm isUserLoggedIn={isUserLoggedIn} user={data} setIsDataChanged={setIsDataChanged} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='p-2 d-flex justify-content-center'>
                                <UserProjects user={data} />
                            </Col>
                        </Row>
                    </Col>
                </Row>




            </Container>}
        </>
    )
}

export default Profile