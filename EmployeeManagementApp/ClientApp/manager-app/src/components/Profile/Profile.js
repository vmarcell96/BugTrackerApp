//Packages
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
//Hooks
import useAxiosFunction from '../hooks/useAxiosFunction';
import useAuth from '../hooks/useAuth';
//Misc
import axios from "../apis/axiosInstance";
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
    )
}

export default Profile