//Packages
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
//Components
import InfoPart from './InfoPart'
import About from './About'
import ProfileFooter from './ProfileFooter'
//Hooks
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useAuth from '../../hooks/useAuth';
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './profile.css'

const Profile = () => {
    const { id } = useParams();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const { auth } = useAuth();


    const getUserData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: `/api/users/${id}`,
        });
    };

    useEffect(() => {
        getUserData();
    }, [id])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                <InfoPart />
                <About />
                <ProfileFooter />
                </Col>
                <Col>
                    <div>asd</div>
                </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile