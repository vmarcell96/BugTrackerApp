//Packages
import React from "react";
import { useEffect } from "react";
import { Button, Table, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './users.css'

const Users = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/api/users",
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    const filteredData = data.filter(e => e.id !== id);
    await axiosFetch({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/users/${id}`,
    })
    setData(filteredData);
  };

  const navToUpdate = (id, user) => {
    navigate(`/users/${id}`, { state: user });
  };

  return (
    <Container>
      <Card>
        <Card.Title className='page-title'><h2>Users</h2></Card.Title>
        <Card.Body>
          <div className="table-responsive" style={{ maxWidth: "100%" }}>
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
            {/* Table */}
            {!loading && !error && data && (
              <>
                <Table borderless>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>
                        {/* Admin privilige - Add user button */}
                        {auth?.role === "Admin" && <>
                          <Button className='button plus' onClick={() => { navigate("/users/add") }}>
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </>}
                        {/* Admin privilige - Add user button */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* User Data */}
                    {data && data.map((user) => (
                      <tr key={user.id}>
                        <td>{user.userName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td>
                          {/* Admin privilige - Update,Delete user button */}
                          {auth?.role === "Admin" &&
                            <>
                              <Button className='button' onClick={() => { navToUpdate(user.id, user) }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button className='button' onClick={() => { handleDelete(user.id) }}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </>
                          }
                          {/* Admin privilige - Update,Delete user button */}
                        </td>
                      </tr>
                    ))}
                    {/* User Data */}
                  </tbody>
                </Table>
              </>
            )}
            {/* Table */}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Users;
