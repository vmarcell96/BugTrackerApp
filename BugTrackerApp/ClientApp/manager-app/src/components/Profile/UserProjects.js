import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
//Misc
import axios from "../../apis/axiosInstance";

const UserProjects = (props) => {
    const {auth} = useAuth();
    const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
    const [userProjects, setUserProjects] = useState([]);

    const getProjects = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/api/projects",
        });
    };


    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const usersProjects = data?.filter(p => (p.teamMembers?.filter(t => t.userId == auth.id)).length > 0);
        setUserProjects(usersProjects);
    }, [data])


    return (
        <>
            {!loading && <Card className="profile-card py-3">
                <Card.Title className='page-title'>
                    <h3>{props.user?.firstName}'s projects</h3>
                </Card.Title>
                <Card.Body>
                    <Table className="striped">
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProjects?.map((p, i) =>
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><Link to={`/projects/${p.id}`}>{p.name}</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>

            </Card>}
        </>
    )
}

export default UserProjects