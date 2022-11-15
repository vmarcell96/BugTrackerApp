import React from 'react'
import { useMemo } from 'react'
import { Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import useDateFormat from '../../hooks/useDateFormat'
//Misc
import axios from "../../apis/axiosInstance";

const UserProjects = ({ user, isUserLoggedIn }) => {
    const { auth } = useAuth();
    const { response: projects, setResponse: setProjects, error, loading, axiosFetch } = useAxiosFunction();
    const [usersProjects, setUsersProjects] = useState([]);
    const dateFormat = useDateFormat();

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

    useMemo(() => {
        const usersProjects = projects?.filter(p => {return (p.teamMembers?.filter(t => t.userId === user.id)).length > 0});
        setUsersProjects(usersProjects);
    }, [projects])


    return (
        <>
            {!loading && projects && <Card className="profile-card">
                <Card.Header><Card.Title className='page-title'>
                    <h3>{user?.firstName}'s projects</h3>
                </Card.Title></Card.Header>
                <Card.Body>
                    <Table className="striped">
                        <thead>
                            <tr>
                                <th>
                                    Project Name
                                </th>
                                <th>
                                    Join date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* If we are at the logged in user's profile page we can see 
                            the public and private projects, if not we can only see the public projects. */}
                            {usersProjects?.map((p, i) => {
                                if (isUserLoggedIn) {
                                    return (
                                    <tr key={p.id}>
                                        <td><Link className='link' to={`/projects/${p.id}`}>{p.name}</Link></td>
                                        <td>{dateFormat(p.teamMembers.find(tm => tm.userId === user.id)?.joinDate)}</td>
                                    </tr> )
                                }
                                else {
                                    if (p.isPublic) {
                                        return (<tr key={p.id}>
                                            <td><Link className='link' to={`/projects/${p.id}`}>{p.name}</Link></td>
                                            <td>{dateFormat(p.teamMembers.find(tm => tm.userId === user.id)?.joinDate)}</td>
                                        </tr>)
                                    }
                                    return false;
                                }
                            }

                            )}
                        </tbody>
                    </Table>
                </Card.Body>

            </Card>}
        </>
    )
}

export default UserProjects