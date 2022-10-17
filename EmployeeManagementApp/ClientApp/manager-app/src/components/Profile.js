import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosFunction from '../hooks/useAxiosFunction';
import axios from "../apis/axiosInstance";
import { Button, Table, Card, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

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
        <Container>
            <Card>
                <Card.Title className='page-title'><h2>Profile</h2></Card.Title>
                <Card.Body>
                    {data && <ul>
                        <li>{data.firstName}</li>
                        <li>{data.lastName}</li>
                        <li>{data.userName}</li>
                        <li>{data.role}</li>
                    </ul>}
                    {auth.id === id && <Button>Edit</Button>}
                </Card.Body>
            </Card>
        </Container>   
    )
}

export default Profile